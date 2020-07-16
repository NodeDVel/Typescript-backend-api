import { NextFunction, Request, Response } from 'express';

import Event from '@Model/event.model';

import patchEventRequest from './_validation';

import CustomError from '@Middleware/error/customError';

const patchEvent = async (req: Request, res: Response, next: NextFunction) => {
  const event_pk: patchEventRequest['body'] = req.body;
  const eventName: Event['eventName'] = req.body;
  const description: Event['description'] = req.body;

  try {
    const event: Event = await Event.findOne({
      where: { pk: event_pk, approved: true },
    });

    if ((event.approved) === Boolean(false)) {
      next(new CustomError({ name: 'Not_User', message: '관리자만 접근할 수 있습니다.' }));
    }

    const updateEvent: Event = await event
      .update({
        eventName,
        description,
      });

    res.json({
      success: true,
      data: {
        updateEvent,
      },
    });

  } catch (err) {
    console.log(err);
    next(new CustomError({ name: 'Database_Error' }));
  }
}

export default patchEvent;