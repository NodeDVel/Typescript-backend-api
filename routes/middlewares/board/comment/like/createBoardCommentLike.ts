import { NextFunction, Request, Response } from 'express';

import Board from '@Model/board.model';
import BoardComment from '@Model/boardComment.model';
import BoardCommentLike from '@Model/boardCommentLike.model';
import BoardLike from '@Model/boardlike.model';
import User from '@Model/user.model';

import CustomError from '@Middleware/error/customError';

const createBoardCommentLike = async (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;
  const board_pk: Board['pk'] = req.query.board_pk;
  const comment_pk: BoardComment['pk'] = req.query.comment_pk;
  const like_pk: BoardLike['pk'] = req.query.like_pk;

  try {
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
            pk: like_pk,
            user_pk: user.pk,
          },
        });

        if (!commentLike) {
          await BoardCommentLike.create({
            user_pk: user.pk,
            comment_pk,
          });

          res.json({ success: true });
        }
      } else {
        next(new CustomError({ name: 'Database_Error' }));
      }
    } else {
      next(new CustomError({ name: 'Database_Error' }));
    }
  } catch (err) {
    console.log(err)
    next(new CustomError({ name: 'Database_Error' }));
  }
}

export default createBoardCommentLike;