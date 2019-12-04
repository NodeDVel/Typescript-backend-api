import { body, ValidationChain } from "express-validator";

import Board from "../../../../../database/models/board.model";

// tslint:disable-next-line: interface-name
export interface PostCommentParams {
  body: {
    board_pk: Board['pk'];
  };
}

const PostCommentValidation: ValidationChain[] = [
  body('board_pk').isInt(),
];

export default PostCommentValidation;