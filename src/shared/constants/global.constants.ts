import 'dotenv/config';

export const MESSAGES_LIMIT = process.env.LIMITED_MESSAGES;

export const LOGGING_LEVELS = [
  'error',
  // 'query', // TODO: uncomment for debugging
];
