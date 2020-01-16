import { NextFunction, Request, Response } from 'express';

import CustomError from '@Middleware/error/customError';

import CompanyRecruit from '@Model/companyRecurit';
import Hastag from '@Model/hastag.model';
import User from '@Model/user.model';

const getCompany = async (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;
  const company_limit = 10;
  const page = (req.query.page && req.query.page - 1) || 0;

  try {
    const result: { rows: CompanyRecruit[], count: number } = await CompanyRecruit.findAndCountAll({
      limit: company_limit,
      offset: page * company_limit,
      attributes: ['pk', 'user_pk', 'hastag_name', 'name', 'hastag_name', 'information', 'personnel', 'pay', 'area', 'createdAt'],
      order: [['createAt', 'DESC']],
      include: [
        {
          model: Hastag,
          attributes: ['pk', 'hatag_name'],
        },
      ],
    });

    res.json({
      success: true,
      data: {
        companyRecurit: result.rows.map(val => ({
          pk: val.pk,
          user_pk: val.user_pk,
          name: val.name,
          information: val.information,
          personnel: val.personnel,
          pay: val.pay,
          area: val.area,
          createAt: val.createdAt,
          hastag: val.hastag.map(hastag => ({
            pk: hastag.pk,
            hastag_name: hastag.name,
          })),
        })),
      },
    });

  } catch(error) {
    console.log(error)
    next(new CustomError({ name: 'Database_Error' }));
  }
}

export default getCompany;