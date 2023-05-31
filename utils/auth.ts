import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';

// Environment variables Zod Schema
const EnvSchema = z.object({
  AUTH_KEY: z.string(),
});

// Parse environment variables
const env = EnvSchema.parse(process.env);

export const validateResaponse = (req: VercelRequest, res: VercelResponse) => {
  // Check if the request body is valid
  if (req.query.key !== env.AUTH_KEY) {
    res.status(401).json({ error: 'Invalid authorization key' });
    return false;
  }

  return true;
};
