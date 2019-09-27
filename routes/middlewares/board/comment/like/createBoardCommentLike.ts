import { NextFunction, Request, Response } from 'express';

import Board from '../../../../../database/models/board.model';
import BoardComment from '../../../../../database/models/boardComment.model';
import BoardCommentLike from '../../../../../database/models/boardCommentLike.model';
import User from '../../../../../database/models/user.model';

const createBoardCommentLike = async (req: Request, res: Response, next: NextFunction) => {
    const user: User = res.locals.user;
    const board: Board = res.locals.board;
    const boardComment: BoardComment = res.locals.comment;

    const commentLike: BoardCommentLike = await BoardCommentLike.findOne({
        where: {
            user_pk: user.pk,
            board_pk: board.pk,
            comment_pk: boardComment.pk,
        },
    });

    if(!commentLike) {
        BoardCommentLike.create({
            user_pk: user.pk,
            comment_pk: boardComment.pk,
        });

        res.status(200).json({
            result: {
                SUCCESS: true,
                message: '댓글 좋아요 성공',
            }
        });
    }

}

export default createBoardCommentLike;