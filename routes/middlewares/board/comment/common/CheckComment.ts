import { NextFunction, Request, Response } from 'express';
import Comment from '@Model/comment.model';

const CheckComment = async (req: Request, res: Response, next: NextFunction) => {
    const pk = req.query.commentPk;

    try {
        await Comment.findOne({
            where: {
                pk: pk,
            },
        }).then((comment: Comment) => {
            if(!comment) {
                res.status(500).json({
                    result: {
                        SUCCESS: false,
                        message: '댓글이 작성되지 않았습니다',
                    },
                });
            } else {
                res.locals.comment = comment;
                next();
            }
        });
    } catch(err) {
        console.error(err);
        res.status(500).json({
            result: {
                SUCCESS: false,
                message: 'Server error'
            },
        });
    }
}

export default CheckComment;