import { NextFunction, Request, Response } from 'express';

import CustomError from '@Middleware/error/customError';

import Group from '@Model/group.model';

const putAdminGroup = async (req: Request,res: Response, next: NextFunction) => {
  const group_pk: Group['pk'] & number = req.body.group_pk;
  const groupName: Group['groupName'] & string = req.body.groupName;
  const groupInformation: Group['groupInformation'] = req.body.groupInformation;

  try {
    const group: Group = await Group.findOne({ where: { pk: group_pk, }});

    if(group) {
      const updateGroup = await group.update({
        groupName,
        groupInformation
      });

      res.json({
        success: true,
        data: {
          group: updateGroup,
        },
      });
    } else {
      next(new CustomError({ name:'Wrong_Data' }));
    }
  } catch(err) {
    console.log(err);
    next(new CustomError({ name: 'Database_Error' }));
  }
}

export default putAdminGroup;