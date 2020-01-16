import { NextFunction, Request, Response } from 'express';

import CustomError from '@Middleware/error/customError';

import { Transaction } from 'sequelize';

import { sequelize } from '@Database/index';

import { postCompanyCancelRequest } from './_validation';

import CompanyRecruit from '@Model/companyRecurit';
import User from '@Model/user.model';

const postCompanyCancel = async (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;  
  const { company_pk }: postCompanyCancelRequest['body'] = req.body;

  try {
    sequelize.transaction({ autocommit: false })
      .then(async (t: Transaction) => {
        try {
          const companyRecurit: CompanyRecruit = await CompanyRecruit.findOne({ 
            where: { pk: company_pk, user_pk: user.pk, confirm: false, cancel: false },
            transaction: t,
            lock: Transaction.LOCK.UPDATE,
          });

          if(!companyRecurit) {
            next(new CustomError({ name: 'Wrong_Data' }));
            await t.commit();

            return;
          }

          companyRecurit.cancel = true;
          await companyRecurit.save({ transaction: t });

          await t.commit();

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
      });
  } catch(error) {
    console.log(error);
  }
}

export default postCompanyCancel;