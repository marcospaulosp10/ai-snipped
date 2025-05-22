import { Request, Response, NextFunction } from 'express';
import { Snippet } from '../models/Snippet.js';
import { generateSummary } from '../services/aiService.js';
import { ERROR_CODES } from '../constants/errorCodes.js';
import { ERRORS } from '../constants/errors.js';
import { AppError } from '../errors/AppError.js';

export const createSnippet = async (req: Request, res: Response, next: NextFunction) => {
  const { text } = req.body;

  try {
    const summary = await generateSummary(text);
    const snippet = await Snippet.create({ text, summary });

    return res.status(201).json({
      id: snippet._id,
      text: snippet.text,
      summary: snippet.summary,
    });
  } catch (err: any) {
    console.error(err);
    if (err.code === ERROR_CODES.OPENAI.INSUFFICIENT_QUOTA || err.status === 429) {
      return next(new AppError(
        ERRORS.OPENAI_QUOTA.CODE,
        ERRORS.OPENAI_QUOTA.MESSAGE,
        ERRORS.OPENAI_QUOTA.STATUS
      ));
    }

    return next(new AppError(
      ERRORS.INTERNAL.CODE,
      err.message || ERRORS.INTERNAL.MESSAGE,
      ERRORS.INTERNAL.STATUS
    ));
  }
};

export const getSnippet = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const snippet = await Snippet.findById(id);

    if (!snippet) {
      return next(new AppError(
        ERRORS.NOT_FOUND.CODE,
        ERRORS.NOT_FOUND.MESSAGE,
        ERRORS.NOT_FOUND.STATUS
      ));
    }

    return res.json({
      id: snippet._id,
      text: snippet.text,
      summary: snippet.summary,
    });
  } catch (err: any) {
    if (err.name === ERROR_CODES.MONGO.CAST_ERROR) {
      return next(new AppError(
        ERRORS.INVALID_ID.CODE,
        ERRORS.INVALID_ID.MESSAGE,
        ERRORS.INVALID_ID.STATUS
      ));
    }

    return next(new AppError(
      ERRORS.INTERNAL.CODE,
      err.message || ERRORS.INTERNAL.MESSAGE,
      ERRORS.INTERNAL.STATUS
    ));
  }
};

export const listSnippets = async (req: Request, res: Response, next: NextFunction) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  try {
    const snippets = await Snippet.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Snippet.countDocuments();

    return res.json({
      total,
      page,
      limit,
      data: snippets.map((s) => ({
        id: s._id,
        text: s.text,
        summary: s.summary,
      })),
    });
  } catch (err: any) {
    return next(new AppError(
      ERRORS.INTERNAL.CODE,
      err.message || ERRORS.INTERNAL.MESSAGE,
      ERRORS.INTERNAL.STATUS
    ));
  }
};
