import { NextFunction, Request, Response } from 'express';

import CustomError from '@Middleware/error/customError';

import Board from '@Model/board.model';

const getBoard = async (req: Request, res: Response, next: NextFunction) => {
    const board_pk: Board['pk'] = req.query.board_pk;
    const limit: number | undefined = 10;
    const page: number = req.query.page;

    try {
      const board: { rows: Board[], count: number } = await Board.findAndCountAll({
          where: {
            board_pk,
          },
          limit,
          offset: page * limit,
          order: [['createAt', 'DESC']],
          attributes: ['pk', 'user_pk', 'user_name', 'content', 'crateAt'],
      });

      if (board) {
        res.json({
          success: true,
          data: {
            board: {
              board,
            },
          },
        });
      } else {
        res.status(412).json({
          success: false,
          message: '잘못된 요청데이터입니다.',
        })
      }
    } catch (error) {
      console.log(error);
      next(new CustomError({ name: 'Database_Error' }));
    }
}

export default getBoard;