import { NextFunction, Request, Response } from 'express';

import { deleteAdminNoticeRequest } from './_validation';

import CustomError from '@Middleware/error/customError';

import Notice from '@Model/notice.model';

const deleteAdminNotice = async (req: Request, res: Response, next: NextFunction) => {
  const { notice_pk }: deleteAdminNoticeRequest['query'] = req.query;

  try {
    const notice: Notice = await Notice.destroy({
      where: {
        notice_pk,
      },
    });

    if(notice) {
      next(new CustomError({ name: 'Wrong_Data' }));
    }

    res.json({
      success: true,
    });
  } catch(error) {
    console.log(error);
    next(new CustomError({ name: 'Database_Error' }));
  }
}

export default deleteAdminNotice;