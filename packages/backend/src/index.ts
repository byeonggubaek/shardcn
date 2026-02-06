import express from 'express';
import cors from 'cors';
import { greet, ApiResponse } from 'shared';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  const response: ApiResponse<string> = {
    success: true,
    data: greet('Backend ESM!')
  };
  res.json(response);
});

const PORT = Number(process.env.PORT) || 3001;
app.listen(PORT, () => {
  console.log(`Backend ESM: http://localhost:${PORT}`);
});