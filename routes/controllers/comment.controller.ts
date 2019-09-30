import { Router } from 'express';

const router = Router();

import verify from '../middlewares/jwt/verifyToken';

import CheckComment from '../middlewares/board/comment/common/CheckComment';
import CheckUser from '../middlewares/user/common/CheckUser';

import createComment from '../middlewares/board/comment/post/createComment';
import deleteComment from '../middlewares/board/comment/delete/deleteComment';
import createBoardCommentLike from '../middlewares/board/comment/like/createBoardCommentLike';
import deleteBoardCommentLike from '../middlewares/board/comment/like/deleteBoardCommentLike';
import updateComment from '../middlewares/board/comment/patch/updateComment';

router.use(verify, CheckUser);

router.post('/write', CheckComment, createComment);
router.post('/delete', CheckComment, CheckUser, deleteComment);
router.post('/update', CheckComment, CheckUser, updateComment);
router.post('/like', CheckComment, createBoardCommentLike, deleteBoardCommentLike);

export default router;