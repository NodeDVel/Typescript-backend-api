import { NextFunction, Request, Response } from 'express';

import Board from '@Model/board.model';
import User from '@Model/user.model';

const createBoard = async (req: Request, res: Response, next: NextFunction) => {
    const user: User = res.locals.user;
    const title: string | undefined = req.body.title;
    const content: string | undefined = req.body.content;

    try {
        const board: Board = await Board.create({
            user_pk: user.pk,
            author: user.name,
            title: title,
            content: content,
        });

        if(!board) {
            res.status(404).json({
                result: {
                    SUCCESS: false,
                    message: 'Not created Board.',
                },
            });
        } else {
            res.status(200).json({
                result: {
                    SUCCESS: true,
                    message: 'Create Board Ok',
                },
            });
        }
        
    } catch(err) {
        console.error(err);
        res.status(500).json({
            result: {
                SUCCESS: false,
                message: 'DB Error',
            }
        });
    }
}

export default createBoard;