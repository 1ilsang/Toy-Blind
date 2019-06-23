const express = require('express');

const mysqlPool = require('../utils/mysql');
const token = require('../utils/token');

const MESSAGE = require('../const/MESSAGES');

const router = express.Router();

router.delete('/:seq', token.get, token.check, token.getData, (req, res, next) => {
    const seq = Number(req.params.seq);
    const SQL = `SELECT seq FROM comments WHERE seq = ? AND user_seq = ?`;
    const SQL_VALUE = [
        seq,
        req.tokenData.seq
    ];
    // FIXME 쿼리 두개 하나로 합칠 수 있을거 같음
    mysqlPool.query(SQL, SQL_VALUE, (err, result) => {
        if (err) res.status(403).send(MESSAGE.validationError);
        else {
            const IN_SQL = `UPDATE comments SET description='삭제된 댓글입니다.', deleted=1, user_seq=1 WHERE seq = ?`;
            // 유저의 삭제 연타를 막는 구문.
            if (!result[0]) res.status(400).end();
            else {
                mysqlPool.query(IN_SQL, result[0].seq, (err, reply) => {
                    console.log(err, result);
                    if (err) res.status(400).send(MESSAGE.validationError);
                    else res.status(200).end();
                });
            }
        }
    });
});

router.post('/list', (req, res, next) => {
    const boardSeq = Number(req.body.boardSeq);
    const commentSeq = Number(req.body.commentSeq);
    const IN_SQL = commentSeq === 0 ? `>` : `<`;
    const SQL = `
        SELECT ttt.*, u.email, u.nickname, u.role, u.company
        FROM (
            SELECT  *
            FROM (
                SELECT c.seq, c.deleted, c.user_seq, c.board_seq, c.description, c.parent, c.created
                    , rank() over(partition by c.parent order by c.seq desc) AS rnk
                FROM comments c
                WHERE c.board_seq= ? AND c.parent IN (
                    SELECT seq 
                    FROM (
                        SELECT seq
                        FROM comments
                        WHERE board_seq= ? AND parent=0
                             and seq ${IN_SQL} ?
                        ORDER BY seq DESC
                        LIMIT 5
                    ) AS tmp
                )
            ) AS tmp2
        WHERE rnk < 6
	    UNION ALL (
		    SELECT seq, deleted, user_seq, board_seq, description, parent, created
                    ,seq AS rnk
		    FROM comments
		    WHERE board_seq= ? AND parent=0
		     	and seq ${IN_SQL} ?
		    ORDER BY seq DESC
		    LIMIT 5
	        )
        ) AS ttt
        INNER JOIN user u ON ttt.user_seq = u.seq;
    `;

    const SQL_VALUE = [boardSeq, boardSeq, commentSeq, boardSeq, commentSeq];
    mysqlPool.query(SQL, SQL_VALUE, (err, result) => {
        if (err) return next(err);

        let ret = result.filter(e => e.parent === 0)
            .map(e => {
                e.reply = [];
                return e;
            });
        result.filter(e => e.parent !== 0)
            .forEach(e => ret.find(re => re.seq === e.parent).reply.unshift(e));

        res.status(200).send(ret);
    });
});

router.post('/more', (req, res, next) => {
    const boardSeq = Number(req.body.boardSeq);
    const commentSeq = Number(req.body.commentSeq);
    const lastReplySeq = Number(req.body.lastReplySeq);

    const SQL = `
        SELECT      c.board_seq, u.company, c.created, c.deleted, c.description
                    , u.email, u.nickname, c.parent, u.role, c.seq, c.user_seq
        FROM        comments c
        INNER JOIN  user u ON c.user_seq=u.seq
        WHERE       c.board_seq=? and c.parent=? and c.seq < ?
        ORDER BY    c.seq DESC
        LIMIT       5
    `;
    const SQL_VALUE = [boardSeq, commentSeq, lastReplySeq];

    mysqlPool.query(SQL, SQL_VALUE, (err, reply) => {
        if(err) return next(err);
        res.status(200).send(reply);
    });
});

router.post('/', token.get, token.check, (req, res, next) => {
    const SQL = `INSERT INTO comments(user_seq, board_seq, description, parent) VALUES (?, ?, ?, ?)`;
    const SQL_VALUE = Object.keys(req.body).map((key) => req.body[key]);

    mysqlPool.query(SQL, SQL_VALUE, (err, result) => {
        if (err) res.status(500).send('bad');
        else res.status(200).send(result);
    });
});

router.post('/test-loop-promise', (req, res, next) => {
    const SQL = `
        SELECT      c.seq
        FROM        comments c
        WHERE       c.board_seq = ?
            AND     c.parent=0
        ORDER BY    c.seq DESC
        LIMIT       5
    `;
    const IN_SQL = `
        SELECT  *
        FROM    comments ic
        WHERE   ic.parent = ?
        LIMIT   5
    `;
    const promises = [];
    const boardSeq = req.body.seq;
    mysqlPool.query(SQL, boardSeq, (err, reply) => {
        if (err) throw err;
        let list = [];
        for (let i = 0; i < reply.length; i++) {
            promises.push(new Promise((resolve => {
                mysqlPool.query(IN_SQL, reply[i].seq, (err, inReply) => {
                    if (err) throw err;
                    list.push(inReply);
                    resolve();
                });
            })));
        }
        Promise.all(promises)
            .then(() => res.status(200).json(list))
            .catch((err) => res.status(400).end());
    });
});

module.exports = router;