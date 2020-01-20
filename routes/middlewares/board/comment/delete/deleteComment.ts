import { NextFunction, Request, Response } from 'express';

import Board from '../../../../../database/models/board.model';
import BoardComment from '../../../../../database/models/boardComment.model';
import User from '../../../../../database/models/user.model';

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
      include: [
        {
          model: BoardComment,
          where: {
            pk: comment_pk,
            user_pk: user.pk,
          },
        },
      ],
    });

    if (board) {
      await BoardComment.destroy({
        where: {
          pk: comment_pk,
        },
      });

      res.status(200).json({
        success: true,
      });

    } else {
      next(new CustomError({ name: 'Wrong_Data' }));
    }

  } catch (err) {
    console.error(err);
    next(new CustomError({ name: 'Database_Error' }));
  }
}

export default deleteComment;