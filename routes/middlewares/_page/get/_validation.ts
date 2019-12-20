import { query, ValidationChain } from 'express-validator';

const getBoardValidation: ValidationChain[] = [
  query('page_num')
    .optional()
    .isInt({ min: 1, max: 1000 }),
];

export default getBoardValidation;