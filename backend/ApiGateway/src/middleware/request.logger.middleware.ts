import {Request, Response, NextFunction} from 'express';

// Like morgan
const requestLoggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const start = new Date().getTime();
    res.on('finish', () => {
        const elapsed = new Date().getTime() - start;
        console.info(`${req.method} ${req.originalUrl} ${res.statusCode} ${elapsed}ms`);
    });
    next();
};

export {requestLoggerMiddleware};
