import { Request, Response, NextFunction } from 'express';

export const validateSnippet = (req: Request, res: Response, next: NextFunction) => {
  const { text } = req.body;

  if (typeof text !== 'string' || text.trim().length === 0) {
    return res.status(400).json({ error: 'Text must be a non-empty string' });
  }

  next();
};