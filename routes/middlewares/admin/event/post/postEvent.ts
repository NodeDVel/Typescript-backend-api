import { NextFunction, Request, Response } from 'express';

import Admin from '@Model/admin.model';
import Event from '@Model/event.model';

import CustomError from '@Middleware/error/customError';

const postEvent = async (req: Request, res: Response, next: NextFunction) => {
  const admin: Admin = res.locals.admin;
  const eventName: Event['eventName'] = req.body;
  const description: Event['description'] = req.body;
  const period: number = (req.body.period && parseInt(req.body.period, 10));
  
  if(period < 1 || (period === undefined)) {
    next(new CustomError({ name: 'Wrong_Data', message: '기간을 설정해주셔야 합니다.' }));
  }
  
  try {
    const event: Event = await Event.create({
      admin_pk: admin.pk,
      admin_name: admin.name,
      eventName,
      description,
      period
    });

    res.json({
      success: true,
      data: {
        event,
      },
    });
  } catch(err) {
    console.log(err);
    next(new CustomError({ name: 'Database_Error' }));
  } 
}

export default postEvent;