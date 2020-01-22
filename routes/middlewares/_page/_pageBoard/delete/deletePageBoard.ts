import { NextFunction, Request, Response } from 'express'; 

import PageBoard from '@Model/pageBoard.model';

import CustomError from '@Middleware/error/customError';

const deletePageBoard = async (req: Request, res: Response, next: NextFunction) => {
  const pageBoard_pk: PageBoard['pk'] = req.query.pageBoard_pk;

  try {
    const pageBoard: PageBoard = await PageBoard.findOne({
      where: {
        pk: pageBoard_pk,
      },
    });

    if(pageBoard){
      const result = await PageBoard.destroy({
        where: {
          pk: pageBoard_pk,
        },
      });

      if(result) {
        next(new CustomError({ name: 'Database_Error' }));
      } else {
        res.json({
          success: true,
        });
      }
      
    }
  } catch(err) {
    console.log(err);
    next(new CustomError({ name: 'Database_Error' }));
  }
}

export default deletePageBoard;