import { NextFunction, Request, Response } from 'express';

import Board from '@Model/board.model';
import User from '@Model/user.model';

const createBoard = async (req: Request, res: Response, next: NextFunction) => {
    const user: User = res.locals.user;
    const title: string | undefined = req.body.title;
    const content: string | undefined = req.body.content;

    try {
        if (user.name) {
            const board: Board = await Board.create({
                user_pk: user.pk,
                author: user.name,
                title,
                content,
            });

            res.status(200).json({
              success: true,
              data: {
                board: {
                  pk: board.pk,
                  author: user.name,
                  title: board.title,
                  content: board.content,
                },
              },
            })
    
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
        } else {
            res.status(412).json({
                success: false,
                message: '작성자 이름을 적어주세요',
            })
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