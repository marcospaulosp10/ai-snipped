import { Router } from 'express';
import { postSnippet, getSnippet } from '../controllers/snippetController';

const router = Router();
router.post('/', postSnippet);
router.get('/:id', getSnippet);
export default router;