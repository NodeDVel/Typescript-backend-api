import { NextFunction, Request, Response } from 'express';

import CustomError from '@Middleware/error/customError';

import Board from '@Model/board.model';
import Comment from '@Model/boardComment.model';
import User from '@Model/user.model';

const getComment = async (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;
  const board_pk: Board['pk'] = req.query.board_pk;
  const comment_pk: Comment['pk'] = req.query.comment_pk;

  const result: Board | null = await Board.findOne({
    where: {
      pk: board_pk,
    },
  });

  if(result) {
    const findComment: Comment | null = await Comment.findOne({
      where: {
        pk: comment_pk,
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