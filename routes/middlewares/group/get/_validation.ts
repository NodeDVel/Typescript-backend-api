import { query, ValidationChain } from 'express-validator';

import Group from '@Model/group.model';

// tslint:disable-next-line: interface-name
// tslint:disable-next-line: class-name
export interface getGroupRequest {
  query: {
    group_pk: Group['pk'],
  },
}

const getGroupValidation: ValidationChain[] = [
  query('group_pk').isInt(),
] 

export default getGroupValidation;