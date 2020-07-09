import { NextFunction, Request, Response} from 'express';

import User from '@Model/user.model';

import CustomError from '@Middleware/error/customError';
import Group from '@Model/group.model';

const postGroup = async (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;
  const groupName: string = req.body.groupName;
  const groupInformation: string | undefined = req.body.groupInformation;

  try {
    if(!user){
      next(new CustomError({ name: 'Wrong_Data' }));
    } else {
      const group: Group = await Group.create({
        user_pk: user.pk,
        groupName,
        groupInformation,
      });

      res.json({
        success: true,
        data: {
          group: {
            pk: group.pk,
            groupName: group.groupName,
            groupInformation: group.groupInformation,
          },
        },
      });
    }

  } catch(err) {
    console.log(err);
    next(new CustomError({ name: 'Database_Error' }))
  }
}

export default postGroup;