import { NextFunction, Request, Response } from 'express';
import BoardComment from '../../../../../database/models/boardComment.model';

const createComment = async (req: Request, res: Response, next: NextFunction) => {
    const { comment } = req.body;
    const { user, board } = res.locals;

    try {
        const boardcomment: BoardComment = await BoardComment.create({
            board_pk: board.pk,
            user_pk: user.pk,
            author: user.name,
            comment,
        });

        if(!boardcomment) {
            res.status(500).json({
                result: {
                    SUCCESS: true,
                    message: '댓글이 작성되지 않았습니다.',
                },
            });
        } else {
            res.status(200).json({
                result: {
                    SUCCESS: true,
                    message: '댓글이 작성되었습니다.',
                },
            });
        }      
    } catch(err) {
        console.error(err);
        res.status(500).json({
            result: {
                SUCCESS: false,
                message: 'Server error',
            }
        });
    }
}

export default createComment;