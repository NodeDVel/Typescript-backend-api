import { NextFunction ,Request, Response } from 'express';

import User from '@Model/user.model';

import CustomError from '@Middleware/error/customError';

const login = (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;
  const password = res.locals.temp.password;

  if(user.password !== password) {
    next(new CustomError({ name: 'Wrong_Data' }));
  }

  res.locals.user = {
    pk: user.pk,
    id: user.id,
    name: user.name,
    admin: user.admin,
    password,
  };

  next();
}

export default login;