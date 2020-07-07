import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import User from '@Model/user.model';
import { type } from 'os';

const issueToken = (type: 'login' | 'none' ) => (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;
  const secretKey: string = process.env.ACCESS_TOKEN_SECRET;

  const accessToken = jwt.sign({ // 토큰 발급
    pk: user.pk,
  },
  secretKey,
  {
    expiresIn: '24h',
  });

  res.json({
    success: true,
    accessToken,
    data: {
      user:
        type === 'login'
        ? {
          id: user.id,
          name: user.name,
          admin: user.admin,
        } : undefined
      },
  });
}

export default issueToken;