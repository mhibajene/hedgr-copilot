import Head from 'next/head'
import { DarkModeToggle, Banner } from '@hedgr/ui'

export default function Home() {
  return (
    <>
      <Head><title>Hedgr</title></Head>
      <main className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
        <div className="mx-auto max-w-2xl p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Hello Hedgr</h1>
            <DarkModeToggle />
          </div>
          <Banner />
          <p className="text-sm opacity-70">
            Toggle should flip background & text between light and dark.
          </p>
        </div>
      </main>
    </>
  )
}