import { body, ValidationChain } from 'express-validator';

import { password } from '@Lib/regexp.json';

const userPatchPassword: ValidationChain[] = [
  body('password')
    .isString()
    .matches(password),
];

export default userPatchPassword;