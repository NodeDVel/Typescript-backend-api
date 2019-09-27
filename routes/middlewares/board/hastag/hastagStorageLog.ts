import { NextFunction, Request, Response } from 'express';

import Board from '../../../../database/models/board.model';
import Hastag from '../../../../database/models/hastag.model';
import User from '../../../../database/models/user.model';

const hastagLog = async (req: Request, res: Response, next: NextFunction) => {
    const user: User = res.locals.user;
    const board: Board = res.locals.board;

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
}

export default hastagLog;