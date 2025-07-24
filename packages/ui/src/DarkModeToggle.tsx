// packages/ui/src/DarkModeToggle.tsx
import { useEffect, useState } from 'react'

export function DarkModeToggle() {
  const [mode, setMode] = useState<'light' | 'dark'>('light')

  // On mount: read saved theme or OS preference
  useEffect(() => {
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null
    const initial = saved || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    setMode(initial)
    if (initial === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, []) 

  const toggle = () => {
  // compute the next theme
    const next = mode === 'dark' ? 'light' : 'dark'
    setMode(next)
    if (next === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    // persist + debug
    localStorage.setItem('theme', next)
    console.log(
      '[DarkModeToggle] html.classList:',
      document.documentElement.classList.toString()
    )
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