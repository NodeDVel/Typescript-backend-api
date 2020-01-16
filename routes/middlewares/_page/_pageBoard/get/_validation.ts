import { query, ValidationChain } from 'express-validator';

import Page from '@Model/page.model';
import PageBoard from '@Model/pageBoard.model';

// tslint:disable-next-line: interface-name
// tslint:disable-next-line: class-name
export interface getPageBoardRequest {
  query: {
    page_pk: Page['pk'];
    pageBoard_pk: PageBoard['pk'];
  },
};

const getPageBoardValidation: ValidationChain[] = [
  query('page_pk').isInt(),
  query('pageBoard_pk').isInt(),
]

export default getPageBoardValidation;