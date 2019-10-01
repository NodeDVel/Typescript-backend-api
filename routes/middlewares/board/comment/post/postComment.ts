import { NextFunction, Request, Response } from 'express';

import Board from '../../../../../database/models/board.model';
import BoardComment from '../../../../../database/models/boardComment.model';
import User from '../../../../../database/models/user.model';

const createComment = async (req: Request, res: Response, next: NextFunction) => {
    const user: User = res.locals.user;
    const board_pk: number = req.body.board_pk;
    const comment: string | undefined = req.body.comment;

    try {
        const board: Board = await Board.findOne({
          where: {
            board_pk,
          },
        });

        if (board) {
            const boardcomment: BoardComment = await BoardComment.create(
              {
                board_pk,
                user_pk: user.pk,
                author: user.name,
                comment,
              });
    
            if(!boardcomment) {
                res.status(500).json({
                  result: {
                      SUCCESS: true,
                      message: '댓글이 작성되지 않았습니다.',
                    },
                });
            } else {
                res.status(200).json({
                  result: {
                      SUCCESS: true,
                      message: '댓글이 작성되었습니다.',
                    },
                });
            }

        }
    } catch(err) {
        console.error(err);
        res.status(500).json({
            result: {
                SUCCESS: false,
                message: 'Server error',
            }
        });
    }
}

export default createComment;