import { extendTheme, ThemeConfig } from '@chakra-ui/react';
import { createBreakpoints, mode } from '@chakra-ui/theme-tools';

const colors = {
  beez: {
    100: '#FBF0E5',
    500: '#E5E0D5',
    700: '#DDCDBF',
    900: '#AD9480',
  },
  gray: {
    800: '#2A2828',
  },
};

const breakpoints = createBreakpoints({
  sm: '30em',
  sm2: '39em',
  md: '48em',
  lg: '62em',
  '2lg': '74em',
  xl: '80em',
  '2xl': '90em',
});

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

export const theme = extendTheme({
  config,
  colors,
  breakpoints,
  fonts: {
    heading: 'Viga',
    body: 'Viga',
  },
  layerStyles: {
    shadowAndBgColor: {
      boxShadow: mode(
        '1px 1px 8px 2px #DDCDBF',
        '1px 1px 8px 2px #707070',
      ),
      bg: mode('#ffffff', '#6A6A6A'),
    },
  },
  components: {
    Avatar: {
      sizes: {
        xl: {
          container: {
            width: '3em',
            height: '3em',
          },
        },
        '3xl': {
          container: {
            width: '9em',
            height: '9em',
          },
        },
      },
    },
    Button: {
      baseStyle: {
        _focus: {
          boxShadow: 'none',
        },
        _active: {
          bg: '#FBF0E5',
          bgColor: '#FBF0E5',
          borderColor: '#FBF0E5',
        },
      },
    },
  },
});
