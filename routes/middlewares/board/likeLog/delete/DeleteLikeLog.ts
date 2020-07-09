import { NextFunction, Request, Response } from 'express';

import Board from '@Model/board.model';
import BoardLike from '@Model/boardlike.model';
import BoardLikeLog from '@Model/boardLikeLog.model';

import { deleteLikeLogRequest } from './_validation';

import CustomError from '@Middleware/error/customError';

const deleteLikeLog = async (req: Request, res: Response, next: NextFunction) => {
  const board_pk: deleteLikeLogRequest['body'] = req.body.board_pk;
  const like_pk: deleteLikeLogRequest['body'] = req.body.like_pk;

  try {
    const likeLog: BoardLikeLog | null = await BoardLikeLog.findOne({
      where: {
        pk: board_pk,
        like_pk,
        like: true,
      },
    });

    if (likeLog || (likeLog.like === !typeof (Boolean) || likeLog.like === true)) {
      await BoardLikeLog.destroy();

      res.json({ success: true });

      next();
    } else {
      next(new CustomError({ name: 'Database_Error' }));
    }
  } catch (err) {
    console.log(err);
    next(new CustomError({ name: 'Database_Error' }));
  }


}

export default deleteLikeLog;