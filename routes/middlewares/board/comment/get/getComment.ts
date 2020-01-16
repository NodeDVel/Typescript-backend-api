import { NextFunction, Request, Response } from 'express';

import Board from '@Model/board.model';
import BoardComment from '@Model/boardComment.model';

import { getCommnetRequest } from './_validation';

const getComment = async (req: Request, res: Response, next: NextFunction) => {
  const board_pk: getCommnetRequest['query'] = req.query.board_pk;

  const result: Board | null = await Board.findOne({
    where: {
      pk: board_pk,
    },
  });

  if(result) {
    const findComment: BoardComment | null = await BoardComment.findOne({
      where: {
        board_pk,
      },
    });

    if(findComment) {
      res.json({
        success: true,
        data: {
          findComment,
        },
      });
    } else {
      res.status(512).json({
        success: false,
        message: '데이터베이스 오류',
      });
    }
  } else {
    res.status(512).json({
      success: false,
      message: '데이터베이스 오류',
    })
  }
}

export default getComment;