import { NextFunction, Request, Response } from 'express';

import { putAdminBoardRequest } from './_validation';

import CustomError from '@Middleware/error/customError';

import Board from '@Model/board.model';

const putAdminBoard = async (req: Request, res: Response, next: NextFunction) => {
  const { board_pk }: putAdminBoardRequest['body'] = req.query;
  const title: Board['title'] = req.body;
  const content: Board['content'] = req.body;
  const author: Board['author'] = req.body;

  try {
    const board: Board = await Board.findOne({
      where: {
        pk: board_pk,
      }
    });

    const updateBoard: Board = await board.update({
      title,
      content,
      author,
    });

    res.json({
      sucess: true,
      data: {
        updateBoard,
      },
    })
    
  } catch(error) {
    console.log(error);
    next(new CustomError({ name: 'Database_Error' }));
  }
}

export default putAdminBoard;