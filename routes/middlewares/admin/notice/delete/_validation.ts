import { query, ValidationChain } from 'express-validator';

import Notice from '@Model/notice.model';

// tslint:disable-next-line: interface-name
// tslint:disable-next-line: class-name
export interface deleteAdminNoticeRequest {
  query: {
    notice_pk: Notice['pk'];
  }
}

const deleteAdminNoticeValidation: ValidationChain[] = [
  query('notice_pk').isInt(),
]

export default deleteAdminNoticeValidation;