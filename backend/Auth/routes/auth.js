const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const nodeMailer = require('../utils/mail');
const redis = require('../utils/redis');
const checkToken = require('../utils/token');
const mysqlPool = require('../utils/mysql');
const myBcrypt = require('../config/bcrypt');
const jwtConfig = require('../config/jwt');

const MESSAGE = require('../const/MESSAGES');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.send('respond with a resource');
});

// TODO :: test 코드들 mocha 등으로 분리하기
router.get('/connTest', (req, res, next) => {
    mysqlPool.query("SELECT * FROM test WHERE no = ?", 1, (err, result, field) => {
        console.log(result[0]);
        res.json(result[0]).end();
        // res.status(200).send({success: true});
    });
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

/*
    FIXME
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
                const SQL = "INSERT INTO user(email, nickname, password, role) VALUES (?)";
                const SQL_VALUE = [
                    req.body.email,
                    req.body.nickname,
                    pwd,
                    req.body.role
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
    /*
        Logic
            // 1. 최초 로그인이면 정보 입력 (닉넴, 직군, 관심사 등)
                -> /info 에서 해결함.
            1-1. DB 조회.
            2. JWT 토큰 만들기
            3. 레디스에 토큰 박기
            4. 클라이언트에게 전달.(로컬스토리지)
            5. 만약 로그인 했던 적이 있는 유저면 토큰을 갱신하는 식으로.
     */

    const SQL = "SELECT password FROM user WHERE email = ?";
    const SQL_VALUES = [
        req.body.email
    ];

    mysqlPool.query(SQL, [SQL_VALUES], (err, result) => {
        if (result[0]) {
            /*
                FIXME :: 해싱된 비밀번호를 가져온 후 옳다면 다시 디비에 요청해 데이터를 가져온다.
                    디비에 요청이 2번 날라가게 되는데 이게 옳은걸까?
                    여기 로직을 조금 더 깔끔하게 생각해보자.
            */
            bcrypt.compare(req.body.password, result[0].password, (err, reply) => {
                if (reply) {
                    mysqlPool.query("SELECT email, nickname, role, u_created FROM user WHERE email = ?", SQL_VALUES, (err, inResult) => {
                        if (err) res.status(400).send(MESSAGE.loginFail);

                        let data = JSON.parse(JSON.stringify(inResult[0]));
                        jwt.sign(data, jwtConfig.secret, {expiresIn: '1h'}, (err, token) => {
                            redis.client.set(data.email, token, 'EX', 3600);
                            res.status(200).send({
                                data: {
                                    'accessToken': token,
                                    'userData': data
                                }
                            });
                        });
                    });
                } else res.status(402).send(MESSAGE.loginFail);
            });
        } else res.status(400).send(MESSAGE.loginFail);
    });
});

router.get('/logout', checkToken.checkToken, (req, res, next) => {
    jwt.verify(req.token, jwtConfig.secret, (err, authorizedData) => {
        if(err) res.status(403).end();
        else {
            redis.client.del(`${authorizedData.email}`, (err, reply) => {
                if(err) res.status(403).end();
                else res.status(200).end();
            });
        }
    });
});

router.all('/*', (req, res, next) => {
    next();
});

module.exports = router;
