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

    link: blue[700],

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

  input: {
    bg: grey[900],
    focusOutline: primary[500],
    selectBg: blue[700],
    hoverBg: grey[800]
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
      text: common.white,
      hoverBg: primary[800],
      activeBg: primary[900]
    },

    secondary: {
      bg: grey[700],
      text: grey[300],
      hoverBg: grey[800],
      activeBg: grey[900]
    },

    tertiary: {
      bg: grey[900],
      text: grey[300],
      hoverBg: grey[800],
      activeBg: grey[700]
    },

    outline: {
      bg: common.black,
      text: grey[300],
      border: grey[300],
      hoverBg: common.black,
      activeBg: grey[900]
    },

    disabled: {
      bg: grey[800],
      text: common.white
    },

    danger: {
      bg: red[900],
      text: red[50],
      hoverBg: red[700],
      activeBg: red[600]
    }
  },

  overview: {
    red: red[300],
    yellow: orange[300],
    green: green[500],
    blue: blue[600],
    gray: grey[800]
  },

  chart: {
    bg: grey[900]
  },

  warning: {
    bg: common.black,
    top: red[300]
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

    link: blue[300],

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

  input: {
    bg: grey[100],
    focusOutline: primary[500],
    selectBg: blue[500],
    hoverBg: grey[300]
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
      text: common.white,
      hoverBg: primary[500],
      activeBg: primary[600]
    },

    secondary: {
      bg: blue[50],
      text: blue[900],
      hoverBg: blue[100],
      activeBg: blue[200]
    },

    tertiary: {
      bg: grey[100],
      text: common.black,
      hoverBg: grey[200], // TODO: hoverBg, activeBg
      activeBg: grey[300]
    },

    disabled: {
      bg: grey[400],
      text: common.white
    },

    outline: {
      bg: common.white,
      text: common.black,
      border: common.black,
      hoverBg: common.white,
      activeBg: grey[50]
    },

    danger: {
      bg: red[50],
      text: red[900],
      hoverBg: red[100],
      activeBg: red[200]
    }
  },

  overview: {
    red: red[300],
    yellow: orange[300],
    green: green[400],
    blue: blue[500],
    gray: grey[500]
  },

  chart: {
    bg: common.white
  },

  warning: {
    bg: red[50],
    top: red[900]
  }
};

export { dark, light };
