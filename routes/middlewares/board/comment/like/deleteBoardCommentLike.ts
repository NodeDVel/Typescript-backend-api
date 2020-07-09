import { NextFunction, Request, Response } from 'express';

import Board from '@Model/board.model';
import BoardComment from '@Model/boardComment.model';
import BoardCommentLike from '@Model/boardCommentLike.model';
import User from '@Model/user.model';

import CustomError from '@Middleware/error/customError';

const deleteBoardCommentLike = async (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;
  const board_pk: Board['pk'] = req.query.board_pk
  const comment_pk: BoardComment['pk'] = req.query.comment_pk;
  const like_pk: BoardCommentLike['pk'] = req.query.like_pk;

  try {
    const commentLike: BoardCommentLike | undefined = await BoardCommentLike.findOne({
      where: {
        user_pk: user.pk,
        board_pk,
        comment_pk,
        like_pk,
      },
    });

    if (commentLike) {
      await BoardCommentLike.destroy({
        where: {
          pk: user.pk,
          comment_pk,
        },
      });

      res.json({ success: true });

      next();
    }
  } catch (err) {
    console.log(err);
    next(new CustomError({ name: 'Database_Error' }));
  }
}

export default deleteBoardCommentLike;