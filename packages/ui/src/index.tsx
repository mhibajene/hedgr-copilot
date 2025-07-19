
import React, { useState, useEffect } from 'react';

export function DarkModeToggle() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  // Initialize mode from localStorage on mount
  useEffect(() => {
    const savedMode = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedMode) {
      setMode(savedMode);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setMode(prefersDark ? 'dark' : 'light');
    }
  }, []);

  // whenever mode changes, toggle class + persist
  useEffect(() => {
    const body = document.body;
    if (mode === 'dark') {
      body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [mode]);

  const toggleMode = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleMode}
      className="p-2 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 transition-colors"
      aria-label={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
    >
      {mode === 'light' ? '🌙' : '☀️'}
    </button>
  );
}
