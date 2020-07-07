import { NextFunction, Request, Response } from 'express';

import User from '@Model/user.model';

import CustomError from '@Middleware/error/customError';

const CheckUser = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.body;
  try {
    await User.findOne({
      where: {
        id,
      },
    }).then((user: User) => {
      switch (req.path) {
        case '/register':
          if (user) {
            next(new CustomError({ name: 'Exist_User' }));
          } else {
            next();
          }

        case '/login':
          if (user) {
            res.locals.user = user;
            next();
          } else {
            next(new CustomError({ name: 'Not_User' }));
          }
      }
    });
  } catch (err) {
    console.log(err);
    next(new CustomError({ name: 'Database_Error' }));
  }

}

export default CheckUser;