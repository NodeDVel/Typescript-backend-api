import { Router } from 'express';

const router = Router();

import changepassword from '../middlewares/user/changePassword/changePassword';

import CheckUser from '../middlewares/user/common/CheckUser';
import passwordEncryption from '../middlewares/user/common/passwordEncryption';

import loignReqCheck from '../middlewares/user/login/_validation';
import login from '../middlewares/user/login/login';

import issueToken from '../middlewares/jwt/issueToken';
import registReqCheck from '../middlewares/user/register/_validation';
import register from '../middlewares/user/register/register';

router.post('/change', changepassword);
router.post('/register', CheckUser, register, registReqCheck, passwordEncryption);
router.post('/login', CheckUser, issueToken, login, loignReqCheck, passwordEncryption);

export default router;