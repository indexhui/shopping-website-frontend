import { extendTheme } from '@chakra-ui/react';
import colors from './colors';
import Button from './components/button';

const customTheme = {
  initialColorMode: 'light',
  useSystemColorMode: false,
  fonts: {
    heading: "'Montserrat', Sans-serif",
    body: "'Montserrat', Sans-serif",
  },
  styles: {
    global: {
      body: {
        bg: 'white',
      },
    },
  },
  colors,
  // colors: {
  //   ...colors,
  //   brand: {
  //     500: '#3DB9FF',
  //     600: '#186DD1',
  //     700: '#0A2C54',
  //   },
  //   grass: '#61CE70',
  // },
  components: {
    Button,
  },
};

const theme = extendTheme(customTheme);

export default theme;
