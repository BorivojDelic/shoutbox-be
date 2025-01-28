import 'dotenv/config';

export const MESSAGES_LIMIT = +(process.env.LIMITED_MESSAGES || 10);

export const LOGGING_LEVELS = [
  'error',
  // 'query', // TODO: uncomment for debugging
];
