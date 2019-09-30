import { Router } from 'express';

const router = Router();


import boardController from './routes/controllers/board.controller';
import commentController from './routes/controllers/comment.controller';
import userController from './routes/controllers/user.controller';

router.use('/user', userController);
router.use('/board2', boardController);
router.use('/comment2', commentController);

export default router;