import { NextFunction, Request, Response } from 'express';
import User from '@Model/user.model';
import Board from '@Model/board.model';

const updateBoard = async (req:  Request, res: Response, next: NextFunction) => {
    const user: User = res.locals.user;
    const board: Board = res.locals.board;
    const { title, content } = req.body;

    try {
        await Board.update(
            {
                title: title,
                content: content,
                author: user.name,
            },
            {
            where: {
                pk: board.pk,
            },
        })
    } catch(err) {
        console.error(err);
        res.status(500).json({
            result: {
                SUCCESS: false,
                message: 'Server Error',
            }
        });
    }
}

export default updateBoard;

