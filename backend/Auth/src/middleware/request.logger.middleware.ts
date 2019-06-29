import * as express from 'express';

// Like morgan
const requestLoggerMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    // console.info(`${req.method} ${req.originalUrl}`);
    const start = new Date().getTime();
    res.on('finish', () => {
        const elapsed = new Date().getTime() - start;
        console.info(`${req.method} ${req.originalUrl} ${res.statusCode} ${elapsed}ms`);
    });
    next();
};

export { requestLoggerMiddleware };
