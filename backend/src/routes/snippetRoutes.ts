import { Router } from 'express';
import { createSnippet, getSnippet, listSnippets } from '../controllers/snippetController.js';
import { validateSnippet } from '../middlewares/validateSnippet.js';

const router = Router();

router.post('/', validateSnippet, createSnippet);
router.get('/', listSnippets);
router.get('/:id', getSnippet);

export default router;