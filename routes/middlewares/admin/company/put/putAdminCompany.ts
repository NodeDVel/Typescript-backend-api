import { NextFunction, Request, Response } from 'express';

import { putAdminCompanyRequest } from './_validation';

import CustomError from '@Middleware/error/customError';

import CompanyRecruit from '@Model/companyRecurit.model';

const putAdminCompany = async (req: Request, res: Response, next: NextFunction) => {
  const { company_pk }: putAdminCompanyRequest['query'] = req.query;
  const name: CompanyRecruit['name'] = req.body;
  const information: CompanyRecruit['information'] = req.body;
  const personnel: CompanyRecruit['personnel'] = req.body;
  const pay: CompanyRecruit['pay'] = req.body;
  const area: CompanyRecruit['area'] = req.body;

  try {
    const companyRecurit: CompanyRecruit = await CompanyRecruit.findOne({
      where: {
        pk: company_pk,
      },
    });

    if(!companyRecurit) {
      next(new CustomError({ name: 'Wrong_Data' }));
    }

    await companyRecurit.update({
      name,
      information,
      personnel,
      pay,
      area,
    });

    res.json({
      success: true,
      data: {
        companyRecurit,
      },
    });

  } catch(error) {
    console.log(error);
    next(new CustomError({ name: 'Database_Error' }));
  }
}

export default putAdminCompany;