import { Router } from 'express';

const router = Router();

// In-memory store
const messages = [];

router.get('/', (_req, res) => {
  res.json(messages);
});

router.post('/', (req, res) => {
  const { name, message } = req.body || {};
  if (!name || !message) {
    return res.status(400).json({ error: 'Name and message are required' });
  }
  const entry = { name: String(name).slice(0, 60), message: String(message).slice(0, 300), time: Date.now() };
  messages.unshift(entry);
  res.status(201).json(entry);
});

export default router;

