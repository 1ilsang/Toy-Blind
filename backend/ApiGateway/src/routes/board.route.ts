import {Router} from 'express';
import * as multer from 'multer';
import {createBoard, getBoardList, getBoard, deleteBoard, updateBoard} from '../controllers/board.controller';
import {check, get} from '../utils/jwtToken.util';

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({storage});

router.post('/', get, check,  upload.single('userfile'), createBoard);
router.post('/list/:topic', getBoardList);
router.post('/article/view', getBoard);
router.delete('/:boardSeq', get, check, deleteBoard);
router.put('/:boardSeq', get, check, updateBoard);

export default router;
