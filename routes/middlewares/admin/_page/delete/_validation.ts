import { query, ValidationChain } from 'express-validator';

import Page from '@Model/page.model';

// tslint:disable-next-line: interface-name
// tslint:disable-next-line: class-name
export interface deleteAdminPageRequest {
  query: {
    page_pk: Page['pk'];
  },
}

const deleteAdminPageValidation: ValidationChain[] = [
  query('page_pk').isInt(),
]

export default deleteAdminPageValidation;