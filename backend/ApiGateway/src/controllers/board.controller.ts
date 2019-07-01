import axios from 'axios';
import {Request, Response} from 'express';
import {server} from '../config/servers';
import {MESSAGES} from '../const/MESSAGES';
import {IRequestWithToken} from '../interface/requestWithToken';
import {setConfig} from '../utils/axiosConfig.util';
import FormData = require('form-data');
import fs = require('fs');

async function createBoard(req: IRequestWithToken, res: Response): Promise<Response> {
    const formData = new FormData();
    const formHeaders = formData.getHeaders();

    // fs.writeFile('uploads/test.png', req.file.buffer, (err) => {
    //     if (err) console.log(err);
    // });

    if (req.file) formData.append('userfile', req.file.buffer, {filename: 'userfile'});
    formData.append('title', req.body.title);
    formData.append('description', req.body.description);
    formData.append('topic', req.body.topic);
    formData.append('userSeq', req.body.userSeq);

    try {
        const ret: any = await new Promise(((resolve, reject) => {
            // @ts-ignore
            axios.post(`${server.BoardServer}/board`, formData, {
                headers: {
                    ...formHeaders,
                }})
                .then(({data}) => resolve(data))
                .catch(({data}) => reject(data));
        }));
        return res.status(200).send(ret);
    } catch (e) {
        console.error(e);
        return res.status(400).send(MESSAGES.ECONNREFUSED);
    }
}

async function getBoardList(req: IRequestWithToken, res: Response) {
    try {
        const ret: any = await new Promise(((resolve, reject) => {
            axios(setConfig('post', req, `${server.BoardServer}/board/list/${req.params.topic}`))
                .then(({data}) => resolve(data))
                .catch((e) => reject(e));
        }));
        return res.status(200).send(ret);
    } catch (e) {
        console.error(e);
        return res.status(400).send(MESSAGES.ECONNREFUSED);
    }
}

async function getBoard(req: IRequestWithToken, res: Response): Promise<Response> {
    try {
        const ret: any = await new Promise(((resolve, reject) => {
            axios(setConfig('post', req, `${server.BoardServer}/board/article/view`))
                .then(({data}) => resolve(data))
                .catch((e) => reject(e));
        }));
        return res.status(200).send(ret);
    } catch (e) {
        console.error(e);
        return res.status(400).send(MESSAGES.ECONNREFUSED);
    }
}

async function deleteBoard(req: IRequestWithToken, res: Response): Promise<Response> {
    try {
        const ret: any = await new Promise(((resolve, reject) => {
            axios(setConfig('delete', req, `${server.BoardServer}/board/${req.params.boardSeq}`))
                .then(({data}) => resolve(data))
                .catch((e) => reject(e));
        }));
        return res.status(200).send(ret);
    } catch (e) {
        console.error(e);
        return res.status(400).send(MESSAGES.ECONNREFUSED);
    }
}

async function updateBoard(req: IRequestWithToken, res: Response): Promise<Response> {
    try {
        const ret: any = await new Promise(((resolve, reject) => {
            axios(setConfig('put', req, `${server.BoardServer}/board/${req.params.boardSeq}`))
                .then(({data}) => resolve(data))
                .catch((e) => reject(e));
        }));
        return res.status(200).send(ret);
    } catch (e) {
        console.error(e);
        return res.status(400).send(MESSAGES.ECONNREFUSED);
    }
}

export {createBoard, getBoardList, deleteBoard, updateBoard, getBoard};
