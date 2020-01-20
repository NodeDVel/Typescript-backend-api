import { NextFunction, Request, Response } from 'express';

import { deleteAdminCompanyRequest } from './_validation';

import CustomError from '@Middleware/error/customError';

import CompanyRecruit from '@Model/companyRecurit.model';

const deleteAdminCompany = async (req: Request, res: Response, next: NextFunction) => {
  const { company_pk }: deleteAdminCompanyRequest['query'] = req.query;

  try {
    const companyRecurit: CompanyRecruit = await CompanyRecruit.destroy({
      where: {
        company_pk,
      },
    });

    if(companyRecurit) {
      next(new CustomError({ name: 'Wrong_Data' }));
    }

    res.json({
      success: true,
    });
    
  } catch(error) {
    console.log(error);
    next(new CustomError({ name: 'Database_Error' }));
  }
}

export default deleteAdminCompany;