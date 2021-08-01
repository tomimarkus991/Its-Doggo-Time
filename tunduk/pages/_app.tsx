import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import AuthDetailsProvider from '../context/authContext';
import '../styles/globals.css';
import { theme } from '../styles/theme';
import '@fontsource/viga';

function SafeHydrate({ children }: any) {
  return (
    <div suppressHydrationWarning>
      {typeof window === 'undefined' ? null : children}
    </div>
  );
}

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <SafeHydrate>
      <ChakraProvider resetCSS theme={theme}>
        <AuthDetailsProvider>
          <Head>
            <title>It&#39;s Doggo Time</title>
            {/* <link rel="shortcut icon" href="/favicon.ico" /> */}
            <link rel="shortcut icon" href="/images/favicon.ico" />
            <meta
              name="viewport"
              content="initial-scale=1.0, width=device-width"
            />
          </Head>
          <Component {...pageProps} />
        </AuthDetailsProvider>
      </ChakraProvider>
    </SafeHydrate>
  );
};
export default MyApp;
