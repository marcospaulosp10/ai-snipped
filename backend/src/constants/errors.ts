export const ERRORS = {
  INTERNAL: {
    CODE: 'INTERNAL_ERROR',
    MESSAGE: 'Internal server error',
  },
  NOT_FOUND: {
    CODE: 'NOT_FOUND',
    MESSAGE: 'Resource not found',
  },
  INVALID_INPUT: {
    CODE: 'INVALID_INPUT',
    MESSAGE: 'Text must be a non-empty string',
  },
  OPENAI_QUOTA: {
    CODE: 'OPENAI_QUOTA_EXCEEDED',
    MESSAGE: 'AI quota exceeded. Check your OpenAI plan.',
  },
  INVALID_ID: {
    CODE: 'INVALID_ID',
    MESSAGE: 'Invalid ID format',
  },
};
