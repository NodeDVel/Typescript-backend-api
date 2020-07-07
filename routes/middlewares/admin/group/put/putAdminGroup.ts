import { NextFunction, Request, Response } from 'express';

import CustomError from '@Middleware/error/customError';

import Group from '@Model/group.model';

const putAdminGroup = async (req: Request,res: Response, next: NextFunction) => {
  const group_pk: Group['pk'] & number = req.body.group_pk;
  const groupName: Group['groupName'] & string = req.body.groupName;

  try {
    const group: Group = await Group.findOne({ where: { pk: group_pk, }});

    if(group) {
      await group.update({
        
      });

    
    }
  } catch(err) {
    console.log(err);
    next(new CustomError({ name: 'Database_Error' }));
  }
}

export default putAdminGroup;