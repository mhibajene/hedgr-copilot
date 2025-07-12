// apps/frontend/pages/_app.tsx
import type { AppProps } from 'next/app'
import '../styles/globals.css'
import { Inter } from '@next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={`${inter.variable} font-sans`}>
      <Component {...pageProps} />
    </div>
  )
}