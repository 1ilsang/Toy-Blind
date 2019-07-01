import axios from 'axios';
import {Response} from 'express';
import {server} from '../config/servers';
import {IRequestWithToken} from '../interface/requestWithToken';
import {setConfig} from '../utils/axiosConfig.util';
import {verifyCheck} from '../utils/jwtToken.util';

function tokenCheck(req: IRequestWithToken, res: Response) {
    verifyCheck(req.token).then((ret) => {
        if (ret) return res.status(200).send('Valid');
        else return res.status(400).send('Invalid');
    });
}

async function logout(req: IRequestWithToken, res: Response) {
    await axios(setConfig('get', req,  `${server.AuthServer}/auth/logout`))
        .then((result) => res.status(result.status).send(result.data))
        .catch((e) => res.status(400).send(e));
}

async function signUp(req: IRequestWithToken, res: Response) {
    await axios(setConfig('post', req, `${server.AuthServer}/auth/signup`))
        .then((result) => res.status(result.status).send(result.data))
        .catch((e) => res.status(400).send('가입된 사용자 입니다.'));
}

async function code(req: IRequestWithToken, res: Response) {
    await axios(setConfig('post', req, `${server.AuthServer}/auth/code`))
        .then((result) => res.status(result.status).send(result.data))
        .catch((e) => res.status(400).send(e));
}

async function info(req: IRequestWithToken, res: Response) {
    await axios(setConfig('post', req, `${server.AuthServer}/auth/info`))
        .then((result) => res.status(result.status).send(result.data))
        .catch((e) => res.status(400).send(e));
}

async function login(req: IRequestWithToken, res: Response) {
    await axios(setConfig('post', req, `${server.AuthServer}/auth/login`))
        .then((result) => res.status(result.status).send(result.data))
        .catch((e) => res.status(400).send(e));
}

export {tokenCheck, logout, signUp, code, info, login};
