import { NextFunction, Request, Response } from 'express';

import Board from '@Model/board.model';
import BoardComment from '@Model/boardComment.model';
import User from '@Model/user.model';

import CustomError from '@Middleware/error/customError';

const deleteComment = async (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;
  const board_pk: Board['pk'] = req.query.board_pk;
  const comment_pk: BoardComment['pk'] = req.query.comment_pk;

  try {
    const board: Board = await Board.findOne({
      where: {
        pk: board_pk,
      },
      include: [{
        model: BoardComment,
        where: {
          pk: comment_pk,
          user_pk: user.pk,
        },
      }],
    });

    if (board) {
      await BoardComment.destroy({ where: { pk: comment_pk }});

      res.json({ succes: true });

      next();

    } else {
      next(new CustomError({ name: 'Wrong_Data' }));
    }

  } catch (err) {
    console.error(err);
    next(new CustomError({ name: 'Database_Error' }));
  }
}

export default deleteComment;