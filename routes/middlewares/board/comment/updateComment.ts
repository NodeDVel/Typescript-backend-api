import { NextFunction, Request, Response } from 'express';
import Comment from '@Model/comment.model';
import Board from '@Model/board.model';
import User from '@Model/user.model';

const updateComment = async (req: Request, res: Response, next: NextFunction) => {
    const user: User = res.locals.user;
    const board: Board = res.locals.board;
    const { content } = req.body;

    try {
        await Comment.update(
            {   
                content: content,
                author: user.name,
            }, 
            {
                where: {
                    pk: board.pk,
                }
            });

        res.status(200).json({
            result: {
                SUCCESS: true,
                message: '댓글이 변경되었습니다',
            },
        });
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

export default updateComment;