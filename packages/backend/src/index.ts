import express from 'express';
import cors from 'cors';
import { greet, ApiResponse } from 'shared';
import { initPool, getMenus } from './db';
import dotenv from 'dotenv';

// 환경 변수 로드
dotenv.config();

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
app.get('/api/menus', async (req, res) => {
  try {
    const pool = await initPool();
    const menus = await getMenus();
    let menu =  
    res.json({
      success: true,
      data: menus,
      count: menus.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('API 에러:', error);
    res.status(500).json({
      success: false,
      error: (error as Error).message
    });
  }
});

interface ApiResponse2<T> {
  success: boolean;
  data: T;
  count?: number;
}

// 서버 시작
const PORT = Number(process.env.PORT) || 3001;
let server: any;
app.listen(PORT, () => {
  try {
    server = console.log(`Backend ESM: http://localhost:${PORT}`);
  } catch (error) {
    console.error('서버 시작 실패:', error);
    process.exit(1);
  }
});

process.on('SIGTERM', () => {
  console.log('서버 종료 중...');
  server?.close(() => {
    process.exit(0);
  });
});