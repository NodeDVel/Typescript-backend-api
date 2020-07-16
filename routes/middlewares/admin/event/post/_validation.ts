import { body, ValidationChain } from 'express-validator';

const postEventValidation: ValidationChain[] = [
  body('eventName').isString(),
  body('description').isString().isLength({ min: 1, max: 500 }),
  body('period').isInt()
]

export default postEventValidation;