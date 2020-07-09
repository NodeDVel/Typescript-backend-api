import { body, ValidationChain } from 'express-validator';

import { password } from '@Lib/regexp.json';

const loginValidation: ValidationChain[] = [
  body('id').isString(),
  body('password').isString().matches(password),
]

export default loginValidation;