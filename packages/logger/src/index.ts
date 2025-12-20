import { randomBytes } from 'node:crypto';
import pino, { type Logger } from 'pino';

const isDev = process.env.NODE_ENV === 'development';

const logger = isDev
  ? pino({
      level: process.env.LOG_LEVEL || 'info',
      serializers: {
        err: pino.stdSerializers.err,
        error: pino.stdSerializers.err,
      },
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:standard',
          ignore: 'pid,hostname',
        },
      },
    })
  : pino({
      level: process.env.LOG_LEVEL || 'info',
      serializers: {
        err: pino.stdSerializers.err,
        error: pino.stdSerializers.err,
      },
    });

export default logger;

export const generateCorrelationId = (): string =>
  randomBytes(3).toString('hex');

export const formatDuration = (ms: number): string => {
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(1)}s`;
};

export const summarizeValidationError = (error: string): string => {
  const pathMatches = error.match(/"path":\s*\[\s*(\d+),\s*"([^"]+)"/g);
  if (!pathMatches) return error.slice(0, 100);

  const fieldCounts: Record<string, number> = {};
  for (const match of pathMatches) {
    const fieldMatch = match.match(/"([^"]+)"$/);
    if (fieldMatch?.[1]) {
      const field = fieldMatch[1];
      fieldCounts[field] = (fieldCounts[field] || 0) + 1;
    }
  }

  const summary = Object.entries(fieldCounts)
    .map(([field, count]) => `${field}: ${count}`)
    .join(', ');

  const total = Object.values(fieldCounts).reduce((a, b) => a + b, 0);
  return `${total} invalid fields (${summary})`;
};

export type { Logger };
