import Errors from './errors';
import { ErrorNames } from '@Lib/types';

class CustomError {
  constructor({ name, message }: { name: keyof typeof ErrorNames; message?: string }) {
    const customError = new Error();
    customError.name = name;
    customError.message = message || Errors[name].message;

    return customError;
  }
}

export default CustomError;
