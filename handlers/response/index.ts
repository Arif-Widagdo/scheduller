import { RESPONSE_STATUS_CODE } from './interface';

export const responseProcessor = (data: any, message: string, status: boolean, code: RESPONSE_STATUS_CODE) => {
    return {
        status: status,
        message: message,
        data: data,
        code: code,
    };
};

export const responseError = (message: string, status: number, error: any, code = '') => {
    const statusCode = status || 500;
    const errCode = code || '';
    const errMsg = message || 'Something went wrong';

    return {
        success: false,
        message: errMsg,
        status: statusCode,
        stack: process.env.NODE_ENV === 'development' ? error : {},
        code: errCode,
    };
};
