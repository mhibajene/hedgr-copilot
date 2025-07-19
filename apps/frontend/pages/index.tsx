import { Banner, DarkModeToggle } from '@hedgr/ui';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900">
      <DarkModeToggle />
      <Banner>
        <h1 className="text-4xl font-bold">Hello Hedgr</h1>
        <div className="mt-4 p-4 bg-gray-200 dark:bg-gray-800">
          Test Dark Mode
        </div>
      </Banner>
    </main>
  );
}