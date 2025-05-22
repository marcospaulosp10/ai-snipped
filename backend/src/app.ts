import express, { Application } from 'express';
import dotenv from 'dotenv';
import snippetRoutes from './routes/snippetRoutes.js';

dotenv.config();

const app: Application = express();
app.use(express.json());
app.use('/api', snippetRoutes);

export default app;