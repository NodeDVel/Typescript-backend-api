import { NextFunction, Request, Response } from 'express';

import Board from '@Model/board.model';
import BoardComment from '@Model/boardComment.model';

import { getCommnetRequest } from './_validation';

import CustomError from '@Middleware/error/customError';

const getComment = async (req: Request, res: Response, next: NextFunction) => {
  const board_pk: getCommnetRequest['query'] = req.query.board_pk;

  try {
    const board: Board | null = await Board.findOne({
      where: {
        pk: board_pk,
      },
    });
    if (board) {
      const findByComment: BoardComment | null = await BoardComment.findOne({
        where: {
          board_pk,
        },
      });

      if (findByComment) {
        res.json({
          success: true,
          data: {
            findByComment,
          },
        });
      } else {
        next(new CustomError({ name: 'Database_Error' }));
      }
    } else {
      next(new CustomError({ name: 'Database_Error' }));
    }

  } catch (err) {
    console.log(err);
    next(new CustomError({ name: 'Database_Error' }));
  }


}

export default getComment;