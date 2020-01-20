import { NextFunction, Request, Response } from 'express';

import Board from '@Model/board.model';
import User from '@Model/user.model';

import CustomError from '@Middleware/error/customError';

const deleteBoard = async (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;
  const board_pk: Board['pk'] = req.query.board_pk;

  try {
    const board: Board = await Board.findOne({
      where: {
        pk: user.pk,
        board_pk,
      },
    });

    if(board) {
      await Board.destroy({
        where: {
          pk: board_pk,
        },
      });

      res.status(200).json({
        success: true,
      });
    } else {
      next(new CustomError({ name: 'Wrong_Data' }));  
    }
    
  } catch(err) {
      console.error(err);
      next(new CustomError({ name: 'Database_Error' }));
    }  
}

export default deleteBoard;