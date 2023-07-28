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
import { css } from 'styled-components';

const primary = blue;

const dark = {
  bg: common.black,
  text: grey[300],

  aside: {
    bg: grey[900],

    logo: {
      bg: 'white',
      fg: 'black',
      text: 'white'
    },

    link: css`
      background: linear-gradient(135deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.00) 100%), #1976D2;
    `,

    profile: {
      bg: grey[800],
      icon: grey[50],
      text: grey[300],
      address: grey[500]
    }
  },

  modal: {
    bg: grey[900],
    text: grey[300],
    separator: grey[300],
    container: {
      bg: grey[800],
    }
  },

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
  bg: common.white,
  text: common.black,

  aside: {
    bg: grey[50],

    logo: {
      bg: 'black',
      fg: 'white',
      text: 'black'
    },

    link: css`
      background: linear-gradient(135deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.00) 100%), #64B5F6;
    `,

    profile: {
      bg: primary[50],
      text: common.black,
      icon: primary[900],
      address: primary[300]
    }
  },

  modal: {
    bg: common.white,
    text: common.black,
    separator: common.black,
    container: {
      bg: grey[50],
    }
  },

  textinput: {
    bg: grey[100],
    focusOutline: primary[500]
  },

  divider: {
    primary: grey[900]
  },

  button: {
    unset: {
      bg: 'transparent',
      text: common.black,
      hoverBg: grey[900], // TODO: hoverBg, activeBg
      activeBg: grey[800]
    },

    primary: {
      bg: primary[400],
      text: common.white
      // TODO: hoverBg, activeBg
    },

    secondary: {
      bg: grey[700],
      text: common.white
      // TODO: hoverBg, activeBg
    },

    tertiary: {
      bg: grey[100],
      text: common.black,
      hoverBg: grey[400], // TODO: hoverBg, activeBg
      activeBg: grey[700]
    }
  }
};

export { dark, light };
