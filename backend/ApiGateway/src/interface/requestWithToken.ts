import {Request} from 'express';

interface IRequestWithToken extends Request {
    file: any;
    token: string;
}

export { IRequestWithToken };
