import * as crypto from 'crypto';
import { NextFunction, Request, Response } from 'express';

import User from '../../../../database/models/user.model';

const passwordEncryption = async (req: Request, res: Response, next: NextFunction) => {
    const user: User =  res.locals.user;
    const password: string = req.body.password;

    crypto.randomBytes(64, (randomBytesError, buf) => {
        if(randomBytesError) {
            console.log(randomBytesError);
            res.status(403).json({
                result: {
                    SUCCESS: false,
                    message: '알 수 없는 오류입니다',
                }
            });

        } else {
            const bufBase64 = buf.toString('base64');
            const EncryptedPassword = crypto.pbkdf2(password, bufBase64, 427832, 64, 'sha512', (pbkdf2Error, pwEncrypted) => {
                if(pbkdf2Error) {
                    console.log(pbkdf2Error);
                    res.status(403).json({
                        result: {
                            SUCCESS: false,
                            message: '알 수 없는 오류입니다',
                        }
                    });

                } else {
                    User.update({ password: EncryptedPassword, },{ where : { pk: user.pk }});

                    res.locals.temp = {
                        password: EncryptedPassword,
                    };
                }
            });
        }
    });
}

export default passwordEncryption;