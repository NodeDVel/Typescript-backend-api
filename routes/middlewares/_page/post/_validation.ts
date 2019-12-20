import { body, ValidationChain } from 'express-validator';

const postPageValidation: ValidationChain[] = [
  body('content')
  .isString()
  .isLength({ max: 700 }),
  body('page_name')
  .isString()
  .isLength({ min: 2, max: 9}),
];

export default postPageValidation;