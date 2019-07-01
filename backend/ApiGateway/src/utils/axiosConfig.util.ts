import {AxiosRequestConfig, Method} from 'axios';
import {Request} from 'express';
import {IRequestWithToken} from '../interface/requestWithToken';

export const setConfig = (method: Method, req: IRequestWithToken, URL: string, params?: string): AxiosRequestConfig => {
    return {
        method,
        // params: req.params,
        url: URL,
        headers: {
            authorization: `bearer ${req.token}`,
        },
        data: req.body,
    };
};
