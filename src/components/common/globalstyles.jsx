import { createGlobalStyle } from 'styled-components';

// https://github.com/prettier/prettier/issues/11196#issuecomment-951878725
const styled = { createGlobalStyle };

const GlobalStyle = styled.createGlobalStyle`
  * {
    box-sizing: border-box;
    font-family: 'Pretendard Variable', 'Pretendard', 'Pretendard JP Variable',
      'Pretendard JP', -apple-system, BlinkMacSystemFont, system-ui, Roboto,
      'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR',
      'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
      sans-serif;
    line-height: 1.2;
    letter-spacing: -0.014em;
    font-feature-settings: 'calt', 'case', 'ss06', 'ss01', 'ss03', 'ss07',
      'ss02', 'ss08';
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
`;

export default GlobalStyle;
