import { Router } from 'express';

const router = Router();

import verify from '../middlewares/jwt/verifyToken';
import CheckUser from '@Middleware/user/common/CheckUser';
import createBoard from '@Middleware/board/post/createBoard';
import CheckComment from '@Middleware/board/comment/common/CheckComment';
import deleteComment from '@Middleware/board/comment/deleteComment';
import updateComment from '@Middleware/board/comment/updateComment';

router.use(verify, CheckUser);
router.post('/write', createBoard);
router.post('/delete', CheckComment, CheckUser, deleteComment);
router.post('/update', CheckComment, CheckUser, updateComment);

export default router;