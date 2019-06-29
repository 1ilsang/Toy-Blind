import { Router } from 'express';
import {test, tokenCheck, signUp, code, info, login, logout} from '../controllers/auth.controller';
import {get} from '../utils/jwtToken.util';

const router = Router();

router.route('/test')
    .get(test);
router.route('/token-check')
    .get(get, tokenCheck);

router.get('/logout', get, logout);

router.post('/signup', signUp);
router.post('/code', code);
router.post('/info', info);
router.post('/login', login);

export default router;
