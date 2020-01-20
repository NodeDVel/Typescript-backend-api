import { NextFunction, Request, Response } from 'express';
import * as _ from 'lodash';

import CustomError from '@Middleware/error/customError';

import CompanyRecruit from '@Model/companyRecurit.model';
import User from '@Model/user.model';


const getCompanyPersonnelCount = async (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;
  const company_pk: CompanyRecruit['pk'] = req.query;

  try {
    const companyPersonnels: CompanyRecruit[] = await CompanyRecruit.findOne({ where: { pk: company_pk, user_pk: user.pk, confirm: true }});

    const uniqPersonnels: CompanyRecruit[] = _.uniqBy(companyPersonnels, personnel => personnel.user_pk);

    res.json({
      success: true,
      data: {
        companyPersonnelCount: uniqPersonnels.length,
      },
    });
    
  } catch(error) {
    console.log(error);
    next(new CustomError({ name: 'Database_Error' }));
  }
}

export default getCompanyPersonnelCount; // 신청 인원 반환 및 중복 제거