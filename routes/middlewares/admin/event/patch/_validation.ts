import { body, ValidationChain } from 'express-validator';

import Event from '@Model/event.model';

// tslint:disable-next-line: interface-name
export interface patchEventRequest {
  body: {
    event_pk: Event['pk'];
  },
};

const patchEventValidation: ValidationChain[] = [
  body('event_pk').isInt(),
];

export default patchEventRequest;