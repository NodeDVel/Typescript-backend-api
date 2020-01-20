import { NextFunction, Request, Response } from 'express';

import { Transaction } from 'sequelize'; 

import { sequelize } from '@Database/index';

import CustomError from '@Middleware/error/customError';

import CompanyRecurit from '@Model/companyRecurit.model';
import User from '@Model/user.model';

import { PostCompanyConfirmRequest } from './_validation';

const postCompanyConfirm = async (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;
  const { company_pk }: PostCompanyConfirmRequest['body'] = req.body;

  sequelize.transaction({ autocommit: false })
    .then(async (t: Transaction) => {
      try {
        const companyRecurit: CompanyRecurit = await CompanyRecurit.findOne({
          where: { pk: company_pk, user_pk: user.pk, confirm: false, cancel: false },
          transaction: t,
          lock: Transaction.LOCK.UPDATE,
        });

        if(!companyRecurit) {
          next(new CustomError({ name: 'Wrong_Data'}));
          await t.commit();

          return;
        }

        companyRecurit.confirm = true;
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
        await t.rollback();
        next(new CustomError({ name: 'Database_Error' }));
      }
    });
}

export default postCompanyConfirm;