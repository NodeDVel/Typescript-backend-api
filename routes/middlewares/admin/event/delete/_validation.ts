import { query, ValidationChain } from 'express-validator';

const deleteEventValidation: ValidationChain[] = [query('event_pk').isInt()];

export default deleteEventValidation;