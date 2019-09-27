import { NextFunction, Request, Response } from 'express';

import Board from '../../../../database/models/board.model';
import Hastag from '../../../../database/models/hastag.model';

const createHastag = async (req: Request, res: Response, next: NextFunction) => {
    const board: Board = res.locals.board;
    const hastag_name: string | number = req.body;

    if(hastag_name){
        for(let i = 0; i < hastag_name; i++) {
            await Hastag.create({
                board_pk: board.pk,
                title: hastag_name[i],
            }).then(result => {
                if (!result) {
                    res.status(412).json({
                        result: {
                            SUCCESS: false,
                            message: 'database error',
                        },
                    });
                }
            });
        }
    } else {
        res.json({
            result: {
                SUCCESS: true,
                message: 'hastag가 생성되어 있지 않습니다',
            },
        })
    }
    res.json({
        result: {
            SUCCESS: true,
            message: 'hastag 생성되었습니다'
        }
    });
} 

export default createHastag;