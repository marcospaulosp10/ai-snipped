import { Router } from 'express';
import { createSnippet, getSnippet } from '../controllers/snippetController';
import { validateSnippet } from '../middlewares/validateSnippet';

const router = Router();

router.post('/snippets', validateSnippet, createSnippet);
router.get('/snippets/:id', getSnippet);

export default router;