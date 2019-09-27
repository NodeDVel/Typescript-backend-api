import { NextFunction, Request, Response } from 'express';

import Board from '../../../../database/models/board.model';
import Hastag from '../../../../database/models/hastag.model';
import User from '../../../../database/models/user.model';

const deleteHastagLog = async (req: Request, res: Response, next: NextFunction) => {
    const board: Board = res.locals.board;
    const user: User = res.locals.user;
    const hastag_name = req.query.name;

    const hastag: Hastag = await Hastag.destroy({
        where: {
            user_pk: user.pk,
            board_pk: board.pk,
            name: hastag_name,
        },
    });

    if(board) {
        res.status(412).json({
            result: {
                SUCCESS: false,
                message: 'DB Error',
            },
        });
    } else {
        res.status(200).json({
            result: {
                SUCCESS: true,
                message: '정상적으로 삭제되었습니다.',
            },
        });
        next();
    }
}

export default deleteHastagLog;