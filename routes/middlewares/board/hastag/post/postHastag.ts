import { NextFunction, Request, Response } from 'express';

import Hastag from '../../../../../database/models/hastag.model';

import { postHastagRequest } from './_validation';

const postHastag = async (req: Request, res: Response, next: NextFunction) => {
    const hastag_name: string | number | undefined = req.body;
    const board_pk: postHastagRequest['body'] = req.body.board_pk;

    if(hastag_name){
        for(let i = 0; i < hastag_name[i]; i++) {
            await Hastag.create({
                board_pk,
                title: hastag_name[i],
            }).then((hastag: Hastag) => {
                if (!hastag) {
                    res.status(412).json({
                        result: {
                            SUCCESS: false,
                            message: 'database error',
                        },
                    });
                } else {
                    console.log('hastag create OK!');
                    next();
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
        },
    });
}

export default postHastag;