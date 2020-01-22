import { NextFunction, Request, Response } from 'express';

import Page from '@Model/page.model';
import PageBoard from '@Model/pageBoard.model';
import User from '@Model/user.model';

import CustomError from '@Middleware/error/customError';

const deletePage = async (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;
  const page_pk: Page['pk'] = req.query.page_pk;

  try {
    const page: Page = await Page.findOne({
      where: {
        pk: page_pk,
      },
      include: [
        {
          model: PageBoard,
          where: {
            pk: page_pk,
            user_pk: user.pk,
          },
        }
      ],
    });

    if (page) {
      await Page.destroy({
        where: {
          pk: page_pk,
        },
      });

      res.json({
        success: true,
      });

    } else {
      next(new CustomError({ name: 'Database_Error' }));
    }
  } catch (err) {
    console.log(err)
    next(new CustomError({ name: 'Database_Error' }));
  }
}

export default deletePage;