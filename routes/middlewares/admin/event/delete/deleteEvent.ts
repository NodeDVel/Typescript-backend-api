import { NextFunction, Request, Response } from 'express';

import Event from '@Model/event.model';

import CustomError from '@Middleware/error/customError';

const deleteEvent = async (req: Request, res: Response, next: NextFunction) => {
  const pk = req.query.event_pk;

  try {
    const event: Event = await Event.findOne({ where: { pk, approved: true }});

    if(event) {
      await event.destroy();

      res.json({ 
        success: true,
      }); 
    } else {
      next(new CustomError({ name: 'Wrong_Data' }));
    }



  } catch(err) {
    console.log(err);
    next(new CustomError({ name: 'Database_Error' }));
  }

}

export default deleteEvent;