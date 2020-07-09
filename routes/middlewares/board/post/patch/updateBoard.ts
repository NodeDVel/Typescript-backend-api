import { NextFunction, Request, Response } from 'express';

import Board from '@Model/board.model';
import User from '@Model/user.model';

import CustomError from '@Middleware/error/customError';

const updateBoard = async (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;
  const board_pk: Board['pk'] = req.query.board_pk
  const title: string | undefined = req.body;
  const content: string | undefined = req.body;

  try {
    const board: Board | undefined = await Board.findOne({
      where: {
        board_pk,
      },
    });

    if (board) {
      await Board
        .update({
          title,
          content,
          author: user.name,
        },
          {
            where: {
              pk: board_pk,
            },
          }).then((board: Board) => {
            if (!board) {
              next(new CustomError({ name: 'Wrong_Data' }));
            } else {
              res.json({ success: true });
            }
          });

    }
  } catch (err) {
    console.error(err);
    next(new CustomError({ name: 'Database_Error' }));
  }
}

export default updateBoard;