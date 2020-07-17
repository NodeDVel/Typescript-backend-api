import { NextFunction, Request, Response } from 'express';

import Page from '@Model/page.model';
import PageBoard from '@Model/pageBoard.model';
import User from '@Model/user.model';

import { postPageBoardRequest } from './_validation';

const postPageBoard = async (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;
  const page_pk: postPageBoardRequest['body'] = req.body.page_pk;
  const title: string | undefined = req.body;
  const content: string | undefined = req.body;

  try {
    const findByPage: Page = await Page.findOne({
      where: {
        page_pk,
      },
    });

    if(findByPage) {
      const pageBoard: PageBoard = await PageBoard.create({
        page_pk,
        user_pk: user.pk,
        user_name: user.name,
        title,
        content,
      });

      res.status(200).json({
        success: true,
        data: {
          pageBoard: {
            pk: pageBoard.pk,
            user_name: pageBoard.user_name,
            ttile: pageBoard.title,
            content: pageBoard.content,
          },
        },
      });
    } else {
      res.status(412).json({
        success: false,
        message: '잘못된 요청 데이터입니다.',
      });
    }
  } catch(err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'DB error',
    })
  }
}

export default postPageBoard;