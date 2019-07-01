import {Router} from 'express';
import {createComment, deleteComment, getCommentList, getMoreReplyComments} from '../controllers/comment.controller';
import {check, get} from '../utils/jwtToken.util';

const router = Router();

router.delete('/:seq', get, check, deleteComment);
router.post('/list', getCommentList);
router.post('/more', getMoreReplyComments);
router.post('/', get, check, createComment);

export default router;
