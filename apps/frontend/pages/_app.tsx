// apps/frontend/pages/_app.tsx
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import type { FC } from 'react'
import { initAnalytics } from '../lib/analytics'
import '../styles/globals.css'
import { Inter } from 'next/font/google'
import dynamic from "next/dynamic";

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const DevSecretsToast = dynamic(() => import('../components/DevSecretsToast'), { ssr: false })

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    void initAnalytics();
  }, []);

  return (
    <>
      <Component {...pageProps} />
      {process.env.NODE_ENV === 'development' ? <DevSecretsToast /> : null}
      </>   
  )          
}