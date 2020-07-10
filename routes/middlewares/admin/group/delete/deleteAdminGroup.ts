import { NextFunction, Request, Response } from 'express';

import CustomError from '@Middleware/error/customError';

import Group from '@Model/group.model';

const deleteAdminGroup = async (req: Request, res: Response, next: NextFunction) => {
  const group_pk: Group['pk'] & number = req.body.board_pk;

  try {
    const group: Group = await Group.findOne({ where: { group_pk }});

    if(group) {
      await group.destroy();

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

export default deleteAdminGroup;