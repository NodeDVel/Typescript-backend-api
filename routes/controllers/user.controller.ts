import { Router } from 'express';

const router = Router();

import changepassword from '../middlewares/user/changePassword/changePassword';

import CheckUser from '../middlewares/user/common/CheckUser';
import passwordEncryption from '../middlewares/user/common/passwordEncryption';

import login from '../middlewares/user/login/login';
import loignReqCheck from '../middlewares/user/login/loginReqCheck';

import register from '../middlewares/user/register/register';
import registReqCheck from '../middlewares/user/register/registerReqCheck';
import issueToken from '@Middleware/jwt/issueToken';

router.post('/change', changepassword);
router.post('/register', CheckUser, register, registReqCheck, passwordEncryption);
router.post('/login', CheckUser, issueToken, login, loignReqCheck, passwordEncryption);

export default router;