import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  DOTE_ENV: z.enum(['dev', 'test', 'prod']).default('dev'),
  PORT: z.coerce.number().default(3000),
  JWT_SECRET: z.string()
});

const validateEnv = envSchema.safeParse(process.env);

if(validateEnv.success === false) {
  console.log('Invalid environment variables', validateEnv.error);
  
  throw new Error('Invalid environment variables');
}

export const env = validateEnv.data;