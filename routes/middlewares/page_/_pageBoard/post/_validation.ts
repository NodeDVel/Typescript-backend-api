import { body, ValidationChain } from 'express-validator';

import Page from '@Model/page.model';

// tslint:disable-next-line: interface-name
// tslint:disable-next-line: class-name
export interface postPageBoardRequest {
  body: {
    page_pk: Page['pk'];
  },
}

const postPageBoardValidation: ValidationChain[] = [
  body('page_pk').isInt()
];

export default postPageBoardValidation;