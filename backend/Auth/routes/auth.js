const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const nodeMailer = require('../utils/mail');
const redis = require('../utils/redis');
const token = require('../utils/token');
const mysqlPool = require('../utils/mysql');
const myBcrypt = require('../config/bcrypt');
const jwtConfig = require('../config/jwt');

const MESSAGE = require('../const/MESSAGES');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.send('respond with a resource');
});

router.post('/signup', (req, res, next) => {
    // FIXME 이메일인지 확인하는 최소장치로 @ 검사. 보강해야할듯 (회사 이메일만)
    if (req.body.email.indexOf('@') !== -1) {
        mysqlPool.query("SELECT 1 FROM user WHERE email = ?", `${req.body.email}`, (err, result) => {
            if (result[0] === undefined) nodeMailer.sendMail(req, res);
            else res.status(400).send(MESSAGE.alreadyExist);
        });
    } else res.status(400).send(MESSAGE.validationError);
});

router.post('/code', (req, res, next) => {
    redis.client.get(`${req.body.email}`, function (err, reply) {
        if (req.body.code === reply.toString()) {
            res.status(200).end();
        } else res.status(400).end();
    });
});

/*
    TODO
        email 도 암호화 하고싶은데 이러면 bcrypt 에서 값을 찾을 방법이 없다.
        어떻게 해줘야 하는거지?
 */
router.post('/info', (req, res, next) => {
    redis.client.get(`${req.body.email}`, (err, reply) => {
        if (req.body.code === reply.toString()) {
            let pwd;
            let promises = [];

            promises.push(new Promise((resolve => {
                bcrypt.hash(`${req.body.password}`, myBcrypt.salt, (err, hash) => {
                    pwd = hash;
                    resolve();
                });
            })));

            Promise.all(promises).then(() => {
                const SQL = "INSERT INTO user(email, nickname, password, role, company) VALUES (?)";
                const SQL_VALUE = [
                    req.body.email,
                    req.body.nickname,
                    pwd,
                    req.body.role,
                    req.body.company
                ];
                mysqlPool.query(SQL, [SQL_VALUE], (err, result) => {
                    if (err) res.status(500).end();
                    else {
                        redis.client.del(`${req.body.email}`);
                        res.status(200).end();
                    }
                });
            });
        } else res.status(400).send(MESSAGE.emailFail);
    });
});

router.post('/login', (req, res, next) => {

    const SQL = "SELECT * FROM user WHERE email = ?";
    const SQL_VALUES = [
        req.body.email
    ];

    mysqlPool.query(SQL, [SQL_VALUES], (err, result) => {
        if (result[0]) {
            bcrypt.compare(req.body.password, result[0].password, (err, reply) => {
                if (reply) {

                    const data = {
                        "seq": result[0].seq,
                        "email": result[0].email,
                        "nickname": result[0].nickname,
                        "role": result[0].role,
                        "u_created": result[0].u_created,
                        "company": result[0].company
                    };

                    jwt.sign(data, jwtConfig.secret, {expiresIn: '1h'}, (err, token) => {
                        redis.client.set(data.email, token, 'EX', 3600);
                        res.status(200).send({
                            data: {
                                'accessToken': token,
                                'userData': data
                            }
                        });
                    });
                } else res.status(402).send(MESSAGE.loginFail);
            });
        } else res.status(400).send(MESSAGE.loginFail);
    });
});

router.get('/logout', token.get, (req, res, next) => {
    jwt.verify(req.token, jwtConfig.secret, (err, authorizedData) => {
        if (err) console.log(err);
        else {
            redis.client.del(`${authorizedData.email}`, (err, reply) => {
                if (err) console.log(err);
            });
        }
        res.status(200).end();
    });
});

 router.get('/token-check', token.get, token.check, (req, res, next) => {
     res.status(200).send({token: req.token});
 });

router.all('/*', (req, res, next) => {
    next();
});

module.exports = router;
