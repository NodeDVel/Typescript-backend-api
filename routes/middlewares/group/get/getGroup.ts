import { NextFunction, Request, Response } from 'express';

import Group from '@Model/group.model';

import { getGroupRequest } from './_validation';

import CustomError from '@Middleware/error/customError';

const getGroup = async (req: Request, res: Response, next: NextFunction) => {
  const group_pk: getGroupRequest['query'] = req.query.group_pk;
  
  try {
    const group: Group = await Group.findAll({
      where: {
        group_pk,
      },
    });

    res.json({
      data: {
        group: {
          group,
        },
      },
    });

  } catch(err) {
    console.log(err);
    next(new CustomError({ name: 'Database_Error' }));
  }
}

export default getGroup;