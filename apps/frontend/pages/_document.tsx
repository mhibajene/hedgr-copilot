import Document, { Html, Head, Main, NextScript } from 'next/document'

const ThemeScript = () => (
  <script
    dangerouslySetInnerHTML={{
      __html: `
(function() {
  try {
    var saved = localStorage.getItem('theme');
    var preferDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if ((saved === 'dark') || (!saved && preferDark)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch (e) {}
})();
`,
    }}
  />
)

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <ThemeScript />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}