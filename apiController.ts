import { Router } from 'express';

const router = Router();


import userController from './routes/controllers/user.controller';
import boardController from './routes/controllers/board.controller';
import commentController from './routes/controllers/comment.controller';

router.use('/user', userController);
router.use('/board', boardController);

export default router;