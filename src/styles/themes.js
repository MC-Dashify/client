/* eslint-disable no-unused-vars */

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

/* eslint-enable no-unused-vars */

const commonTheme = {
  font: {
    default: `'Pretendard Variable', 'Pretendard', 'Pretendard JP Variable', 'Pretendard JP', -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif`,
    mono: 'JetBrains Mono, monospace'
  }
};

const primary = blue;

const dark = {
  ...commonTheme,
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
    separator: grey[800],
    container: {
      bg: grey[800]
    }
  },

  input: {
    bg: grey[900],
    focusOutline: primary[500],
    selectBg: blue[700],
    selectHoverBg: blue[800],
    selectText: blue[50],
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
      activeBg: grey[900],
      shadow: {
        normal: `0 0 8px 0 rgba(255, 255, 255, 0.3), 0 0 12px 0 rgba(255, 255, 255, 0.3) inset`,
        hover: `0 0 18px 0 rgba(255, 255, 255, 0.4)`
      }
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
    bg: grey[900],
    grid: grey[800]
  },

  warning: {
    bg: common.black,
    top: red[300]
  },

  traffic: {
    hoverBg: grey[900]
  }
};

const light = {
  ...commonTheme,
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
    separator: grey[400],
    container: {
      bg: grey[50]
    }
  },

  input: {
    bg: grey[100],
    focusOutline: primary[500],
    selectBg: blue[400],
    selectHoverBg: blue[500],
    selectText: common.white,
    hoverBg: grey[300]
  },

  divider: {
    primary: grey[200]
  },

  button: {
    unset: {
      bg: 'transparent',
      text: common.black,
      hoverBg: grey[200], // TODO: hoverBg, activeBg
      activeBg: grey[300]
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
      hoverBg: grey[200],
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
      activeBg: grey[50],
      shadow: {
        normal: `0 0 8px 0 rgba(0, 0, 0, 0.10), 0 0 12px 0 rgba(0, 0, 0, 0.20) inset`,
        hover: `0 0 14px 0 rgba(0, 0, 0, 0.20)`
      }
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
    bg: common.white,
    grid: grey[200]
  },

  warning: {
    bg: red[50],
    top: red[900]
  },

  traffic: {
    hoverBg: grey[100]
  }
};

export { commonTheme, dark, light };
