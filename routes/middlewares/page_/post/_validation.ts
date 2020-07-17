import { body, ValidationChain } from 'express-validator';

const postPageValidation: ValidationChain[] = [
  body('content')
  .isString()
  .isLength({ max: 700 }),
  body('pageName')
  .isString()
  .isLength({ min: 2, max: 9 }),
  body('introduction')
    .isString()
    .isLength({ max: 500 }),
    
];

export default postPageValidation;