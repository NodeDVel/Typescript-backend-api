import { query, ValidationChain } from 'express-validator';

import CompanyRecruit from '@Model/companyRecurit.model';

// tslint:disable-next-line: interface-name
// tslint:disable-next-line: class-name
export interface putAdminCompanyRequest {
  query: {
    company_pk: CompanyRecruit['pk'];
  },
}

const putAdminCompanyValidation: ValidationChain[] = [
  query('company_pk').isInt(),
]

export default putAdminCompanyValidation;