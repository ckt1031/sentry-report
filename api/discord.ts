import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';

import { validateResaponse } from '../utils/auth.js';

// Sentry Input Request Zod Schema
const SentryInputSchema = z.object({
  url: z.string(),
  project_name: z.string(),
  culprit: z.string(),
  event: z.object({
    id: z.string(),
    title: z.string(),
    platform: z.string(),
  }),
});

// Environment variables Zod Schema
const EnvSchema = z.object({
  DISCORD_WEBHOOK_URL: z.string(),
  DISCORD_MENTION_ROLE_ID: z.string().optional(),
});

// Parse environment variables
const env = EnvSchema.parse(process.env);

export default async (req: VercelRequest, res: VercelResponse) => {
  const isAuthOk = validateResaponse(req, res);

  // Check if the authorization is valid
  if (!isAuthOk) return;

  // Check if the request is a POST request
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed, please use POST' });
    return;
  }

  // Parse the request body
  const parseResult = SentryInputSchema.safeParse(req.body);

  // Check if the request body is valid
  if (!parseResult.success) {
    res.status(400).json({ error: 'Invalid request body' });
    return;
  }

  // Get the JSON from the request body
  const json = parseResult.data;

  // Check if mention role is set
  const mention = env.DISCORD_MENTION_ROLE_ID ? `<@&${env.DISCORD_MENTION_ROLE_ID}>` : '';

  // Embed and Message body
  const body = {
    content: `New Error Reported! ${mention}\nProject: \`${json.project_name}\`\nID: \`${json.event.id}\``,
    embeds: [
      {
        title: json.event.title,
        url: json.url,
        description: `\`\`\`${json.culprit}\`\`\``,
      },
    ],
  };

  // Send the request to Discord
  await fetch(env.DISCORD_WEBHOOK_URL, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Send a response
  res.status(200).json({ success: true });
};
