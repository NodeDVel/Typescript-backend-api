import { NextFunction, Request, Response } from 'express';

import Board from '../../../../../database/models/board.model';
import BoardComment from '../../../../../database/models/boardComment.model';
import User from '../../../../../database/models/user.model';

import CustomError from '@Middleware/error/customError';

const updateComment = async (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;
  const board_pk: Board['pk'] = req.query.board_pk;
  const content: string | undefined = req.body;

  try {
    const board: Board | undefined = await Board.findOne({
      where: {
        board_pk,
      },
    });

    if (board) {
      const comment: BoardComment[] = await BoardComment.update(
        {
          author: user.name,
          content,
        },
        {
          where: {
            pk: board_pk,
          },
        });

      if (!comment) {
        next(new CustomError({ name: 'Wrong_Data' }));
      } else {
        res.status(200).json({
          success: true,
        });
      }

    }
  } catch (err) {
    console.error(err);
    next(new CustomError({ name: 'Database_Error' }));
  }
}

export default updateComment;