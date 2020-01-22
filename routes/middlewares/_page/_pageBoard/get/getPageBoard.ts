import { NextFunction, Request, Response } from 'express';

import { getPageBoardRequest } from './_validation';

import Page from '@Model/page.model';
import PageBoard from '@Model/pageBoard.model';

import CustomError from '@Middleware/error/customError';

const getPostBoard = async (req: Request, res: Response, next: NextFunction) => {
  const page_pk: getPageBoardRequest['query'] = req.query.page_pk;
  const pageBoard_pk: getPageBoardRequest['query'] = req.query.pageBoard_pk;

  try {
    const page: Page = await Page.findOne({
      where: {
        pk: page_pk,
      },
    });

    if(page) {
      const getResult: PageBoard = await PageBoard.findAll({
        where: {
          pk: pageBoard_pk,
        },
      });

      res.json({
        success: true,
        data: {
          PageBoard: {
            getResult,
          },
        },
      });

    }
  } catch(err) {
    console.log(err);
    next(new CustomError({ name: 'Database_Error' }));
  }

}

export default getPostBoard;