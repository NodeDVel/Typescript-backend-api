import { NextFunction, Request, Response } from 'express';

import { PostLikeLogRequest } from './_validation';

import Board from '@Model/board.model';
import BoardLike from '@Model/boardlike.model';
import BoardLikeLog from '@Model/boardLikeLog.model';
import User from '@Model/user.model';

import CustomError from '../../../error/customError';

const likeBoardLog = async (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;
  const { board_pk }: PostLikeLogRequest['body'] = req.body;
  const { like_pk }: PostLikeLogRequest['body'] = req.body;

  try {
    const boardLike: BoardLike = await BoardLike
      .findOne({
        where: {
          pk: user.pk,
          board_pk,
          like: true,
        },
      });

    if (!boardLike || (boardLike.like === !typeof (Boolean))) {
      next(new CustomError({ name: 'Wrong_Data' }));
    } else if (boardLike.like === false) {
      next(new CustomError({ name: 'Wrong_Data' }));
    } else {
      const board: Board | undefined = await Board.findOne({
        where: {
          board_pk,
          like_pk,
        },
      });

      if (board) {
        const LikeLog: BoardLikeLog = await BoardLikeLog.create({
          board_pk,
          like_pk,
          user_name: user.name,
          board_title: board.title,
          board_content: board.content,
          author: board.author,
        });

        if (!LikeLog) {
          next(new CustomError({ name: 'Database_Error' }));
        } else {
          res.json({ success: true });
        }
      } else {
        next(new CustomError({ name: 'Database_Error' }));
      }
    }
  } catch (err) {
    console.log(err);
    next(new CustomError({ name: 'Database_Error' }));
  }

}

export default likeBoardLog;