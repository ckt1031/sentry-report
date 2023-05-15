import type { VercelRequest, VercelResponse } from '@vercel/node';

export default (_: VercelRequest, res: VercelResponse) => {
  // Send text: OK
  res.status(200).send('OK');
};
