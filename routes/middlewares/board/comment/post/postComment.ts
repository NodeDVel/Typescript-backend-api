import { NextFunction, Request, Response } from 'express';

import { PostCommentParams } from './_validation';

import Board from '@Model/board.model';
import BoardComment from '@Model/boardComment.model';
import User from '@Model/user.model';

import CustomError from '@Middleware/error/customError';

const createComment = async (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;
  const { board_pk }: PostCommentParams['body'] = req.body;
  const comment: string | undefined = req.body.comment;

  try {
    const board: Board | undefined = await Board.findOne({
      where: {
        pk: board_pk,
      },
    });

    if (board) {
      const boardComment: BoardComment = await BoardComment
        .create({
          board_pk,
          comment,
          user_pk: user.pk,
          author: user.name,
        });

      res.json({
        success: true,
        data: {
          pk: boardComment.pk,
          author: user.name,
          comment: boardComment.comment,
        },
      });

      if (!boardComment) {
        next(new CustomError({ name: 'Not_Found_Comment', message: '댓글이 작성되지 않았습니다.' }));
      } else {
        res.json({ success: true });
      }

    }
  } catch (err) {
    console.error(err);
    next(new CustomError({ name: 'Database_Error' }));
  }
}

export default createComment;