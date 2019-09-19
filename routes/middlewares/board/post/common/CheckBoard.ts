import { NextFunction, Request, Response } from 'express';
import Board from '@Model/board.model';

const CheckBoard = async (req: Request, res: Response, next: NextFunction) => {
    const pk = req.query.boardId;

    try {
        await Board.findOne({
            where: { pk },
        }).then((board: Board) => {
            if(!board) {
                res.status(500).json({
                    result: {
                        SUCCESS: false,
                        message: '게시물이 존재하지 않습니다.',
                    },
                });
            } else {
                res.locals.board = board;
                next();
            }
        });
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

export default CheckBoard;