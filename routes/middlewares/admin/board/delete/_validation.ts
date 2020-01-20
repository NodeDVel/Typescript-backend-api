import { query, ValidationChain } from 'express-validator';

import Board from '@Model/board.model';

// tslint:disable-next-line: no-empty-interface
// tslint:disable-next-line: interface-name
export interface deleteAdminBoardRequest {
  query: {
    board_pk: Board['pk'];
  },
}

const deleteAdminBoardValidation: ValidationChain[] = [
  query('board_pk').isInt(),
]

export default deleteAdminBoardValidation;