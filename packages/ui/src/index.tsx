'use client';
import React, { useEffect, useState } from 'react';
export function Banner({ children }: { children: React.ReactNode }): JSX.Element {
return (
<div className="bg-gradient-to-r from-hedgr-start via-hedgr-middle to-hedgr-end p-8 rounded-lg text-center">
{children}
</div>
);
}
export function DarkModeToggle(): JSX.Element {
// state starts as 'light' and will be updated on mount
const [mode, setMode] = useState<'light' | 'dark'>('light');

// on mount, pick up saved theme or OS preference
useEffect(() => {
const stored = localStorage.getItem('theme') as 'light' | 'dark' | null;
const prefersDark =
window.matchMedia('(prefers-color-scheme: dark)').matches;
setMode(stored ?? (prefersDark ? 'dark' : 'light'));
}, []);

// whenever mode changes, toggle class + persist
useEffect(() => {
const root = document.documentElement;
if (mode === 'dark') {
root.classList.add('dark');
localStorage.setItem('theme', 'dark');
} else {
root.classList.remove('dark');
localStorage.setItem('theme', 'light');
}
}, [mode]);
  
// render the toggle button
return (
<button
aria-label="Toggle dark mode"
onClick={() => setMode((prev) => (prev === 'dark' ? 'light' : 'dark'))}
className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
>
{mode === 'dark' ? '🌙' : '☀️'}
</button>
);
}
