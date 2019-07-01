import axios from 'axios';
import {Request, Response} from 'express';
import {server} from '../config/servers';
import {MESSAGES} from '../const/MESSAGES';
import {IRequestWithToken} from '../interface/requestWithToken';
import {setConfig} from '../utils/axiosConfig.util';

async function createComment(req: IRequestWithToken, res: Response): Promise<Response> {
    try {
        const ret: any = await new Promise(((resolve, reject) => {
            axios(setConfig('post', req, `${server.BoardServer}/comment`))
                .then(({data}) => resolve(data))
                .catch((e) => reject(e));
        }));
        return res.status(200).send(ret);
    } catch (e) {
        console.error(e);
        return res.status(400).send(MESSAGES.validationError);
    }
}

async function getCommentList(req: IRequestWithToken, res: Response): Promise<Response> {
    try {
        const ret: any = await new Promise(((resolve, reject) => {
            axios(setConfig('post', req, `${server.BoardServer}/comment/list`))
                .then(({data}) => resolve(data))
                .catch((e) => reject(e));
        }));
        return res.status(200).send(ret);
    } catch (e) {
        console.error(e);
        return res.status(400).send(MESSAGES.ECONNREFUSED);
    }
}

async function getMoreReplyComments(req: IRequestWithToken, res: Response): Promise<Response> {
    try {
        const ret: any = await new Promise(((resolve, reject) => {
            axios(setConfig('post', req, `${server.BoardServer}/comment/more`))
                .then(({data}) => resolve(data))
                .catch((e) => reject(e));
        }));
        return res.status(200).send(ret);
    } catch (e) {
        console.error(e);
        return res.status(400).send(MESSAGES.ECONNREFUSED);
    }
}

async function deleteComment(req: IRequestWithToken, res: Response): Promise<Response> {
    try {
        const ret: any = await new Promise(((resolve, reject) => {
            axios(setConfig('delete', req, `${server.BoardServer}/comment/${req.params.seq}`))
                .then(({data}) => resolve(data))
                .catch((e) => reject(e));
        }));
        return res.status(200).send(ret);
    } catch (e) {
        console.error(e);
        return res.status(400).send(MESSAGES.ECONNREFUSED);
    }
}

export {createComment, getCommentList, getMoreReplyComments, deleteComment};
