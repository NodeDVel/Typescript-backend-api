import { NextFunction, Request, Response } from 'express';

import Board from '@Model/board.model';
import User from '@Model/user.model';

const updateBoard = async (req:  Request, res: Response, next: NextFunction) => {
    const user: User = res.locals.user;
    const board_pk: Board['pk'] = req.query.board_pk
    const title: string | undefined = req.body;
    const content: string | undefined = req.body;

    try {
        const update_board: Board | undefined = await Board.findOne({
          where: {
            board_pk,
          },
        });

        if(update_board) {
            await Board.update(
                {
                    title,
                    content,
                    author: user.name,
                },
                {
                where: {
                   pk: board_pk,
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

        }
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