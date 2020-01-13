import { NextFunction, Request, Response } from 'express';

import Page from '@Model/page.model';
import PageBoard from '@Model/pageBoard.model';

const getPostBoard = async (req: Request, res: Response, next: NextFunction) => {
  const page_pk: Page['pk'] = req.query.page_pk;
  const pageBoard_pk: PageBoard['pk'] = req.query.pageBoard_pk;

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

      res.status(200).json({
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
    res.status(500).json({
      success: false,
      message: 'DB Error',
    })
  }

}

export default getPostBoard;