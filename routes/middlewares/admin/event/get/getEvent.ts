import { NextFunction, Request, Response } from 'express';

import Admin from '@Model/admin.model';
import Event from '@Model/event.model';

import CustomError from '@Middleware/error/customError';

const getEvent = async (req: Request, res: Response, next: NextFunction) => {
  const admin: Admin = res.locals.admin;

  try {
    const event: Event = await Event.findAll({ where: { admin_pk: admin.pk, approved: false }});

    res.json({
      succes: true,
      data: {
        event,
      },
    });

  } catch(err) {
    console.log(err);
    next(new CustomError({ name: 'Database_Error' }));
  }
}

export default getEvent;