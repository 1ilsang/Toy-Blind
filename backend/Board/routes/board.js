const express = require('express');
const multer = require('multer');
const multerGoogleStorage = require('multer-google-storage');
const axios = require('axios');
const jwt = require('jsonwebtoken');

const mysqlPool = require('../utils/mysql');
const token = require('../utils/token');
const jwtConfig = require('../config/jwt');

const MESSAGE = require('../const/MESSAGES');

const upload = multer({
    storage: multerGoogleStorage.storageEngine({
        bucket: 'blindimg',
        projectId: 'sendmailer-242606',
        keyFilename: 'config/gcp_storage_keyfile.json'
    }),
    limits: {fileSize: 5 * 1024 * 1024}
});
const router = express.Router();

// This is local storage.
// const upload = multer({dest: 'uploads/'});

router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/', token.get, token.check, upload.single('userfile'), (req, res, next) => {
    // 이미지 리사이즈(클라우드 펑션) 후 썸네일과 데이터 디비 저장.
    if(req.file) {
        axios.get(`https://us-central1-sendmailer-242606.cloudfunctions.net/gcp-upload2?filename=${req.file.filename}`)
            .then((result) => {
                const thumbPath = req.file.path.split('/').splice(0, 3).join('/') + '/' + result.data;
                const SQL = `INSERT INTO board(user_seq, title, description, img_url, thumb_url, topic) VALUES (?, ?, ?, ?, ?, ?)`;
                const SQL_VALUE = [
                    req.body.userSeq,
                    req.body.title,
                    req.body.description,
                    req.file.path,
                    thumbPath,
                    req.body.topic
                ];

                mysqlPool.query(SQL, SQL_VALUE, (err, reply) => {
                    if (err) res.status(400).send(MESSAGE.validationError);
                    else res.status(200).end();
                });
            });
    } else {
        const SQL = `INSERT INTO board(user_seq, title, description, topic) VALUES (?, ?, ?, ?)`;
        const SQL_VALUE = [
            req.body.userSeq,
            req.body.title,
            req.body.description,
            req.body.topic
        ];
        mysqlPool.query(SQL, SQL_VALUE, (err,  reply) =>  {
            if(err) res.status(400).send(MESSAGE.validationError);
            else res.status(200).end();
        });
    }
});

// 리스트를 가져오기만 하는데 왜 포스트로 쓰는지 잘 모르겠다. (깃헙, 블라인드)
router.post('/list/:topic', (req, res, next) => {
    const limitValue = 5;
    const topic = req.params.topic === 'Topics' ? 'topic' : "'" + req.params.topic + "'";
    const boardSeq = Number(req.body.boardSeq);
    let IN_SQL = ' AND 1 = 1';

    if (boardSeq !== 0) IN_SQL = ` AND b.seq <= ${boardSeq}`;

    const SQL = `
                SELECT          b.*, u.nickname, u.company, count(cmt.seq) AS comments, count(ulb.seq) AS likes
                FROM            board AS b
                INNER JOIN      user AS u ON u.seq = b.user_seq
                LEFT OUTER JOIN comments AS cmt ON b.seq = cmt.board_seq
                LEFT OUTER JOIN user_like_board AS ulb ON b.seq = ulb.board_seq
                WHERE           b.topic  = ${topic}
                    ${IN_SQL}
                GROUP BY        b.seq
                ORDER BY        b.seq
                DESC
                LIMIT           ${limitValue}
        `;

    const SQL_ = `
        select  * 
        from (
            select *, rank() over(partition by parent order by seq desc) as rnk  
            from comments 
            where parent IN (
                select seq from (
                    select seq 
                    from comments 
                    where board_seq=19 
                        and isnull(parent) 
                    order by seq desc 
                    limit 3
                    ) as tmp
                )
            ) as tmp2
        where rnk < 5 
        union (
            select *, rank() over(partition by parent order by seq desc) 
            from comments
            where board_seq=19 and isnull(parent)
            order by seq desc  
            limit 3
        );
    `;
    mysqlPool.query(SQL, (err, reply) => {
        if (err) res.status(400).send(MESSAGE.validationError);
        else res.status(200).send(reply);
    });
});

router.post('/article/view', (req, res, next) => {
    const boardSeq = Number(req.body.boardSeq);

    const SQL = `
                SELECT          b.*, u.nickname, u.company, count(cmt.seq) AS comments, count(ulb.seq) AS likes
                FROM            board AS b
                INNER JOIN      user AS u ON u.seq = b.user_seq
                LEFT OUTER JOIN comments AS cmt ON b.seq = cmt.board_seq
                LEFT OUTER JOIN user_like_board AS ulb ON b.seq = ulb.board_seq
                WHERE           b.seq = ${boardSeq}
                GROUP BY        b.seq
                ORDER BY        b.seq
                DESC
        `;

    mysqlPool.query(SQL, (err, reply) => {
        if (err) res.status(400).send(MESSAGE.validationError);
        else res.status(200).send(reply[0]);
    });
});

router.delete('/:boardSeq', token.get, token.check, (req, res, next) => {
    jwt.verify(req.token, jwtConfig.secret, (err, authorizedData) => {
        if(err) {
            res.status(403).send(MESSAGE.validationError);
            return;
        }
        const SQL = 'SELECT seq FROM board WHERE seq = ? AND user_seq = ?';
        const SQL_VALUE = [
            req.params.boardSeq,
            authorizedData.seq
        ];
        mysqlPool.query(SQL, SQL_VALUE, (err, reply) => {
            if(err) res.status(400).send(MESSAGE.validationError);
            else {
                const IN_SQL = "DELETE FROM board WHERE seq = ?";
                mysqlPool.query(IN_SQL, reply[0].seq, (err, reply) => {
                    if(err) res.status(400).send(MESSAGE.validationError);
                    else res.status(200).end();
                });
            }
        });
    });
});

router.put('/:boardSeq', token.get, token.check, (req, res, next) => {
    jwt.verify(req.token, jwtConfig.secret, (err, authorizedData) => {
        if(err) {
            res.status(403).send(MESSAGE.validationError);
            return;
        }
        const SQL = 'SELECT seq FROM board WHERE seq = ? AND user_seq = ?';
        const SQL_VALUE = [
            req.params.boardSeq,
            authorizedData.seq
        ];
        mysqlPool.query(SQL, SQL_VALUE, (err, reply) => {
            if(err) res.status(400).send(MESSAGE.validationError);
            else {
                const IN_SQL = "UPDATE board SET title = ?, description = ? WHERE seq = ?";
                const IN_SQL_VALUE = [
                    req.body.title,
                    req.body.description,
                    reply[0].seq
                ];
                mysqlPool.query(IN_SQL, IN_SQL_VALUE, (err, reply) => {
                    if(err) res.status(400).send(MESSAGE.validationError);
                    else res.status(200).end();
                });
            }
        });
    });
});

module.exports = router;
