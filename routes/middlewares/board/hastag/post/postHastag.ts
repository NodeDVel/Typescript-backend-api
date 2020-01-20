import { NextFunction, Request, Response } from 'express';

import Hastag from '../../../../../database/models/hastag.model';

import { postHastagRequest } from './_validation';

import CustomError from '@Middleware/error/customError';

const postHastag = async (req: Request, res: Response, next: NextFunction) => {
  const hastag_name: string | number | undefined = req.body;
  const board_pk: postHastagRequest['body'] = req.body.board_pk;

  if(hastag_name){
    for(let i = 0; i < hastag_name[i]; i++) {
      await Hastag.create({
        board_pk,
        title: hastag_name[i],
      }).then((hastag: Hastag) => {
          if (!hastag) {
            next(new CustomError({ name: 'Database_Error' }));
          } else {
              console.log('hastag create OK!');
              next();
          }
      });
    }
  } else {
    next(new CustomError({ name: 'Wrong_Data' }));  
  }
  res.json({
    success: true,
  });
}

export default postHastag;