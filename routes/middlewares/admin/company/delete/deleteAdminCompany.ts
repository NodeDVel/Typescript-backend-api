import { NextFunction, Request, Response } from 'express';

import { deleteAdminCompanyRequest } from './_validation';

import CustomError from '@Middleware/error/customError';

import CompanyRecruit from '@Model/companyRecurit.model';

const deleteAdminCompany = async (req: Request, res: Response, next: NextFunction) => {
  const { company_pk }: deleteAdminCompanyRequest['query'] = req.query;

  try {
    const companyRecurit: CompanyRecruit = await CompanyRecruit.findOne({ where: { pk: company_pk } });

    if (companyRecurit) {
      await companyRecurit.destroy();

      res.json({
        success: true,
      });
    } else {
      next(new CustomError({ name: 'Wrong_Data' }));
    }
    
  } catch (error) {
    console.log(error);
    next(new CustomError({ name: 'Database_Error' }));
  }
}

export default deleteAdminCompany;