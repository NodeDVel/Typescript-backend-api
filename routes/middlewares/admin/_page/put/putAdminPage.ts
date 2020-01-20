import { NextFunction, Request, Response } from "express";

import { putAdminPageRequest } from "./_validation";

import CustomError from "@Middleware/error/customError";

import Page from "@Model/page.model";

const putAdminPage = async (req: Request, res: Response, next: NextFunction) => {
  const { page_pk }: putAdminPageRequest['query'] = req.query;
  const pageName: Page['pageName'] = req.body;
  const content: Page['content'] = req.body;
  const introduction: Page['introduction'] = req.body;

  try {
    const page: Page = await Page.findOne({
      where: {
        pk: page_pk,
      },
    });

    if(!page) {
      next(new CustomError({ name: 'Wrong_Data' }));
    }

    await page.update({
      pageName,
      content,
      introduction,
    });
    
  } catch(error) {
    console.log(error);
    next(new CustomError({ name: 'Database_Error' }));
  }
}

export default putAdminPage;