import { body, ValidationChain } from 'express-validator';

const postBoardValidation: ValidationChain[] = [
  body('content')
    .isString()
    .isLength({ max: 600 }),
];

export default postBoardValidation;
