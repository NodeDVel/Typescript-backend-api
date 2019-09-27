import { NextFunction, Request, Response } from 'express';

import Board from '../../../../database/models/board.model';
import BoardComment from '../../../../database/models/boardComment.model';
import User from '../../../../database/models/user.model';

const updateComment = async (req: Request, res: Response, next: NextFunction) => {
    const user: User = res.locals.user;
    const board: Board = res.locals.board;
    const { content } = req.body;

    try {
        const comment: BoardComment = await BoardComment.update(
            {   
                content: content,
                author: user.name,
            }, 
            {
                where: {
                    pk: board.pk,
                }
            });

        if(!comment) {
            res.status(412).json({
                result: {
                    SUCCESS: false,
                    message: '댓글이 수정되지 않았습니다',
                },
            });
        } else {
            res.status(200).json({
                result: {
                    SUCESS: true,
                    message: '댓글이 변경되었습니다.',
                },
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

export default updateComment;