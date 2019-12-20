import { NextFunction, Request, Response } from 'express';

import Page from '@Model/page.model';

const getPage = async (req: Request, res: Response, next: NextFunction) => {
  const page_pk: number = req.query.page_pk;
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
      attributes: ['pk', 'user_pk', 'user_name', 'content', 'createAt']
    })

    if(page) {
      res.json({
        success: true,
        data: {
          page,  
        },
      });
    } else {
      res.status(412).json({
        success: false,
        message: '잘못된 요청데이터입니다.',
      })
    }
  } catch(err) {
    console.log(err);
    res.status(412).json({
      success: false,
      message: '잘못된 요청데이터입니다.',
    });

  }

} 
export default getPage;