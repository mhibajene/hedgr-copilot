// apps/frontend/pages/_app.tsx
import type { AppProps } from 'next/app'
import '../styles/globals.css'
import { Inter } from 'next/font/google'
import dynamic from "next/dynamic";

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

const DevSecretsToast =
  process.env.NODE_ENV === 'development'
    ? dynamic(() => import('../components/DevSecretsToast'), { ssr: false })
    : (() => null);

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={`${inter.variable} font-sans`}>
      <Component {...pageProps} />
      <DevSecretsToast />
    </div>
  )
}
