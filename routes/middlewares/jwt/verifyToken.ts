import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import CustomError from '@Middleware/error/customError';

import User from '@Model/user.model';

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const token: string | string[] = req.headers.access_token;
    const secretKey: string = process.env.ACCESS_TOKEN_SECRET;

    try {
    const decodedToken = await jwt.verify(token as string, secretKey);

    res.locals.user = decodedToken;

    next();
    } catch (error) {
        switch (error.name) {
            case 'TokenExpiredError':
                next(new CustomError({ name: 'Token_Expired' }));
                break;
            case 'JsonWebTokenError':
                next(new CustomError({ name: 'Wrong_Data' }));
            default:
                next(new CustomError({ name: 'Unhandled_Error' }));
        }
    }
}

export default verifyToken;