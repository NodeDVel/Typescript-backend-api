import { query, ValidationChain } from 'express-validator';

import Page from '@Model/page.model';

// tslint:disable-next-line: interface-name
// tslint:disable-next-line: class-name
export interface putAdminPageRequest {
  query: {
    page_pk: Page['pk'];
  }
}

const putAdminPageValidation: ValidationChain[] = [
  query('page_pk').isInt(),
]

export default putAdminPageValidation;