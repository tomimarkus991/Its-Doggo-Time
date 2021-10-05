import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import 'moment/locale/et';
import Head from 'next/head';
import '../styles/globals.css';
import { theme } from '../styles/theme';
import '@fontsource/viga';
import type {} from '@mui/lab/themeAugmentation';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';
import MomentUtils from '@date-io/moment';
import {
  UserDetailsProvider,
  GroupDetailsProvider,
  AuthDetailsProvider,
  LogsDetailsProvider,
  LogsViewProvider,
  InviteDetailsProvider,
} from '../context';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

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
  const materialTheme = createMuiTheme({
    palette: {
      primary: {
        main: '#DDCDBF',
        contrastText: '#2A2828',
      },
    },
    typography: {
      fontFamily: 'Viga',
    },
    // @ts-ignore
    overrides: {
      // @ts-ignore
      MuiPickersToolbar: {
        toolbar: {
          backgroundColor: '#DDCDBF',
        },
      },
    },
  });
  // const { showErrorToast } = useToast();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0,
        refetchOnMount: false,
        // onError: e => {
        //   const error = e as Error;
        //   console.log('error', error);

        //   showErrorToast({
        //     title: 'Error useFetchGroupData',
        //     description: error.message,
        //   });
        //   throw new Error(error.message);
        // },
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <SafeHydrate>
        <ThemeProvider theme={materialTheme}>
          <ChakraProvider resetCSS theme={theme}>
            <AuthDetailsProvider>
              <UserDetailsProvider>
                <GroupDetailsProvider>
                  <LogsDetailsProvider>
                    <LogsViewProvider>
                      <InviteDetailsProvider>
                        <MuiPickersUtilsProvider utils={MomentUtils}>
                          <Head>
                            <title>It&#39;s Doggo Time</title>
                            <meta
                              name="viewport"
                              content="initial-scale=1, width=device-width"
                            />
                          </Head>
                          <Component {...pageProps} />
                        </MuiPickersUtilsProvider>
                      </InviteDetailsProvider>
                    </LogsViewProvider>
                  </LogsDetailsProvider>
                </GroupDetailsProvider>
              </UserDetailsProvider>
            </AuthDetailsProvider>
          </ChakraProvider>
        </ThemeProvider>
      </SafeHydrate>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
export default MyApp;
