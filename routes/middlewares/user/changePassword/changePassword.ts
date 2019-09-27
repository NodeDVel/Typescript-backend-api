import { NextFunction, Request, Response } from 'express';

import User from '../../../../database/models/user.model';

const changePassword = async(req: Request, res: Response, next: NextFunction) => {
    const user: User = res.locals.user;
    const temp = res.locals.temp;

    try {
        await User.update(
            {
            password: temp.password,
        }, {
            where: {
                pk: user.pk,
            },
        });

        res.status(200).json({
            result: {
                SUCCESS: true,
                message: '비밀번호가 변경되었습니다',
            },
        });

    } catch(err) {
        console.error(err);
        res.status(500).json({
            result: {
                SUCCESS: false,
                message: 'DB Error',
            }
        });
    }
}

export default changePassword;