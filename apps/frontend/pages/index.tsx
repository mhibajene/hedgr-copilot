// apps/frontend/pages/index.tsx
import { Banner, DarkModeToggle } from '@hedgr/ui'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900">
      <DarkModeToggle />
      <Banner>
        <h1 className="text-4xl font-bold dark:text-gray-100">
          Hello Hedgr
        </h1>
      </Banner>
    </main>
  )
}