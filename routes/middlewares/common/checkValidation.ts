import { NextFunction , Request, Response} from 'express';
import { validationResult } from 'express-validator';

import CustomError from '@Middleware/error/customError';

const checkValidation = (req: Request, res: Response, next: NextFunction) => {
    const error = validationResult(req);
    if(error.array().length) {
        console.log(error.array());
        next(new CustomError({ name: 'Wrong_Data' }));
    }
    next();
}

export default checkValidation;