import { NextFunction, Request, Response } from 'express';

import User from '@Model/user.model';

import CustomError from '@Middleware/error/customError';


const checkAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;

  if(!user.admin) {
    next(new CustomError({ name: 'Forbidden' }));
  }

  next();
}

export default checkAdmin;