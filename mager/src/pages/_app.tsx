import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import AuthDetailsProvider from '../context/authContext';
import '../styles/globals.css';
import { theme } from '../styles/theme';
import '@fontsource/viga';
import type {} from '@mui/lab/themeAugmentation';
// import { ThemeProvider } from '@material-ui/styles';
import { createTheme, ThemeProvider } from '@mui/material';
// import { useEffect } from 'react';

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
  const materialTheme = createTheme({
    palette: {
      primary: {
        main: '#DDCDBF',
        contrastText: '#2A2828',
      },
    },
    // overrides: {
    //   MuiPickersToolbar: {
    //     toolbar: {
    //       backgroundColor: '#DDCDBF',
    //     },
    //   },
    // },
  });
  return (
    <SafeHydrate>
      <ThemeProvider theme={materialTheme}>
        <ChakraProvider resetCSS theme={theme}>
          <AuthDetailsProvider>
            <Head>
              <title>It&#39;s Doggo Time</title>
              <meta
                name="viewport"
                content="initial-scale=1, width=device-width"
              />
            </Head>
            <Component {...pageProps} />
          </AuthDetailsProvider>
        </ChakraProvider>
      </ThemeProvider>
    </SafeHydrate>
  );
};
export default MyApp;
