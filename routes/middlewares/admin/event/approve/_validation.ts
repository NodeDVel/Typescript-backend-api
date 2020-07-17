import { body, ValidationChain } from 'express-validator';

import Event from '@Model/event.model';

// tslint:disable-next-line: interface-name
// tslint:disable-next-line: class-name
export interface approveEventRequest {
  body: {
    event_pk: Event['pk'];
  },
};

const approveEventValidation: ValidationChain[] = [
  body('event_pk').isInt(),
];