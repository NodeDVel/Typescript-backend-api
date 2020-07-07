import { NextFunction, Request, Response } from 'express';

import Board from '@Model/board.model';
import Hastag from '../../../../../database/models/hastag.model';
import User from '../../../../../database/models/user.model';

import CustomError from '@Middleware/error/customError';

const deleteHastagLog = async (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;
  const board_pk: Board['pk'] = req.query.board_pk;
  const hastag_name: string = req.query.name;

  const hastag: Hastag = await Hastag.destroy({
    where: {
      user_pk: user.pk,
      board_pk,
      name: hastag_name,
    },
  });

  if (hastag) {
    next(new CustomError({ name: 'Database_Error' }));
  } else {
    res.json({ success: true });

    next();
  }
}

export default deleteHastagLog;