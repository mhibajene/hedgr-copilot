import React, { useState, useEffect } from 'react';

export function Banner({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gradient-to-r from-hedgr-start via-hedgr-middle to-hedgr-end p-8 rounded-lg text-center">
      {children}
    </div>
  );
}

export function DarkModeToggle() {
  const [mode, setMode] = useState<'light'|'dark'>('light');
  useEffect(() => {
    document.documentElement.classList.toggle('dark', mode==='dark');
  }, [mode]);
  return (
    <button onClick={() => setMode(mode==='light' ? 'dark' : 'light')}>
      {mode==='light' ? '🌙' : '☀️'}
    </button>
  );
}