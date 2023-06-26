import { createGlobalStyle } from 'styled-components';

// https://github.com/prettier/prettier/issues/11196#issuecomment-951878725
const styled = { createGlobalStyle };

const defaultFontFamily = `'Pretendard Variable', 'Pretendard', 'Pretendard JP Variable', 'Pretendard JP', -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif`;

const GlobalStyle = styled.createGlobalStyle`
  * {
    box-sizing: border-box;
    font-family: ${defaultFontFamily};
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

  .swal2-html-container {
    margin: 0.5em 1.6em;
    user-select: none;
  }

  .swal2-modal {
    border-radius: 16px;
  }

  .swal2-html-container hr {
    border: none;
    background: rgba(0, 0, 0, 0.2);
    height: 1px;
  }

  .swal2-actions {
    margin: 0 auto;
  }

  .swal2-shown > [aria-hidden='true'] {
    transition: 0.1s filter;
    filter: blur(10px);
  }

  body.swal2-height-auto {
    height: 100% !important;
  }
`;

export default GlobalStyle;
export { defaultFontFamily };
