import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import User from '@Model/user.model';

const issueToken = async (req: Request, res: Response, next: NextFunction) => {
    const user: User = res.locals.user;
    const tokenSecret = process.env.TOKEN_SECRET;
    const token = await jwt.sign({ pk: user.pk }, tokenSecret);

    res.status(200).json({
        result: {
            SUCCESS: true,
            message: 'login OK',
        },
        
        data: {
            token: token,
            user: {
                userPk: user.pk,
                userName: user.name,
            }
        }
    })
}

export default issueToken;