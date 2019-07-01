import * as qs from 'qs';
import HttpError from '../error/http.error';
import * as jwt from 'jsonwebtoken';
import * as jwtConfig from '../config/jwt';
import * as redis from '../utils/redisClient.util';
import {MESSAGES} from '../const/MESSAGES';
import {NextFunction, Response} from 'express';
import {IRequestWithToken} from '../interface/requestWithToken';

function get(req: IRequestWithToken, res: Response, next: NextFunction): void {
    const header = req.headers['authorization'];
    if (typeof header !== 'undefined') {
        const bearer = header.split(' ');
        req.token = bearer[1];
        return next();
    } else return next(new HttpError(400, MESSAGES.loginFail));
}

function check(req: IRequestWithToken, res: Response, next: NextFunction): void {
    jwt.verify(req.token, jwtConfig.secret, (err, authorizedData) => {
        if (err) res.status(403).send(MESSAGES.validationError);
        // @ts-ignore
        else redis.client.get(`${authorizedData.email}`, (e, reply) => {
            if (reply === req.token) next();
            else res.status(403).send(MESSAGES.validationError);
        });
    });
}

async function verifyCheck(token: string): Promise<boolean> {
    const ret = await new Promise(((resolve, reject) => {
        jwt.verify(token, jwtConfig.secret, (err, authorizedData) => {
            if (err) resolve(false);
            // @ts-ignore
            else return redis.client.get(`${authorizedData.email}`, (e, reply) => {
                resolve(reply === token);
            });
        });
    }));
    return ret === true;
}

export { get, check, verifyCheck };
