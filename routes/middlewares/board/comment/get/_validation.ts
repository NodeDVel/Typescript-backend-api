import { query, ValidationChain } from 'express-validator';

import Board from '@Model/board.model';

// tslint:disable-next-line: interface-name
// tslint:disable-next-line: class-name
export interface getCommnetRequest {
  query: {
    board_pk: Board['pk'];
  }
}

const getCommentValidation: ValidationChain[] = [
  query('board_pk').isInt(),
]

export default getCommentValidation;