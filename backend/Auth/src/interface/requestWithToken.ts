import {Request} from 'express';

interface IRequestWithToken extends Request {
    token: string;
}

export { IRequestWithToken };
