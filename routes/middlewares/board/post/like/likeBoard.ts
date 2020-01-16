import { NextFunction, Request, Response } from 'express';

import Board from '@Model/board.model';
import BoardLike from '@Model/boardlike.model';
import User from '@Model/user.model';

const likeBoard = async (req: Request, res: Response, next: NextFunction) => {
    const user: User = res.locals.user;
    const board_pk: Board['pk'] = req.query.board_pk;

    try {
        const board: Board | undefined = await Board.findOne(
          {
            where: {
              board_pk,
            },
          });

        if (board) {
          await BoardLike.findOne({
              where: {
                user_pk: user.pk,
                board_pk,
              }, 
            }).then(async (boardlike: BoardLike) => {
                if(boardlike) {
                    const ConfirmLike = await BoardLike.destroy({
                        where: {
                            pk: user.pk,
                        },
                    });
    
                    await BoardLike.update({
                        like: false,
                    }, {
                        where: {
                            pk: board_pk,
                        },
                    });
    
                    res.status(200).json({
                        result: {
                            SUCCESS: true,
                            message: '좋아요 취소',
                        },
                    });
                } else {
                    const CancelLike = await BoardLike.create({
                        user_pk: user.pk,
                        board_pk,
                    });
    
                    await BoardLike.update(
                        {
                            like: true,
                        }, {
                            where: {
                            pk: board_pk
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

export default likeBoard;