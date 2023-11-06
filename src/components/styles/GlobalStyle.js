import { createGlobalStyle, css } from "styled-components";

// https://github.com/prettier/prettier/issues/11196#issuecomment-951878725
const styled = { createGlobalStyle };

const GlobalStyle = styled.createGlobalStyle`
  * {
    box-sizing: border-box;
    font-family: ${({ theme }) => theme.font.default};
    line-height: 1.2;
    letter-spacing: -0.014em;
    font-feature-settings: "calt", "case", "ss06", "ss01", "ss03", "ss07",
      "ss02", "ss08";
    font-weight: 500;
  }

  html,
  body,
  #__next,
  #__next > div:first-child {
    height: 100%;
  }

  html,
  body {
    margin: 0;
    padding: 0;
  }

  body {
    background-color: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.text};

    ${({ theme }) =>
      theme.THEME_NAME === "dark" &&
      css`
        color-scheme: dark;
      `};
  }

  a {
    text-decoration: none;
    color: inherit;

    &:visited {
      color: inherit;
    }
  }

  input,
  button {
    color: inherit;
  }
`;

export default GlobalStyle;