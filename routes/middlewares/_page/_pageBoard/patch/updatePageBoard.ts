import { NextFunction, Request, Response } from 'express';

import PageBoard from '@Model/pageBoard.model';

const updatePageBoard = async (req: Request, res: Response, next: NextFunction) => {
  const pageBoard_pk: PageBoard['pk'] = req.query.pageBoard_pk;
  const title: string = req.body.title;
  const content: string = req.body.content;

  try {
    if(!title) {
      res.redirect('/');
    } else {
      const pageBoard: PageBoard | null = await PageBoard.findOne({
        where: {
          pk: pageBoard_pk,
        },
      });

      if(!pageBoard) {
        res.status(412).json({
          success: false,
          message: '잘못된 요청데이터입니다.',
        });
      } else {
        const [now_pageBoard]: [PageBoard, unknown]  = await PageBoard.update(
        {
          title,
          content,
        },
        {
          where: {
            pk: pageBoard_pk,
          },
        });

        res.status(200).json({
          success: true,
          data: {
            PageBoard: {
              pk: now_pageBoard.pk,
              title: now_pageBoard.title,
              content: now_pageBoard.content,
            },
          },
        })
      }
    }
  } catch(err) {
    console.log(err);
  }
}

export default updatePageBoard;