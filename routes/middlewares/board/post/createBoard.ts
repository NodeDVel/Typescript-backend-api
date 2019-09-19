import { NextFunction, Request, Response } from 'express';
import User from '@Model/user.model';
import Board from '@Model/board.model';

const createBoard = async (req: Request, res: Response, next: NextFunction) => {
    const user: User = res.locals.user;
    const { title, content } = req.body;

    try {
        await Board.create({
            userPk: user.pk,
            title: title,
            content: content,
            author: user.name,
        });

        res.status(200).json({
            result: {
                SUCCESS: true,
                message: 'Create Board Ok',
            },
        });

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