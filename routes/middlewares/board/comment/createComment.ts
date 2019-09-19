import { NextFunction, Request, Response } from 'express';
import Comment from '@Model/comment.model';

const createComment = async (req: Request, res: Response, next: NextFunction) => {
    const { comment } = req.body;
    const { user, board } = res.locals;

    try {
        await Comment.create({
            boardPk: board.pk,
            userPk: user.pk,
            comment: comment,
            author: user.name,
        });

        res.status(500).json({
            result: {
                SUCCESS: true,
                message: '댓글이 작성되었습니다.',
            }
        });      
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