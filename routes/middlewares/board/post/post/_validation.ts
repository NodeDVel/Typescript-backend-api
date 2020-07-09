import { body, ValidationChain } from 'express-validator';

const postBoardValidation: ValidationChain[] = [
  body('title')
    .isString()
    .isLength({ min: 2, max: 11 }),
  body('content')
    .isString()
    .isLength({ max: 600 }),
];

export default postBoardValidation;
