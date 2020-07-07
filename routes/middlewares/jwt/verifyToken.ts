import * as dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import CustomError from '@Middleware/error/customError';

dotenv.config();

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const accesstoken: string | string[] = req.headers.access_token;
  const secretKey: string = process.env.ACCESS_TOKEN_SECRET;

  try {
    const decodedToken = await jwt.verify(accesstoken as string, secretKey); // 토큰 인증

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