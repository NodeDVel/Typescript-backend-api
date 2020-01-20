import { body, ValidationChain } from 'express-validator';

import Board from '@Model/board.model';

// tslint:disable-next-line: interface-name
// tslint:disable-next-line: class-name
export interface putAdminBoardRequest {
  body: {
    board_pk: Board['pk'];
  }
}

const putAdminBoardValidation: ValidationChain[] = [
  body('board_pk').isInt(),
]

export default putAdminBoardValidation;