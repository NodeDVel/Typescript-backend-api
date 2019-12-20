import { NextFunction, Request, Response } from 'express';

import Page from '@Model/page.model';
import User from '@Model/user.model';

const postPage = async (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;
  const pageName: string | undefined = req.body.name;
  const content: string | undefined = req.body.content;

  try {
    const page: Page = await Page.create(
      {
        user_pk: user.pk,
        user_name: user.name,
        pageName,
        content,
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
        },
      },
    });
  } catch(err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'DB error',
    })
  }

}

export default postPage;