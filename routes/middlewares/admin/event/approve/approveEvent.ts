import { NextFunction, Request, Response } from 'express';

import Admin from '@Model/admin.model';
import Event from '@Model/event.model';

import { approveEventRequest } from './_validation';

import CustomError from '@Middleware/error/customError';

const approveEvent = async (req: Request, res: Response, next: NextFunction) => {
  const admin: Admin = res.locals.admin;
  const { event_pk }: approveEventRequest['body'] = req.body;

  try {
    const event: Event = await Event.findOne({
      where: {
        pk: event_pk,
        admin_pk: admin.pk,
        approved: false,
      },
    });

    if(!event) {
      next(new CustomError({ name: 'Wrong_Data' }));

      return ;
    }

    await event.update({ approved: true });

    res.json({ 
      succes: true,       
    });
    
  } catch(err) {
    console.log(err);
    next(new CustomError({ name: 'Database_Error' }));
  }

}

export default approveEvent;