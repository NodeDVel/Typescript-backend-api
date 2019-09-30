import { NextFunction, Request, Response } from 'express';

import Board from '../../../../../database/models/board.model';
import Comment from '../../../../../database/models/boardComment.model';
import User from '../../../../../database/models/user.model';

const deleteComment = async (req: Request, res: Response, next: NextFunction) => {
    const user: User = res.locals.user;
    const board_pk = req.query.board_pk;
    const comment_pk = req.query.comment_pk;
    const comment: Comment = res.locals.comment;

    try {
        const board: Board = await Board.findOne({
            where: {
                pk: board_pk,
            },
            include: [
                {
                    model: comment_pk,
                    where: {
                        pk: comment.pk,
                        user_pk: user.pk,
                    },
                },
            ],
        });

        if(board) {
            await Comment.destroy({
                where: {
                    pk: comment.pk,
                },
            });

            res.status(200).json({
                result: {
                    SUCCESS: true,
                    message: '댓글이 정상적으로 삭제되었습니다',
                },
            });
        } else {
            res.status(412).json({
                result: {
                    SUCCESS: false,
                    message: '잘못된 요청 데이터입니다. 다시 시도해주세요',
                }
            });
        }
        
    } catch(err) {
        console.error(err);
        res.status(500).json({
            result: {
                SUCCESS: false,
                message: 'Server Error',
            },
        });
    }
}

export default deleteComment;