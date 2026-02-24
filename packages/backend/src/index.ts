import express from 'express';
import cors from 'cors';
import { greet, ApiResponse } from 'shared';
import { initPool, getMenus, getInvoices, getColDescs } from './db';
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
app.get('/api/get_menus', async (req, res) => {
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
app.get('/api/get_invoices', async (req, res) => {
  try {
    const pool = await initPool();
    const invoices = await getInvoices();
    res.json({
      success: true,
      data: invoices,
      count: invoices.length,
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
app.get('/api/get_col_descs', async (req, res) => {
  try {
    const { table } = req.query as { table: string };  // 👈 req.query 사용!

    if (!table) {
      return res.status(400).json({
        success: false,
        error: 'table 이름이 필요합니다.'
      });
    }

    const pool = await initPool();
    const colDescs = await getColDescs(table);
    res.json({
      success: true,
      data: colDescs,
      count: colDescs.length,
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