import bodyParser from 'body-parser';
import { ErrorHandler } from './middlewares/error/index';
import cors from 'cors';
import express from 'express';
import http from 'http';
import { logger } from './handlers/log/index';
import router from './routes/index';
import { maintenance_mode } from './middlewares/maintenance-mode';
import { redis } from './utils/ioredis';

const app = express();
const server = http.createServer(app);
const port = process.env.NODE_PORT || '5000';

app.use([bodyParser.json({ limit: '10mb' }), bodyParser.urlencoded({ extended: true }), cors(), express.static('views'), maintenance_mode, router, ErrorHandler]);

server.listen(port, () => {
    try {
        redis.on('error', (error) => {
            console.error('Redis error:', error.message);
        });

        redis.on('ready', () => {
            console.log('Redis is ready');
        });

        logger(`Server is listening on port ${port}`);
    } catch (error: any) {
        logger(error);
    }
});
