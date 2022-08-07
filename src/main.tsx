import { ChakraProvider } from "@chakra-ui/react";

import MomentUtils from "@date-io/moment";
import "@fontsource/viga";
import { createTheme } from "@material-ui/core";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { ThemeProvider } from "@material-ui/styles";
import type {} from "@mui/lab/themeAugmentation";
import "moment/locale/et";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import {
  AuthDetailsProvider,
  LogsDetailsProvider,
  LogsViewProvider,
  SidebarProvider,
} from "context";

import { Router } from "routes";
import { theme } from "styles";
import "styles/index.css";

const root = createRoot(document.getElementById("root") as HTMLElement);

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

const materialTheme = createTheme({
  palette: {
    primary: {
      main: "#DDCDBF",
      contrastText: "#2A2828",
    },
  },
  typography: {
    fontFamily: "Viga",
  },
  // @ts-ignore
  overrides: {
    // @ts-ignore
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: "#DDCDBF",
      },
    },
  },
});

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={materialTheme}>
        <ChakraProvider resetCSS theme={theme}>
          <AuthDetailsProvider>
            <LogsDetailsProvider>
              <LogsViewProvider>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                  <SidebarProvider>
                    <Router />
                  </SidebarProvider>
                </MuiPickersUtilsProvider>
              </LogsViewProvider>
            </LogsDetailsProvider>
          </AuthDetailsProvider>
        </ChakraProvider>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
);
