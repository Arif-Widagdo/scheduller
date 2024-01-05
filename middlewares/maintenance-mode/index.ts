import { NextFunction, Request, Response } from 'express';

import { responseProcessor } from './../../handlers/response/index';

export const maintenance_mode = (req: Request, res: Response, next: NextFunction) => {
    if (process.env.MAINTENANCE_MODE === 'true') {
        res.status(503).send(responseProcessor({}, 'Service flight is under maintenance', false, ''));
    }
    next();
};
