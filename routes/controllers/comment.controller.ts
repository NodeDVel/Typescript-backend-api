import { Router } from 'express';

const router = Router();

import verify from '../middlewares/jwt/verifyToken';

import getComment from '../middlewares/board/comment/get/getComment';
import CheckUser from '../middlewares/user/common/CheckUser';

import createBoardCommentLike from '../middlewares/board/comment/like/createBoardCommentLike';
import deleteBoardCommentLike from '../middlewares/board/comment/like/deleteBoardCommentLike';

import deleteComment from '../middlewares/board/comment/delete/deleteComment';
import updateComment from '../middlewares/board/comment/patch/updateComment';
import createComment from '../middlewares/board/comment/post/createComment';

router.use(verify, CheckUser);

router.post('/comment', getComment, createComment);
router.post('/comment', getComment, CheckUser, deleteComment);
router.post('/comment', getComment, CheckUser, updateComment);
router.post('/comment', getComment, createBoardCommentLike, deleteBoardCommentLike);

export default router;