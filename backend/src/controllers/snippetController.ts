import { Request, Response } from 'express';
import { Snippet } from '../models/Snippet';
import { generateSummary } from '../services/aiService';

export const createSnippet = async (req: Request, res: Response) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }

  try {
    const summary = await generateSummary(text);
    const snippet = await Snippet.create({ text, summary });

    return res.status(201).json({
      id: snippet._id,
      text: snippet.text,
      summary: snippet.summary,
    });
  } catch (error) {
    console.error('Error creating snippet:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getSnippet = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const snippet = await Snippet.findById(id);

    if (!snippet) {
      return res.status(404).json({ error: 'Snippet not found' });
    }

    return res.json({
      id: snippet._id,
      text: snippet.text,
      summary: snippet.summary,
    });
  } catch (error) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }
};
