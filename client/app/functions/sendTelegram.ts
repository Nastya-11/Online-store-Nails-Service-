import type { NextApiRequest, NextApiResponse } from 'next';
import { sendOrderToTelegram } from '/Users/anastasiiahalyk/Desktop/wins/server/Controllers/TelegramController.js';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    return await sendOrderToTelegram(req, res);
  } else {
    res.status(405).json({ message: 'Метод не дозволено' });
  }
}
