// apps/frontend/pages/_app.tsx
import type { AppProps } from 'next/app'
import '../styles/globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  <div
    className={`
      ${inter.className}
      min-h-screen
      bg-white text-gray-900
      dark:bg-gray-900 dark:text-gray-100
      transition-colors duration-300
    `}
    >
    <Component {...pageProps} />
  </div>
  )
}