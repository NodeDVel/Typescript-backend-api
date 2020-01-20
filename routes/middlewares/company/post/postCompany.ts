import { NextFunction, Request, Response } from 'express';
import * as _ from 'lodash'

import CustomError from '@Middleware/error/customError';

import CompanyRecruit from '@Model/companyRecurit.model';
import Hastag from '@Model/hastag.model';
import User from '@Model/user.model';

const postCompany = async (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;
  const name: string = req.body.name;
  const information: string = req.body.information;
  const pay: number = req.body.pay;
  const area: number = req.body.area;

  try {
    const company: CompanyRecruit = await CompanyRecruit.create({
      user_pk: user.pk,
      information,
      name,
      pay,
      area,
    }, {
      include: [
        {
          model: Hastag,
        },
      ],
    });

    res.json({
      success: true,
      data: {
        companyRecurit: {
          pk: company.pk,
          name: company.name,
          information: company.information,
          pay: company.pay,
          area: company.area, 
          hastag: _.map(company.hastag, hastag => ({
            hastag_pk: hastag.pk,
            hastag_name: hastag.name,
          })),
        },
      },
    });
  } catch(error) {
    console.log(error);
    next(new CustomError({ name: 'Database_Error' }));
  }
}

export default postCompany;