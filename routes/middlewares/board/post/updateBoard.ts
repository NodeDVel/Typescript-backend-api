import { NextFunction, Request, Response } from 'express';

import Board from '../../../../database/models/board.model';
import User from '../../../../database/models/user.model';

const updateBoard = async (req:  Request, res: Response, next: NextFunction) => {
    const user: User = res.locals.user;
    const board: Board = res.locals.board;
    const { title, content } = req.body;

    try {
        await Board.update(
            {
                title: title,
                content: content,
                author: user.name,
            },
            {
            where: {
                pk: board.pk,
            },
        }).then((board: Board) => {
            if(!board) {
                res.status(412).json({
                    result: {
                        SUCCESS: false,
                        message: '수정된 게시물이 없습니다.',
                    },
                });
            } else {
                res.status(200).json({
                    result: {
                        SUCCESS: true,
                        message: '게시물이 수정되었습니다.',
                    },
                });
            }
        });

    } catch(err) {
        console.error(err);
        res.status(500).json({
            result: {
                SUCCESS: false,
                message: 'Server Error',
            },
        });
    }
}

export default updateBoard;

