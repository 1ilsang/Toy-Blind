const express = require('express');
const bcrypt = require('bcrypt');

const mysqlPool = require('../utils/mysql');
const myBcrypt = require('../config/bcrypt');

const router = express.Router();

// TODO :: test 코드들 mocha 등으로 분리하기
router.get('/connTest', (req, res, next) => {
    mysqlPool.query("SELECT * FROM test WHERE no = ?", 1, (err, result, field) => {
        console.log(result[0]);
        res.json(result[0]).end();
        // res.status(200).send({success: true});
    });
});

//  이메일 인증까지 된 유저가 실제 회원가입을 하는 로직.
router.post('/bcryptTest', (req, res, next) => {
    bcrypt.hash(`${req.body.email}`, myBcrypt.salt)
        .then((err, hash) => {
            console.log('hash: ', hash);
            bcrypt.compare(`${req.body.password}`, hash, (err, reply) => {
                console.log('compare!', req.body.password, hash);
                res.send({isCompare: reply}).end();
            });
        });
});

module.exports = router;

