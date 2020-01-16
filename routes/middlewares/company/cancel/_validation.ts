import { body, ValidationChain } from 'express-validator';

import CompanyRecruit from '@Model/companyRecurit';

// tslint:disable-next-line: interface-name
// tslint:disable-next-line: class-name
export interface postCompanyCancelRequest {
  body: {
    company_pk: CompanyRecruit['pk'];
  },
}

const postCompanyCancelValdation: ValidationChain[] = [
  body('company_pk').isInt(),
]

export default postCompanyCancelValdation;