import { NextFunction, Request, Response } from 'express';

import Board from '../../../../../database/models/board.model';
import BoardComment from '../../../../../database/models/boardComment.model';
import BoardCommentLike from '../../../../../database/models/boardCommentLike.model';
import User from '../../../../../database/models/user.model';

const deleteBoardCommentLike = async (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;
  const board_pk = req.query.board_pk
  const comment_pk = req.query.comment_pk;
  const like_pk = req.query.like_pk;

  const commentLike: BoardCommentLike | undefined = await BoardCommentLike.findOne({
    where: {
      user_pk: user.pk,
      board_pk,
      comment_pk,
      like_pk,
    },
  });

  if (commentLike) {
    BoardCommentLike.destroy({
      where: {
        pk: user.pk,
        comment_pk,
      },
    });

    res.json({ success: true });
  }
}

export default deleteBoardCommentLike;