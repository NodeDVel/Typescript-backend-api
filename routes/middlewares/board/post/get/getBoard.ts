import { NextFunction, Request, Response } from 'express';

import User from '@Model/user.model';

const getBoard = (req: Request, res: Response, next: NextFunction) => {
    const user: User = res.locals.user;
}

export default getBoard;