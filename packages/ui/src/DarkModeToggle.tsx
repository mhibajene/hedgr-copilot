// packages/ui/src/DarkModeToggle.tsx
import { useEffect, useState } from 'react'

export function DarkModeToggle() {
  const [mode, setMode] = useState<'light' | 'dark'>('light')

  // On mount: read saved theme or OS preference
  useEffect(() => {
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null
    if (saved) {
      setMode(saved)
      document.documentElement.classList.toggle('dark', saved === 'dark')
    } else {
      const osDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setMode(osDark ? 'dark' : 'light')
      document.documentElement.classList.toggle('dark', osDark)
    }
  }, [])

  const toggle = () => {
    const next = mode === 'dark' ? 'light' : 'dark'
    setMode(next)
    document.documentElement.classList.toggle('dark', next === 'dark')
    localStorage.setItem('theme', next)
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle Dark Mode"
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:opacity-80 transition"
    >
      {mode === 'dark' ? '🌙' : '☀️'}
    </button>
  )
}