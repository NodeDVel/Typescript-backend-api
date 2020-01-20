import { NextFunction, Request, Response } from 'express';

import CustomError from '@Middleware/error/customError';

import Notice from '@Model/notice.model';
import User from '@Model/user.model';

const postAdminNotice = async (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;
  const title: Notice['title'] = req.body;
  const content: Notice['content'] = req.body;

  try {
    const notice: Notice = await Notice.create({
      user_pk: user.pk,
      user_name: user.name,
      title,
      content,
    });

    res.json({
      success: true,
      data: {
        notice: {
          pk: notice.pk,
          user_name: notice.user_name,
          title: notice.title,
          content: notice.content,
        },
      },
    });
    
  } catch(error) {
    console.log(error);
    next(new CustomError({ name: 'Database_Error' }));
  }
}

export default postAdminNotice;