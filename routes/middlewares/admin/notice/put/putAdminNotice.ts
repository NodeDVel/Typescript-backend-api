import { NextFunction, Request, Response } from 'express';

import { putAdminNoticeRequest } from './_validation';

import CustomError from '@Middleware/error/customError';

import Notice from '@Model/notice.model';

const putAdminNotice = async (req: Request, res: Response, next: NextFunction) => {
  const { notice_pk }: putAdminNoticeRequest['query'] = req.query;
  const title: Notice['title'] = req.body;
  const content: Notice['content'] = req.body;

  try {
    const notice: Notice = await Notice.findOne({
      where: {
        pk: notice_pk,
      },
    });

    if (!notice) {
      next(new CustomError({ name: 'Wrong_Data' }));
    }

    await notice.update({
      title,
      content,
    });

    res.json({
      success: true,
      data: {
        notice,
      },
    });

  } catch(error) {
    console.log(error);
    next(new CustomError({ name: 'Database_Error' }));
  }
}

export default putAdminNotice;