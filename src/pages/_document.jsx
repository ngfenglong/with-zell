import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/images/displaypic-apple-touch-icon.png" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <body className="bg-white text-zinc-900 antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
