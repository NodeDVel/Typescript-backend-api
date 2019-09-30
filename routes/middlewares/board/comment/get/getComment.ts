import { NextFunction, Request, Response } from 'express';

import Board from '@Model/board.model';
import BoardComment from '@Model/boardComment.model';
import User from '@Model/user.model';

const getComment = async (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;
  const comment: BoardComment = res.locals.comment;
  const board: Board = res.locals.board;

  
}

export default getComment;