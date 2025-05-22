import { Router } from 'express';
import { createSnippet, getSnippet, listSnippets } from '../controllers/snippetController.js';
import { validateSnippet } from '../middlewares/validateSnippet.js';

const router = Router();

router.post('/snippets', validateSnippet, createSnippet);
router.get('/snippets/:id', getSnippet);
router.get('/snippets', listSnippets);

export default router;