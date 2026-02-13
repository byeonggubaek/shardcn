// src/layouts/MainLayout.jsx
import WdogNavi from '@/components/WdogNavi'
import type { NavItem } from 'shared';
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function MainLayout() {
  const [navItems, setNavItems] = useState<NavItem[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/menus')
      .then(res => res.json())
      .then(data => {
        console.table('📥 받은 메뉴:', data.data);
        setNavItems(data.data);  // 👈 바로 사용!
      });
  }, []);

  return (
    <div className=" bg-gray-50 flex flex-col w-screen min-h-screen ">  
      {/* Header */}
      <header className="w-full px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-20 mx-auto bg-white shadow-sm border-b flex-shrink-0">  {/* ✅ flex-shrink-0 */}
        <nav className="flex justify-between items-center">
          <img src="/logo.svg" alt="Logo" className="h-10 w-auto hover:cursor-pointer" />
          <WdogNavi navItems={navItems} /> 
          <div className="w-[100px] space-x-4 hidden md:block pl-4">
            <a href="/" className="text-blue-600 hover:underline">로그인</a>
          </div>
        </nav>
      </header>
      
      {/* Main: 꽉차게 + 중앙 */}
      <main className="w-full px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-20 mx-auto flex-1 py-8">  {/* ✅ flex-1 */}
        <Outlet />
      </main>
      
      {/* Footer */}
      <footer className="w-full px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-20 mx-auto bg-gray-800 text-white py-6 flex-shrink-0">  {/* ✅ flex-shrink-0 */}
        <div className="text-center">
          Copyright © 2026 소상공인 356 
        </div>
      </footer>
    </div>
  );
}