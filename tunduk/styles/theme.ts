import { extendTheme } from '@chakra-ui/react';

const colors = {
  beez: {
    100: '#FBF0E5',
    500: '#E5E0D5',
    800: '#2A2828',
    900: '#DDCDBF',
  },
  gray: {
    800: '#2A2828',
  },
};
export const theme = extendTheme({ colors });
