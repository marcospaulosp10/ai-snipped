export const ERRORS = {
  INTERNAL: {
    CODE: 'INTERNAL_ERROR',
    MESSAGE: 'Internal server error',
    STATUS: 500,
  },
  NOT_FOUND: {
    CODE: 'NOT_FOUND',
    MESSAGE: 'Resource not found',
    STATUS: 404,
  },
  INVALID_INPUT: {
    CODE: 'INVALID_INPUT',
    MESSAGE: 'Text must be a non-empty string',
    STATUS: 400,
  },
  OPENAI_QUOTA: {
    CODE: 'OPENAI_QUOTA_EXCEEDED',
    MESSAGE: 'AI quota exceeded. Check your OpenAI plan.',
    STATUS: 429,
  },
  INVALID_ID: {
    CODE: 'INVALID_ID',
    MESSAGE: 'Invalid ID format',
    STATUS: 400,
  },
};