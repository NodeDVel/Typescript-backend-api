import { NextFunction, Request, Response } from 'express';

import BoardLikeLog from '../../../../../database/models/boardLikeLog.model';

const likeLogDelete = async (req: Request, res: Response, next: NextFunction) => {
  const board_pk = req.query.board_pk;
  const like_pk = req.query.like_pk;

  const likeLog: BoardLikeLog | null = await BoardLikeLog.findOne({
      where: {
          board_pk,
          like_pk,
      },
  });

  if(likeLog || (likeLog.like === !typeof(Boolean) || likeLog.like === true)) {
    await BoardLikeLog.destroy();
  }

}

export default likeLogDelete;