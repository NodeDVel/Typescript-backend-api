import { NextFunction, Request, Response } from 'express';
import User from '@Model/user.model';
import Board from '@Model/board.model';

const deleteBoard = async (req: Request, res: Response, next: NextFunction) => {
    const board: Board = res.locals.board;

    try {
        await Board.destroy({
            where: {
                pk: board.pk,
            },
        });
    
        res.status(200).json({
            result: {
                SUCCESS: true,
                message: '게시물이 정상적으로 삭제되었습니다.',
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

export default deleteBoard;