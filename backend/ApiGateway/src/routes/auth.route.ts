import {Router} from 'express';
import {code, info, login, logout, signUp, tokenCheck} from '../controllers/auth.controller';
import {get} from '../utils/jwtToken.util';

const router = Router();

router.get('/token-check', get, tokenCheck);
router.get('/logout', get, logout);

router.post('/signup', signUp);
router.post('/code', code);
router.post('/info', info);
router.post('/login', login);

export default router;
