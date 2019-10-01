import { NextFunction, Request, Response } from 'express';

import Board from '../../../../../database/models/board.model';
import BoardComment from '../../../../../database/models/boardComment.model';
import BoardCommentLike from '../../../../../database/models/boardCommentLike.model';
import User from '../../../../../database/models/user.model';
import CustomError from '../../../../../routes/middlewares/error/customError';

const createBoardCommentLike = async (req: Request, res: Response, next: NextFunction) => {
    const user: User = res.locals.user;
    const board_pk = req.query.board_pk;
    const comment_pk = req.query.comment_pk;
    const like_pk = req.query.like_pk;

    const board: Board | undefined = await Board.findOne({
      where: {
        board_pk,
      },
    });

    if (board) {
        const comment: BoardComment | undefined = await BoardComment.findOne({
          where: {
            comment_pk,
          },
        });

        if (comment) {
            const commentLike: BoardCommentLike | undefined = await BoardCommentLike.findOne({
                where: {
                    user_pk: user.pk,
                    like_pk,
                },
            });
        
            if(!commentLike) {
                BoardCommentLike.create({
                    user_pk: user.pk,
                    comment_pk,
                });
        
                res.status(200).json({
                    result: {
                        SUCCESS: true,
                        message: '댓글 좋아요 성공',
                    },
                });
            }    
        } else {
            next(new CustomError({ name: 'Database_Error' }));
        }
    } else {
      next(new CustomError({ name: 'Database_Error' }));
    }
}

export default createBoardCommentLike;