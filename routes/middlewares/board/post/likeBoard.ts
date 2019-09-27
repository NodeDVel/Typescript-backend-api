import { NextFunction, Request, Response } from 'express';

import Board from '../../../../database/models/board.model';
import BoardLike from '../../../../database/models/boardlike.model';
import User from '../../../../database/models/user.model';

const likeBoard = async (req: Request, res: Response, next: NextFunction) => {
    const user: User = res.locals.user;
    const board: Board = res.locals.board;

    try {
        await BoardLike.findOne({
            where: {
                user_pk: user.pk,
                board_pk: board.pk,
            }, 
        }).then(async (boardlike: BoardLike) => {
            if(boardlike) {
                await BoardLike.destroy({
                    where: {
                        pk: user.pk,
                    },
                });

                await BoardLike.update({
                    like: false,
                }, {
                    where: {
                        pk: board.pk,
                    },
                });

                res.status(200).json({
                    result: {
                        SUCCESS: true,
                        message: '좋아요 취소',
                    },
                });
            } else {
                await BoardLike.create({
                    user_pk: user.pk,
                    board_pk: board.pk,
                });

                await BoardLike.update(
                    {
                        like: true,
                    }, {
                        where: {
                        pk: board.pk
                       },
                });

                res.status(200).json({
                    result: {
                        SUCCESS: true,
                        message: '좋아요 성공',
                    }
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

export default likeBoard;