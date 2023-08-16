import { ThemeProvider } from "styled-components";
import { AnimatePresence } from "framer-motion";

import GlobalStyle from "@/components/styles/GlobalStyle";
import { dark as darkTheme, light as lightTheme } from "@/styles/themes";
import "@/styles/font-settings.css";

export default function App({ Component, pageProps, router }) {
  /** getLayout은 페이지에서 반환되는 함수입니다(`./dashboard/overview.js` 등 참고).
   * getLayout으로 반환되는 내용은 페이지를 전환해도 바뀌지 않기 하기 위해 사용합니다.
   */
  const getLayout = Component.getLayout || ((page) => page);

  const selectedTheme = "white"; // TODO
  let theme;

  switch (selectedTheme) {
    case "dark":
      theme = darkTheme;
      break;

    case "light":
    default:
      theme = lightTheme;
      break;
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />

      <AnimatePresence mode="wait" initial={false}>
        {getLayout(<Component {...pageProps} key={router.asPath} />)}
      </AnimatePresence>
    </ThemeProvider>
  );
}
