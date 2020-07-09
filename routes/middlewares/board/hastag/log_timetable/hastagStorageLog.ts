import { NextFunction, Request, Response } from 'express';

import Hastag from '@Model/hastag.model';

import CustomError from '@Middleware/error/customError';

const hastagStorageLog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const hastag: Hastag[] = await Hastag.findAll({
      order: [['createdAt', 'DESC']],
    });

    if(!hastag) {
      next(new CustomError({ name: 'Database_Error' }));
    }

    res.json({ success: true });

  } catch (error) {
    console.log(error);
    next(new CustomError({ name: 'Database_Error' }));
  }
}

export default hastagStorageLog;