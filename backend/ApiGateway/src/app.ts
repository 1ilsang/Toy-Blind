import * as express from 'express';
import * as bodyparser from 'body-parser';
import * as cors from 'cors';
import * as helmet from 'helmet';

import {Application } from 'express';
import { requestLoggerMiddleware } from './middleware/request.logger.middleware';

import IndexRoutes from './routes/index.route';
import AuthRoutes from './routes/auth.route';
import BoardRoutes from './routes/board.route';
import CommentRoutes from './routes/comment.route';
import * as path from 'path';

export class App {
    private app: Application;

    constructor(private port?: number | string) {
        this.app = express();
        this.settings();
        this.middleware();
        this.routes();
    }

    public async listen() {
        await this.app.listen(this.app.get('port'));
        console.info(`API Gateway on port ${this.app.get('port')}`);
    }

    private settings() {
        this.app.set('port', process.env.PORT || this.port || 3030);
    }

    private middleware() {
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(express.urlencoded({extended:  true}));
        this.app.use(express.json({limit: 5 * 1024 * 1024}));
        this.app.use(express.static(path.join(__dirname, 'public')));
        this.app.use(requestLoggerMiddleware);
    }

    private routes() {
        this.app.use('/auth', AuthRoutes);
        this.app.use('/board', BoardRoutes);
        this.app.use('/comment', CommentRoutes);
        this.app.use('/', IndexRoutes);
    }
}
