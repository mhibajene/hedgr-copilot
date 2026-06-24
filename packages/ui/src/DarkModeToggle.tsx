'use client'
import { useEffect, useState } from 'react'

export function DarkModeToggle() {
  const [mode, setMode] = useState<'light' | 'dark'>('light')

  // Initialize from saved theme or OS
  useEffect(() => {
    const saved = (typeof window !== 'undefined'
      ? (localStorage.getItem('theme') as 'light' | 'dark' | null)
      : null)

    const initial =
      saved ??
      (typeof window !== 'undefined' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light')

    setMode(initial)
    if (initial === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const toggle = () => {
    const next: 'light' | 'dark' = mode === 'dark' ? 'light' : 'dark'
    setMode(next)

    if (next === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    localStorage.setItem('theme', next)
    console.log('[DarkModeToggle] html.classList:', document.documentElement.classList.toString())
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle Dark Mode"
      className="p-2 rounded-full bg-hedgr-100 text-hedgr-800 dark:bg-hedgr-800 dark:text-hedgr-white hover:opacity-80 transition"
    >
      {mode === 'dark' ? '🌙' : '☀️'}
    </button>
  )
}
