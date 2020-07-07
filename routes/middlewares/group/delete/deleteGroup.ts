import { NextFunction, Request, Response } from 'express';

import CustomError from '@Middleware/error/customError';

import User from '@Model/user.model';

import Group from '@Model/group.model';

const deleteGroup = async (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;
  const group_pk: Group['pk'] = req.query.group_pk;

  try {
    const result: Group = await Group.destroy({
      where: {
        user_pk: user.pk,
        group_pk,
      },
    });
    
    if(result) {
      next(new CustomError({ name: 'Wrong_Data'}));
    } else {
      res.json({
        success: true,
      });
    }

  } catch(err) {
    console.log(err);
    next(new CustomError({ name: 'Database_Error' }));
  }

}

export default deleteGroup;