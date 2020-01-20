import { NextFunction, Request ,Response } from 'express'

import CustomError from '@Middleware/error/customError';

import User from '@Model/user.model';

const register = async (req: Request, res: Response, next: NextFunction) => {
  const id: User['id'] = req.body.id;
  const name: User['name'] = req.body.name;
  const password: User['password'] = res.locals.temp.password;

  try {
    await User.create({
        id,
        password,
        name,
    });

    res.json({
      success: true,
    });

  } catch(error) {
    console.error(error);
    next(new CustomError({ name: 'Database_Error' }));
  }
};

export default register;