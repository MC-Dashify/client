import {
  red,
  pink,
  purple,
  deepPurple,
  indigo,
  blue,
  lightBlue,
  cyan,
  teal,
  green,
  lightGreen,
  lime,
  yellow,
  amber,
  orange,
  deepOrange,
  brown,
  grey,
  blueGrey,
  common
} from '@mui/material/colors';

const primary = blue;

const dark = {
  bg: common.black,
  text: grey[300],

  textinput: {
    bg: grey[900],
    focusOutline: primary[500]
  },

  divider: {
    primary: grey[900]
  },

  button: {
    unset: {
      bg: 'transparent',
      text: grey[300],
      hoverBg: grey[900],
      activeBg: grey[800]
    },

    primary: {
      bg: primary[700],
      text: grey[300]
      // TODO hoverBg, activeBg
    },

    secondary: {
      bg: grey[700],
      text: grey[300]
      // TODO hoverBg, activeBg
    },

    tertiary: {
      bg: grey[900],
      text: grey[300],
      hoverBg: grey[800],
      activeBg: grey[700]
    }
  }
};

const light = {
  background: common.white,
  sidebarBackground: '#fafafa',
  profileBackground: '#d7f4ff',

  textBoxBackground: '#f5f5f5',
  textColor: '#000000',

  buttonPrimary: '#1976d2'
};

export { dark, light };
