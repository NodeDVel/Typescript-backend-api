import { Router } from 'express';

const router = Router();


import commentController from './comment.controller';

import verify from '../middlewares/jwt/verifyToken';

import createBoard from '@Middleware/board/post/createBoard';
import CheckBoard from '@Middleware/board/post/common/CheckBoard';
import CheckUser from '@Middleware/user/common/CheckUser';
import deleteBoard from '@Middleware/board/post/deleteBoard';
import updateBoard from '@Middleware/board/post/updateBoard';
import likeBoard from '@Middleware/board/post/likeBoard';

router.use(verify);
router.use('/comment', commentController);
router.post('/write', createBoard);
router.post('/delete', CheckBoard, CheckUser, deleteBoard);
router.post('/like', CheckBoard, likeBoard);
router.put('/update', CheckBoard, CheckUser, updateBoard);
export default router;