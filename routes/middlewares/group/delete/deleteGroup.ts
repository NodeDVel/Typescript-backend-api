import { NextFunction, Request, Response } from 'express';

import CustomError from '@Middleware/error/customError';

import User from '@Model/user.model';

import Group from '@Model/group.model';

const deleteGroup = async (req: Request, res: Response, next: NextFunction) => {
  const group_pk: Group['pk'] = req.query.group_pk;

  try {
    const group: Group = await Group.findOne({ where: { pk: group_pk }});

    await group.destroy();

    if (group) {
      next(new CustomError({ name: 'Wrong_Data' }));
    } else {
      res.json({
        success: true,
      });

      next();
    }

  } catch (err) {
    console.log(err);
    next(new CustomError({ name: 'Database_Error' }));
  }

}

export default deleteGroup;