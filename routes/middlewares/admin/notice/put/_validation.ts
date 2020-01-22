import { query, ValidationChain } from 'express-validator';

import Notice from '@Model/notice.model';

// tslint:disable-next-line: interface-name
// tslint:disable-next-line: class-name
export interface putAdminNoticeRequest {
  query: {
    notice_pk: Notice['pk'];
  }
}

const putAdminNoticeValidation: ValidationChain[] = [
  query('notice_pk').isInt(),
]

export default putAdminNoticeValidation;