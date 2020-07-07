import { NextFunction ,Request, Response } from 'express';

import User from '@Model/user.model';

import CustomError from '@Middleware/error/customError';

const login = (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;
  const password = res.locals.temp.password;

  if(user.password === password) {
    res.locals.user = {
      pk: user.pk,
      id: user.id,
      name: user.name,
      admin: user.admin,
      password,
    };

    next();
  } else {
    next(new CustomError({ name: 'Not_User', message: '등록되지 않는 회원이거나, 아이디나 비밀번호를 잘못 입력하셨습니다.' }));
  }

}

export default login;