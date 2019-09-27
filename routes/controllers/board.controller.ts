import { Router } from 'express';

const router = Router();


import commentController from './comment.controller';

import verify from '../middlewares/jwt/verifyToken';

import CheckBoard from '../middlewares/board/post/common/CheckBoard';
import CheckUser from '../middlewares/user/common/CheckUser';

import likeBoardLog from '../middlewares/board/likeLog/likeBoardLog';
import createBoard from '../middlewares/board/post/createBoard';
import deleteBoard from '../middlewares/board/post/deleteBoard';
import likeBoard from '../middlewares/board/post/likeBoard';
import updateBoard from '../middlewares/board/post/updateBoard';

router.use(verify);
router.use('/comment', commentController);

router.get('/log', likeBoardLog);
router.post('/write', createBoard);
router.post('/delete', CheckBoard, CheckUser, deleteBoard);
router.post('/like', CheckBoard, likeBoard);
router.put('/update', CheckBoard, CheckUser, updateBoard);

export default router;