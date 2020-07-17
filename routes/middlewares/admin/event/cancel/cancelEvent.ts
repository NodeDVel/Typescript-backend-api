import { NextFunction, Request, Response } from 'express';

import Admin from '@Model/admin.model';
import Event from '@Model/event.model';

import CustomError from '@Middleware/error/customError';

import { cancelEventRequest } from './_validation';

const canelEvent = async (req: Request, res: Response, next: NextFunction) => {
  const admin: Admin = res.locals.admin;
  const event_pk: cancelEventRequest['body'] = req.body;

  try {
    const event: Event = await Event.findOne({
      where: {
        pk: event_pk,
        admin_pk: admin.pk,
        approved: false,
      },
    });

    if (!event) {
      next(new CustomError({ name: 'Wrong_Data' }));
    }

    await event.destroy();

    res.json({
      success: true,
    })

  } catch (err) {
    console.log(err);
    next(new CustomError({ name: 'Database_Error' }));
  }
}

export default cancelEvent;