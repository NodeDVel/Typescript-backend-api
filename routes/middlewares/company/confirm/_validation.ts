import { body, ValidationChain } from 'express-validator';

import CompanyRecruit from '@Model/companyRecurit.model';

// tslint:disable-next-line: interface-name
export interface PostCompanyConfirmRequest {
  body: {
    company_pk: CompanyRecruit['pk'],
  },
}

const PostCompanyConfirmValidation: ValidationChain[] = [
  body('company_pk').isInt(),
]

export default PostCompanyConfirmValidation;