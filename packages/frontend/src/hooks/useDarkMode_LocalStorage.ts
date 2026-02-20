// src/hooks/useDarkMode.ts
import { useState, useEffect } from 'react';

export function useDarkMode2() {
  const [isDark, setIsDark] = useState(false);

  // localStorage에 Dark Mode 설정 저장 및 불러오기
  useEffect(() => {
    const saved = localStorage.getItem('dark-mode');
    if (saved === 'true') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  // 상태 변경 시 DOM + localStorage 업데이트
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('dark-mode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('dark-mode', 'false');
    }
  }, [isDark]);

  const toggleDarkMode = () => setIsDark(prev => !prev);

  return { isDark, toggleDarkMode };
}