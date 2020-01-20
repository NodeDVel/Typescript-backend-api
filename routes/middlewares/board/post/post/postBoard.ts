import { NextFunction, Request, Response } from 'express';

import Board from '@Model/board.model';
import User from '@Model/user.model';

import CustomError from '@Middleware/error/customError';

const postBoard = async (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;
  const title: string | undefined = req.body.title;
  const content: string | undefined = req.body.content;

  try {
    if (user.name) {
      const board: Board = await Board.create({
        user_pk: user.pk,
        author: user.name,
        title,
        content,
      });

      res.status(200).json({
        success: true,
        data: {
          board: {
            pk: board.pk,
            author: user.name,
            title: board.title,
            content: board.content,
          },
        },
      })
    
      if(!board) {
        next(new CustomError({ name: 'Wrong_Data' }));
      } else {
          res.status(200).json({
            success: true,
          });
        }
  } else {
    next(new CustomError({ name: 'Wrong_Data' }));
  }
        
  } catch(err) {
      console.error(err);
      next(new CustomError({ name: 'Database_Error' }));
  }
}

export default postBoard;