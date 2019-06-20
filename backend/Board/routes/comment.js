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
    mysqlPool.query(SQL, SQL_VALUE, (err, result) => {
        if(err) res.status(403).send(MESSAGE.validationError);
        else {
            const IN_SQL = `UPDATE comments SET description='삭제된 댓글입니다.', deleted=1, user_seq=1 WHERE seq = ?`;
            // 유저의 삭제 연타를 막는 구문.
            if(!result[0]) res.status(400).end();
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
    const userSeq = Number(req.body.userSeq);
    const commentSeq = Number(req.body.commentSeq);

    // FIXME 대댓글 가능하도록 바꿔야함.
    const IN_SQL = commentSeq === 0 ? `1 = 1`: `c.seq < ${commentSeq}`;
    const SQL = `
        SELECT              c.*, u.nickname, u.role, u.company
        FROM                comments c
        LEFT OUTER JOIN     user u ON u.seq = c.user_seq
        WHERE               c.board_seq = ?
            AND             ${IN_SQL}
        ORDER BY            c.seq DESC
        LIMIT               5
    `;
    const SQL_VALUE = [boardSeq];

    mysqlPool.query(SQL, SQL_VALUE, (err, result) => {
        if(err) res.status(400).end();
        else  res.status(200).json(result);
    });
});

router.post('/', token.get, token.check, (req, res, next) => {
    const SQL = `INSERT INTO comments(user_seq, board_seq, description, parent) VALUES (?, ?, ?, ?)`;
    const SQL_VALUE = Object.keys(req.body).map((key) => req.body[key]);

    mysqlPool.query(SQL, SQL_VALUE, (err, result) => {
        if(err) res.status(500).send('bad');
        else res.status(200).send(result);
    });
});

module.exports = router;