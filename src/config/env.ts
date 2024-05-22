import { z } from 'zod';

const envSchema = z.object({
  PORT: z.coerce
    .number({
      description:
        '.env files convert numbers to strings, therefoore we have to enforce them to be numbers',
    })
    .positive()
    .max(65536, `options.port should be >= 0 and < 65536`)
    .default(3000),
  HOST: z.string().url().default('http://localhost'),
  BASE_URL: z.string().default('/api/v1'),
  NODE_ENV: z
    .union([
      z.literal('development'),
      z.literal('testing'),
      z.literal('production'),
    ])
    .default('development'),
});

export const env = envSchema.parse(process.env);
