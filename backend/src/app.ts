import express from 'express';
import snippetRoutes from './routes/snippetRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFound } from './middlewares/notFound.js';

const app = express();

app.use(express.json());
app.use('/api/snippets', snippetRoutes);
app.use(notFound);
app.use(errorHandler);

export default app;
