import { extendTheme, ThemeConfig } from '@chakra-ui/react';
const colors = {
  beez: {
    100: '#FBF0E5',
    500: '#E5E0D5',
    900: '#DDCDBF',
  },
  gray: {
    800: '#2A2828',
  },
};

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

export const theme = extendTheme({
  config,
  colors,
  fonts: {
    heading: 'Viga',
    body: 'Viga',
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
          bg: '#E5E0D5',
          bgColor: '#E5E0D5',
          borderColor: '#E5E0D5',
        },
      },
    },
  },
});
