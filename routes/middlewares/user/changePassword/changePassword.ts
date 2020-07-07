import { NextFunction, Request, Response } from 'express';

import User from '@Model/user.model';

import CustomError from '@Middleware/error/customError';

const changePassword = async (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;
  const temp = res.locals.temp;

  try {
    await User.update(
      {
        password: temp.password,
      }, {
      where: {
        pk: user.pk,
      },
    });

    res.json({
      success: true,
      message: '비밀번호가 변경되었습니다.',
    })

  } catch (err) {
    console.log(err);
    next(new CustomError({ name: 'Database_Error' }));
  }
}

export default changePassword;