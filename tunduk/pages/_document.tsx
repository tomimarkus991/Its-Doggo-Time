import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/icon.png"></link>
          <link rel="shortcut icon" href="/images/favicon.ico" />
          <meta name="theme-color" content="#FBF0E5" />
        </Head>
        {/* <link rel="shortcut icon" href="/favicon.ico" /> */}
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
