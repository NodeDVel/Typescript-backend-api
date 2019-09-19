import { NextFunction, Request, Response } from 'express';
import User from '@Model/user.model';
import Board from '@Model/board.model';
import BoardLike from '@Model/boardlike.model';

const likeBoard = async (req: Request, res: Response, next: NextFunction) => {
    const user: User = res.locals.user;
    const board: Board = res.locals.board;

    try {
        await BoardLike.findOne({
            where: {
                userPk: user.pk,
                boardPk: board.pk,
            }, 
        }).then((boardlike: BoardLike) => {
            if(boardlike) {
                boardlike.destroy({
                    where: {
                        pk:  boardlike.pk,
                    },
                });

                res.status(200).json({
                    result: {
                        SUCCESS: true,
                        message: '좋아요 취소',
                    },
                });
            } else {
                boardlike.createdAt({
                    userPk: user.pk,
                    boardPk: board.pk,
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