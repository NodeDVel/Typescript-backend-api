import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import User from '../../../database/models/user.model';

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.headers;
    const tokenSecret = process.env.TOKEN_SECRET;

    try {
        const userPk = await jwt.verify(token as string, tokenSecret);
        const user = await User.findOne({
            where: {
                pk: userPk,
            },
        });

        if(!user) {
            res.status(400).json({
                result: {
                    SUCCESS: false,
                    message: 'user data error',
                }
            })
        } else {
            res.locals.user = user;
            next();
        }

    } catch(err) {
        console.error(err);
        res.status(500).json({
            result: {
                SUCCESS: false,
                message: 'Server Error',
            }
        });
    }
}

export default verifyToken;