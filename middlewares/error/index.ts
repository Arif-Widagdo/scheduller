import { Response, Request, NextFunction } from 'express';

export const ErrorHandler = async (err: any, req: Request, res: Response, next: NextFunction) => {
    console.log(err);

    const errStatus = err.status || 500;
    const errMsg = err.message || 'Something went wrong';
    const errCode = err.code || '';
    const errPhase = err.phase || 'next error';

    res.status(errStatus).json({
        success: false,
        message: errMsg,
        status: errStatus,
        stack: process.env.NODE_ENV === 'development' ? err.stack : {},
        code: errCode,
    });
};
