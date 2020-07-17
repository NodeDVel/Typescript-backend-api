import { body, ValidationChain } from 'express-validator';

import Event from '@Model/event.model';

// tslint:disable-next-line: interface-name
export interface cancelEventRequest {
  body: {
    evnet_pk: Event['pk'];
  },
}

const cancelEventValidation: ValidationChain[] = [
  body('event_pk').isInt()
];

export default cancelEventValidation;