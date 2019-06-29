import {NextFunction, Request, Response} from 'express';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import {sendMail} from '../utils/mail.util';
import {Mysql as mysql} from '../utils/database.util';
import * as redis from '../utils/redisClient.util';
import {IRequestWithToken} from '../interface/requestWithToken';
import {verifyCheck} from '../utils/jwtToken.util';
import * as myBcrypt from '../config/bcrypt';
import * as jwtConfig from '../config/jwt';

async function test(req: Request, res: Response): Promise<Response> {
    const SQL = 'SELECT * FROM COMMENTS WHERE board_seq=19 LIMIT 5';
    const posts = await mysql.connect((con: any) => con.query(SQL))();
    return res.json(posts[0]);
}

function tokenCheck(req: IRequestWithToken, res: Response) {
    verifyCheck(req.token).then((ret) => {
        if (ret) return res.status(200).send('hi');
        else return res.status(400).send('Invalid');
    });
}

async function signUp(req: Request, res: Response): Promise<Response> {
    if (req.body.email.indexOf('@') !== -1) {
        const SQL = `SELECT 1 FROM user WHERE email = ?`;
        const result = await mysql.connect((con: any) => con.query(SQL, `${req.body.email}`))();
        if (!(result[0] && result[0].length > 0)) sendMail(req, res);
        else res.status(400).send('Already Exists');
    } else return res.status(400).send('ERRR');
}

async function code(req: Request, res: Response): Promise<void> {
    const redisCode = await new Promise((resolve, reject) => {
        redis.client.get(`${req.body.email}`, (err, reply) => {
            if (err) reject(err);
            else resolve(reply);
        });
    });
    if (redisCode.toString() === req.body.code) res.status(200).end();
    else res.status(400).end();
}

async function info(req: Request, res: Response) {
    const redisCode = await new Promise((resolve, reject) => {
        redis.client.get(`${req.body.email}`, (err, reply) => {
            if (err) reject(err);
            else resolve(reply);
        });
    });
    if (req.body.code !== redisCode.toString()) return res.status(400).send('email fail');

    const hashPwd = await new Promise(((resolve) => bcrypt.hash(`${req.body.password}`, myBcrypt.salt, (err, hash) => resolve(hash))));
    const SQL = `INSERT INTO user(email, nickname, password, role, company) VALUES (?)`;
    const SQL_VALUE = [
        req.body.email,
        req.body.nickname,
        hashPwd,
        req.body.role,
        req.body.company,
    ];
    try {
        await mysql.connect((con: any) => con.query(SQL, [SQL_VALUE]))();
    } catch (e) {
        console.error(e);
        return res.status(400).send('error');
    }
    await redis.client.del(`${req.body.email}`);
    return res.status(200).end();
}

async function login(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const SQL = 'SELECT * FROM user WHERE email = ?';
    const SQL_VALUES = [req.body.email];
    let userData;
    try {
        userData = await mysql.connect((con: any) => con.query(SQL, [SQL_VALUES]))();
    } catch (e) {
        next(e);
    }
    if  (!(userData[0] && userData[0].length > 0)) return res.status(400).send('Please check Email or Password');

    const pwd = userData[0][0].password;
    const result = await new Promise(((resolve, reject) => {
        bcrypt.compare(req.body.password, pwd, (err, ret) => {
            if (err) reject(err);
            else resolve(ret);
        });
    }));
    if (!result) res.status(400).send('Please check Email or Password');

    userData = userData[0][0];
    const data = {
        seq: userData.seq,
        email: userData.email,
        nickname: userData.nickname,
        role: userData.role,
        u_created: userData.u_created,
        company: userData.company,
    };

    const token = await new Promise(((resolve, reject) => {
        jwt.sign(data, jwtConfig.secret, {expiresIn: '1h'}, (err, jwtToken) => {
            redis.client.set(data.email, jwtToken, 'EX', 3600);
            resolve(jwtToken);
        });
    }));

    return res.status(200).send({
        data: {
            accessToken: token,
            userData: data,
        },
    });
}

async function logout(req: IRequestWithToken, res: Response): Promise<void> {
    await jwt.verify(req.token, jwtConfig.secret, (err, authorizedData) => {
        if (err) console.error(err);
        // @ts-ignore
        else redis.client.del(`${authorizedData.email}`, (e) => {
            if (err) console.error(e);
        });
    });
    return res.status(200).end();
}

export {test, tokenCheck, signUp, code, info, login, logout };
