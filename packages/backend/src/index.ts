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
app.get('/api/get_postcodes', async (req, res) => {
  try {
    const { zipcode } = req.query;
    
    if (!zipcode || zipcode.length !== 5) {
      return res.status(400).json({ error: '5자리 우편번호 입력' });
    }
    
    const serviceKey = process.env.VITE_EPOST_SERVICE_KEY!;
    const url = `http://biz.epost.go.kr/KpostPortal/openapi?regkey=${serviceKey}&target=postNew&query=${zipcode}`;
    
    const response = await fetch(url);
    const xml = await response.text();
    
    const addresses = parseEpostXML(xml);
    console.log(`우편번호 ${zipcode} 검색 결과:`, addresses);
    res.json({
      success: true,
      data: addresses
    });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});
// XML 파싱 (안정적)
function parseEpostXML(xml: string) {
  const results: any[] = [];
  
  // 1단계: CDATA 태그 제거 (핵심!)
  const cleanXml = xml
    .replace(/<!\[CDATA\[(.*?)\]\]>/gs, '$1')  // CDATA 내용만 추출
    .replace(/<postcd>(.*?)<\/postcd>/gs, (match, p1) => `<postcd>${p1.trim()}</postcd>`)
    .replace(/<address>(.*?)<\/address>/gs, (match, p1) => `<address>${p1.trim()}</address>`)
    .replace(/<roadAddress>(.*?)<\/roadAddress>/gs, (match, p1) => `<roadAddress>${p1.trim()}</roadAddress>`);
  
  // 2단계: <item> 추출
  const itemRegex = /<item>(.*?)<\/item>/gs;
  let match;
  
  while ((match = itemRegex.exec(cleanXml)) !== null) {
    const item = match[1];
    
    const postcodeMatch = item.match(/<postcd>([^<]+)<\/postcd>/i);
    const addressMatch = item.match(/<address>([^<]+)<\/address>/i);
    const roadMatch = item.match(/<roadAddress>([^<]+)<\/roadAddress>/i);
    
    if (postcodeMatch?.[1]) {
      results.push({
        postcode: postcodeMatch[1].trim(),
        address: addressMatch?.[1]?.trim() || '',
        roadAddress: roadMatch?.[1]?.trim() || ''
      });
    }
  }
  
  return results;
}

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

