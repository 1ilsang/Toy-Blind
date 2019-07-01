import * as http from 'http';
import {NextFunction, Request, Response} from 'express';

/**
 * @export
 * @class HttpError
 * @extends {Error}
 */
export class HttpError extends Error {
    public status: number;
    public message: string;
    public name: 'HttpError';

    /**
     * Creates an instance of HttpError.
     * @param {number} [status]
     * @param {string} [message]
     * @memberof HttpError
     */
    constructor(status?: number, message?: string) {
        super(message);

        Error.captureStackTrace(this, this.constructor);

        this.status = status || 500;
        // this.name = this.name;
        this.message = message || http.STATUS_CODES[this.status] || 'Error';
    }
}

export default HttpError;
