import { NextFunction, Request, Response } from 'express';

import Page from '@Model/page.model';
import User from '@Model/user.model';

import CustomError from '@Middleware/error/customError';

const postPage = async (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;
  const pageName: string = req.body.name;
  const content: string | undefined = req.body.content;
  const introduction: string | undefined = req.body.introduction;

  try {

    if(pageName === undefined || null) {
      next(new CustomError({ name: 'Wrong_Data'}));
    }

    const page: Page = await Page.create(
      {
        user_pk: user.pk,
        user_name: user.name,
        pageName,
        content,
        introduction,
      },
    )

    res.json({
      success: true,
      data: {
        page: {
          pk: page.pk,
          user_name: page.user_name,
          name: page.pageName,
          content: page.content,
          introduction: page.introduction,
        },
      },
    });
  } catch(err) {
    console.log(err);
    next(new CustomError({ name: 'Database_Error' }));
  }

}

export default postPage;