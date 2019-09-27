import { NextFunction, Request, Response } from 'express';

import Board from '../../../../database/models/board.model';
import User from '../../../../database/models/user.model';

const deleteBoard = async (req: Request, res: Response, next: NextFunction) => {
    const user: User = res.locals.user;
    const board_pk: string | number  = req.query.board_pk;

    try {
        const board: Board = await Board.findOne({
            where: {
                pk: user.pk,
                board_pk: board_pk
            },
        });

        if(board) {
            await Board.destroy({
                where: {
                    pk: board_pk,
                },
            });

            res.status(200).json({
                result: {
                    SUCCESS: true,
                    message: '게시물이 정상적으로 삭제되었습니다',
                },
            });
        } else {
            res.status(412).json({
                result: {
                    SUCCESS: false,
                    message: '잘못된 요청데이터입니다. 다시 시도해주세요.',
                },
            });
        }
    
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