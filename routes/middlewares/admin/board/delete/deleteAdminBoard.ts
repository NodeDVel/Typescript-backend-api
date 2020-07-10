import { NextFunction, Request, Response } from 'express';

import { deleteAdminBoardRequest } from './_validation';

import CustomError from '@Middleware/error/customError';

import Board from '@Model/board.model';

const deleteAdminBoard = async (req: Request, res: Response, next: NextFunction) => {
  const { board_pk }: deleteAdminBoardRequest['query'] = req.query;

  try {
    const board: Board = await Board.findOne({ where: { pk: board_pk } });

    if (board) {
      await board.destroy();

      res.json({
        success: true,
      });
    } else {
      next(new CustomError({ name: 'Wrong_Data' }));
    }

  } catch (error) {
    console.log(error);
    next(new CustomError({ name: 'Database_Error' }));
  }
}

export default deleteAdminBoard;