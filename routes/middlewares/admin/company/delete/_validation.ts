import { query, ValidationChain } from 'express-validator';

import CompanyRecruit from '@Model/companyRecurit.model';

// tslint:disable-next-line: no-empty-interface
// tslint:disable-next-line: interface-name
export interface deleteAdminCompanyRequest {
  query: {
    company_pk: CompanyRecruit['pk'];
  },
}

const deleteAdminCompanyValidation: ValidationChain[] = [
  query('company_pk').isInt(),
]

export default deleteAdminCompanyValidation;