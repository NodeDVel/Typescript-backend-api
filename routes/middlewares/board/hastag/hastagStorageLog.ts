import { NextFunction, Request, Response } from 'express';

import Board from '../../../../database/models/board.model';
import Hastag from '../../../../database/models/hastag.model';
import User from '../../../../database/models/user.model';

import CustromErorr from '../../error/customError';

const hastagStorageLog = async (req: Request, res: Response, next: NextFunction) => {

    try {
        await Hastag.findAll({
            order: [['createdAt', 'DESC']],
        }).then((hastag: Hastag) => {
            if(!hastag) {
                res.status(412).json({
                    result: {
                        SUCCESS: false,
                        message: 'hastag를 찾을 수 없습니다',
                    },
                });
                } else {
                    res.status(200).json({
                        result: {
                            SUCCESS: true,
                            message: 'find hastagLog',
                        },
                    });
                    next();
                }
        });
    } catch (error) {
        console.log(error);
        next(new CustromErorr({ name: 'Database_Error' }));
    }
}

export default hastagStorageLog;