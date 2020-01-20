import { NextFunction, Request, Response } from 'express';
import * as _ from 'lodash';

import CustomError from '@Middleware/error/customError';

import CompanyRecruit from '@Model/companyRecurit.model';
import User from '@Model/user.model';

const getCompanyCount = async (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;
  
  try {
    const companys: CompanyRecruit[] = await CompanyRecruit.findAll({ where: { user_pk: user.pk, pick: true }});

    const uniqCompanys: CompanyRecruit[] = _.uniqBy(companys, val => val.pk);

    res.json({
      success: true,
      data: {
        CompanyCount: uniqCompanys.length,
      },
    });
  } catch(error) {
    console.error(error);
    next(new CustomError({ name: 'Database_Error' }));
  }
}

export default getCompanyCount;