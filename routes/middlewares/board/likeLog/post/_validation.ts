import { body, ValidationChain } from "express-validator";

import Board from "../../../../../database/models/board.model";
import BoardLike from "../../../../../database/models/boardLike.model";

// tslint:disable-next-line: interface-name
export interface PostLikeLogRequest {
  body: {
    board_pk: Board['pk'];
    like_pk: BoardLike['pk'];
  };
}

const approveDepositValidation: ValidationChain[] = [
  body('board_pk').isInt(),
  body('like_pk').isInt(),
];

export default approveDepositValidation;