import { NextFunction, Request, Response } from 'express';

import Hastag from '../../../../../database/models/hastag.model';
import User from '../../../../../database/models/user.model';

const deleteHastagLog = async (req: Request, res: Response, next: NextFunction) => {
    const user: User = res.locals.user;
    const board_pk = req.query.board_pk;
    const hastag_name: string = req.query.name;

    const hastag: Hastag = await Hastag.destroy({
        where: {
            user_pk: user.pk,
            board_pk,
            name: hastag_name,
        },
    });

    if(hastag) {
        res.status(412).json({
            result: {
                SUCCESS: false,
                message: 'DB Error', // 정상적으로 삭제되지 않았을 시에 DB 에러
            },
        });
    } else {
        res.status(200).json({
            result: {
                SUCCESS: true,
                message: '정상적으로 삭제되었습니다.', // 없다는 소리는 삭제되었다는 소리기 때문에 오류가 아닌 정상
            },
        });
        next();
    }
}

export default deleteHastagLog;