import { NextFunction, Request, Response } from 'express';

import CustomError from '@Middleware/error/customError';

import Event from '@Model/event.model';

const periodEvent = async (req: Request, res: Response, next: NextFunction) => {
  const pk: Event['pk'] = req.body.event_pk;
  const hours: number = 24;
  const date = new Date();
  
  try {
    let result: number = 0;

    const event: Event = await Event.findAll({ where: { pk } });

    const evnetDate = (val: number) => {
      if (val === hours) {
        result = (event.period - 1);

        return result;
      } else if (val === 0) {
        next(new CustomError({ name: 'Wrong_Data', message: '이벤트가 마감되었습니다. 다른 이벤트를 이용해주세요.' }));
      }
      else {
        next(new CustomError({ name: 'Wrong_Data' }));
      }
    }

    await evnetDate(date.getHours());

  } catch (err) {
    console.log(err);
    next(new CustomError({ name: 'Database_Error' }));
  }
}

export default periodEvent;