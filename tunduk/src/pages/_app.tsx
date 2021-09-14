import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import AuthDetailsProvider from '../context/authContext';
import '../styles/globals.css';
import { theme } from '../styles/theme';
import '@fontsource/viga';
import { useEffect } from 'react';

function SafeHydrate({ children }: any) {
  return (
    <div suppressHydrationWarning>
      {typeof window === 'undefined' ? null : children}
    </div>
  );
}

const MyApp = ({ Component, pageProps }: AppProps) => {
  // useEffect(() => {
  //   if ('serviceWorker' in navigator) {
  //     window.addEventListener('load', function () {
  //       navigator.serviceWorker.register('/sw.js').then(
  //         function (registration) {
  //           console.log(
  //             'Service Worker registration successful with scope: ',
  //             registration.scope,
  //           );
  //         },
  //         function (err) {
  //           console.log('Service Worker registration failed: ', err);
  //         },
  //       );
  //     });
  //   }
  // }, []);
  return (
    <SafeHydrate>
      <ChakraProvider resetCSS theme={theme}>
        <AuthDetailsProvider>
          <Head>
            <title>It&#39;s Doggo Time</title>
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
