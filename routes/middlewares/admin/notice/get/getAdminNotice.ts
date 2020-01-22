import { NextFunction, Request, Response } from 'express';

import { getAdminNoticeRequest } from './_validation';

import CustomError from '@Middleware/error/customError';
import Notice from '@Model/notice.model';

const getAdminNotice = async (req: Request, res: Response, next: NextFunction) => {
  const { notice_pk }: getAdminNoticeRequest['query'] = req.query;

  try {
    const notice: Notice = await Notice.findAll({
      where: { pk: notice_pk },
      attributes: ['pk', 'user_pk', 'user_name', 'title', 'content'],
    });

    if(!notice) {
      next(new CustomError({ name: 'Wrong_Data' }));
    }

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

export default getAdminNotice;