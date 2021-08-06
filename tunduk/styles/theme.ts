import { extendTheme, ThemeConfig } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

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
    'shadow-and-bg': {
      boxShadow: '1px 1px 8px 2px #DDCDBF',
      bg: '#ffffff',
      '.chakra-ui-dark &': {
        bg: '#6A6A6A',
        boxShadow: '1px 1px 8px 2px #707070',
      },
    },
  },
  components: {
    Input: {
      baseStyle: {
        // borderRadius
        // size
        field: {
          bg: '#ffffff',
          color: 'gray.800',
          _placeholder: { color: '#2A2828' },
          borderColor: 'beez.700',
          borderWidth: '2px',
          borderStyle: 'solid',
          '.chakra-ui-dark &': {
            bg: 'gray.800',
            color: '#DDCDBF',
            _placeholder: { color: '#DDCDBF' },
          },
        },
      },
    },
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
