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

  components: {
    Button,
  },
};

const theme = extendTheme(customTheme);

export default theme;
