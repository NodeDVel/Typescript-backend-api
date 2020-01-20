import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import User from '@Model/user.model';

const issueToken = (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;
  const secretKey: string = process.env.ACCESS_TOKEN_SECRET;

  const accessToken = jwt.sign({
    pk: user.pk,
  },
  secretKey,
  {
    expiresIn: '1h',
  });

  res.json({
    success: true,
    data: {
      user_id: user.id,
      user_name: user.name,
      admin: user.admin,
      access_token: accessToken,
    },
  });
}

export default issueToken;