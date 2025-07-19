export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${inter.className} min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300`}>
      <Component {...pageProps} />
    </div>
  )
}