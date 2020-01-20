import { NextFunction, Request, Response } from 'express';

import Hastag from '../../../../../database/models/hastag.model';

import CustromErorr from '../../../error/customError';

const hastagStorageLog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await Hastag.findAll({
      order: [['createdAt', 'DESC']],
    }).then((hastag: Hastag[]) => {
      if (!hastag) {
        next(new CustromErorr({ name: 'Wrong_Data' }));
      } else {
        res.status(200).json({
          result: {
            SUCCESS: true,
            message: 'find hastagLog',
          },
        });
      }
    });
  } catch (error) {
    console.log(error);
    next(new CustromErorr({ name: 'Database_Error' }));
  }
}

export default hastagStorageLog;