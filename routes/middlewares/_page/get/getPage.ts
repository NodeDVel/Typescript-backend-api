import { NextFunction, Request, Response } from 'express';

import Page from '@Model/page.model';

import CustomError from '@Middleware/error/customError';

const getPage = async (req: Request, res: Response, next: NextFunction) => {
  const page_pk: Page['pk'] = req.query.page_pk;
  const limit: number | undefined = 10;
  const page_num: number = req.query.page_num;

  try {
    const page: { rows: Page[], count: number } = await Page.findAndCountAll({
      where: {
        page_pk,
      },
      limit,
      offset: page_num * limit,
      order: [['createAt', 'DESC']],
      attributes: ['pk', 'user_pk', 'user_name', 'content', 'introduction', 'createAt']
    })

    if(page) {
      res.json({
        success: true,
        data: {
          page,  
        },
      });
    } else {
      next(new CustomError({ name: 'Wrong_Data' }));
    }
  } catch(err) {
    console.log(err);
    next(new CustomError({ name: 'Database_Error' }));

  }

} 
export default getPage;