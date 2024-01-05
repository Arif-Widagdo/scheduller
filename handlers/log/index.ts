import { NextFunction } from 'express';
import { config } from 'dotenv';
import path from 'path';
import { Response, Request } from 'express';

config({ path: path.resolve(__dirname, '../../.env') });

export const requestLogger = (err: Error, request: Request, response: Response, next: NextFunction) => {
    logger(`${request.method} url:: ${request.url}`);
    next();
};

export const logger = (message?: any, ...optionalParams: any[]) => {
    process.env.ENABLE_LOG && console.log(message, ...optionalParams);
};
