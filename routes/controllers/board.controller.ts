import { Router } from 'express';

const router = Router();


import commentController from './comment.controller';

import verify from '../middlewares/jwt/verifyToken';

import getBoard from '../middlewares/board/post/get/getBoard';
import CheckUser from '../middlewares/user/common/CheckUser';

import likeBoardLog from '../middlewares/board/likeLog/post/PostLikeLog';
import deleteBoard from '../middlewares/board/post/delete/deleteBoard';
import likeBoard from '../middlewares/board/post/like/likeBoard';
import updateBoard from '../middlewares/board/post/patch/updateBoard';
import postBoard from '../middlewares/board/post/post/postBoard';

router.use(verify);
router.use('/comment', commentController);

router.get('/board', likeBoardLog);
router.post('/board', postBoard);
router.post('/board', getBoard, CheckUser, deleteBoard);
router.post('/board', getBoard, likeBoard);
router.put('/board', getBoard, CheckUser, updateBoard);

export default router;