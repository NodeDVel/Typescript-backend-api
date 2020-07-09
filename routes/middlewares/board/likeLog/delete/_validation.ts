import { body, ValidationChain } from 'express-validator';

import Board from '@Model/board.model';
import BoardLike from '@Model/boardlike.model';

// tslint:disable-next-line: interface-name
// tslint:disable-next-line: class-name
export interface deleteLikeLogRequest {
  body: {
    board_pk: Board['pk'];
    like_pk: BoardLike['pk'];
  };
}

const deleteLikeLogValidation: ValidationChain[] = [
  body('board_pk').isInt(),
  body('like_pk').isInt()
];

export default deleteLikeLogValidation;