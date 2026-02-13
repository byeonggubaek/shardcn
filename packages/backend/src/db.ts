// oracle-pool.ts (에러 수정 완료)
import oracledb from 'oracledb';
import { NavItem } from 'shared';
import dotenv from 'dotenv';

// 환경 변수 로드
dotenv.config();

const DB_CONFIG = {
  user: process.env.DB_USER,
  password: process.env.DB_USER_PASSWORD,
  connectString: `${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_SERVICE_NAME}`,
  poolMin: 1,
  poolMax: 10,
  poolIncrement: 1
};

let pool: any = null;

export async function initPool(): Promise<void> {
  if (pool) return;
  
  try {
    pool = await oracledb.createPool(DB_CONFIG);
    console.log('✅ Oracle 풀 연결 성공');
  } catch (error) {
    console.error('❌ 풀 생성 실패:', error);
    throw error;
  }
}

/**
 * 쿼리 실행 (SELECT) - 수정됨!
 */
async function select(sql: string, binds: any[] = []): Promise<any[]> {
  await initPool();
  const connection = await pool!.getConnection();
  try {
    const result = await connection.execute(sql, binds, {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
    });
    return result.rows as any[];
  } finally {
    await connection.close();
  }
}

/**
 * INSERT/UPDATE/DELETE (DML)
 */
async function execute(sql: string, binds: any[] = []): Promise<any> {
  await initPool();
  const connection = await pool!.getConnection();
  
  try {
    const result = await connection.execute(sql, binds, {
      autoCommit: true,
      outFormat: oracledb.OUT_FORMAT_OBJECT
    });
    return result;
  } finally {
    await connection.close();
  }
}

// 메뉴 조회 예제
export async function getRawMenus(): Promise<any[]> {
  return select(`SELECT ID, TITLE, IMG, DESCRIPTION FROM NAV_ITEM`);
}

export async function getRawSubMenus(): Promise<any[]> {
  return select(`
    SELECT TO_CHAR(NAV_ITEM_ID) || '-' || TO_CHAR(ID) AS ID, 
           TITLE, HREF, DESCRIPTION 
    FROM NAV_SUB_ITEM
  `);
}
// 2. 👇 핵심! NavItem[]로 변환
export async function getMenus(): Promise<NavItem[]> {
  const menus = await getRawMenus();
  const subMenus = await getRawSubMenus();
  
  // 메뉴 맵 생성
  const menuMap = new Map<string, NavItem>();
  
  // 1단계: 메뉴 객체 생성
  menus.forEach((menu: any) => {
    const navItem: NavItem = {
      id: menu.ID.toString(),
      title: menu.TITLE,
      img: menu.IMG || '',
      description: menu.DESCRIPTION || '',
      sub_menus: []
    };
    menuMap.set(navItem.id, navItem);
  });
  
  // 2단계: 서브메뉴 연결 (1-1 → id="1"에 추가)
  subMenus.forEach((sub: any) => {
    const parentId = sub.ID.split('-')[0]; // "1-1" → "1"
    const parentMenu = menuMap.get(parentId);
    
    if (parentMenu) {
      parentMenu.sub_menus.push({
        id: sub.ID,
        title: sub.TITLE,
        href: sub.HREF || '',
        description: sub.DESCRIPTION || ''
      });
    }
  });
  
  return Array.from(menuMap.values());
}