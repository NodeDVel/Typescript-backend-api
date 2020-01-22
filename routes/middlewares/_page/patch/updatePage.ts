import { NextFunction, Request, Response } from 'express';

import Page from '@Model/page.model';
import User from '@Model/user.model';

import CustomError from '@Middleware/error/customError';

const updatePage = async (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;
  const page_pk: Page['pk'] = req.query.page_pk;
  const pageName: string = req.body;
  const content: string | undefined = req.body;
  const introduction: string | undefined = req.body;


  try {
    const updatePage: Page | undefined = await Page.findOne({
      where: {
        page_pk,
      },
    });

    if(updatePage) {
        const [page]: [Page, unknown] = await Page.update(
          {
            pageName,
            content,
            introduction,
            user_name: user.name,
          },
          {
            where: {
              pk: page_pk,
            },
          }).then((page: Page) => {
            if(!page) {
              next(new CustomError({ name: 'Wrong_Data' }));
            } else {
              res.json({
                success: true,
                data: {
                  page,
                },
              });
            }
          });
    } 
  } catch(err) {
      console.log(err);
      next(new CustomError({ name: 'Database_Error' }));
  }
}

export default updatePage;