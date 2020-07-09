import { NextFunction, Request, Response } from 'express';

import Hastag from '@Model/hastag.model';
import User from '@Model/user.model';

import CustomError from '@Middleware/error/customError';

const deleteHastagLog = async (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;
  const pk: Hastag['pk'] = req.query.hastag_pk;

  try {
    const hastag: Hastag = await Hastag.findOne({ where: { pk }});
  
    await hastag.destroy();
  
    if (hastag) {
      next(new CustomError({ name: 'Database_Error' }));
    } else {
      res.json({ success: true });
  
      next();
    }
  } catch(err) {
    console.log(err);
    next(new CustomError({ name: 'Database_Error' }));
  }
  
}

export default deleteHastagLog;