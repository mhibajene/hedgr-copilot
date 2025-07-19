
'use client';
import React, { useEffect, useState } from 'react';

export function Banner({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <div className="bg-gradient-to-r from-hedgr-start via-hedgr-middle to-hedgr-end dark:from-gray-800 dark:via-gray-700 dark:to-gray-600 p-8 rounded-lg text-center text-white dark:text-gray-100">
      {children}
    </div>
  );
}

export function DarkModeToggle(): JSX.Element {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // On mount, pick up saved theme or OS preference
  useEffect(() => {
    if (!mounted) return;

    const stored = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialMode = stored ?? (prefersDark ? 'dark' : 'light');

    setMode(initialMode);
  }, [mounted]);

  // Whenever mode changes, toggle class + persist
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    if (mode === 'dark') {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [mode, mounted]);

  // Prevent rendering until mounted to avoid hydration issues
  if (!mounted) {
    return (
      <button className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 w-10 h-10">
        <span className="opacity-0">☀️</span>
      </button>
    );
  }

  return (
    <button
      aria-label={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}
      onClick={() => setMode((prev) => (prev === 'dark' ? 'light' : 'dark'))}
      className="
        p-2 rounded-full 
        bg-gray-200 hover:bg-gray-300 
        dark:bg-gray-700 dark:hover:bg-gray-600
        text-gray-800 dark:text-gray-200
        transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
      "
    >
      <span className="text-lg" role="img">
        {mode === 'dark' ? '🌙' : '☀️'}
      </span>
    </button>
  );
}
