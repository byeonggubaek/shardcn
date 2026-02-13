// src/layouts/MainLayout.jsx
import WdogNavi from '@/components/WdogNavi'
import type { NavItem } from 'shared';
import { Link, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDarkMode } from '@/hooks/useDarkMode';
import { Button } from '@/components/ui/button';

export default function MainLayout() {
  const [navItems, setNavItems] = useState<NavItem[]>([]);
  const { isDark, toggleDarkMode } = useDarkMode();

  useEffect(() => {
    fetch('http://localhost:3001/api/menus')
      .then(res => res.json())
      .then(data => {
        console.table('📥 받은 메뉴:', data.data);
        setNavItems(data.data);  // 👈 바로 사용!
      });
  }, []);

  return (
    <div className="flex flex-col w-screen min-h-screen ">  
      {/* Header */}
      <header className="w-full px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-20 mx-auto border-b shrink-0">  {/* ✅ flex-shrink-0 */}
        <nav className="flex justify-between items-center">
          <Link to="/">
            <img src="/logo.svg" alt="Logo" className="h-10 w-auto hover:cursor-pointer" />
          </Link>
          <WdogNavi navItems={navItems} /> 
          <div className="w-25 space-x-4 hidden md:block pl-4">
            <Button 
              variant="outline" 
              onClick={toggleDarkMode}
              className="gap-2"
            >
              {isDark ? '☀️ 라이트' : '🌙 다크'}
            </Button>
          </div>
        </nav>
      </header>
      
      {/* Main: 꽉차게 + 중앙 */}
      <main className="w-full px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-20 mx-auto flex-1 py-8">  {/* ✅ flex-1 */}
        <Outlet />
      </main>
      
      {/* Footer */}
      <footer className="w-full px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-20 mx-auto bg-gray-800 text-white py-6 shrink-0">  {/* ✅ flex-shrink-0 */}
        <div className="text-center">
          Copyright © 2026 소상공인 356 
        </div>
      </footer>
    </div>
  );
}