import { NextFunction, Request, Response } from 'express';

import Page from '@Model/page.model';
import PageBoard from '@Model/pageBoard.model';
import User from '@Model/user.model';

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

      res.status(200).json({
        success: true,
        message: '페이지가 성공적으로 삭제되었습니다',
      });
    } else {
      res.status(412).json({
        success: false,
        message: 'DB Error',
      })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({
      success: false,
      message: 'DB error',
    });
  }
}

export default deletePage;