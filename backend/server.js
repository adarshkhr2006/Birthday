import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import messagesRouter from './routes/messages.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'birthday-surprise-annu', timestamp: Date.now() });
});

app.use('/api/messages', messagesRouter);

const port = process.env.PORT || 5174;
app.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`);
});

