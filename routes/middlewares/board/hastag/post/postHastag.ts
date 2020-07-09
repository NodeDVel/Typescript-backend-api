import { NextFunction, Request, Response } from 'express';

import Hastag from '@Model/hastag.model';

import CustomError from '@Middleware/error/customError';

import { postHastagRequest } from './_validation';

const postHastag = async (req: Request, res: Response, next: NextFunction) => {
  const hastag_name: string | number | undefined = req.body;
  const board_pk: postHastagRequest['body'] = req.body.board_pk;

  try {
    if (hastag_name) {
      for (let i = 0; i < hastag_name[i]; i++) {
        const hastag: Hastag = await Hastag.create({
          board_pk,
          title: hastag_name[i],
        });
  
        if (!hastag) {
          next(new CustomError({ name: 'Database_Error' }));
        } else {
          res.json({ success: true });
  
          next();
        }
      }
    } else {
      next(new CustomError({ name: 'Wrong_Data' }));
    }
    res.json({
      success: true,
    });

  } catch(err) {
    console.log(err);
    next(new CustomError({ name: 'Database_Error' }));
  }

}

export default postHastag;