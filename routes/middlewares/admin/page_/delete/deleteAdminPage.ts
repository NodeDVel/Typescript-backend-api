import { NextFunction, Request, Response } from 'express';

import { deleteAdminPageRequest } from './_validation';

import CustomError from '@Middleware/error/customError';
import Page from '@Model/page.model';

const deleteAdminPage = async (req: Request, res: Response, next: NextFunction) => {
  const { page_pk }: deleteAdminPageRequest['query'] = req.query;

  try {
    const page: Page = await Page.findOne({
      where: {
        page_pk,
      },
    });

    if(page) {
      await page.destroy();

      res.json({ success: true });
    } else {
      next(new CustomError({ name: 'Wrong_Data' }));
    }

    if(page) {
      next(new CustomError({ name: 'Database_Error' }));
    }

    res.json({
      success: true,
    });

  } catch(error) {
    console.error(error);
    next(new CustomError({ name: 'Database_Error' }));
  }
  
}

export default deleteAdminPage;