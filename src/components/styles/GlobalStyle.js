import { createGlobalStyle } from "styled-components";

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
  }

  html,
  body,
  #root {
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
  }

  a {
    text-decoration: none;

    &:visited {
      color: inherit;
    }
  }
`;

export default GlobalStyle;
