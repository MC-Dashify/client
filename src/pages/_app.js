import { ThemeProvider } from "styled-components";
import { JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";

import GlobalStyle from "@/components/styles/GlobalStyle";
import { dark as darkTheme, light as lightTheme } from "@/styles/themes";

const pretendardFont = localFont({
  src: "../styles/font/PretendardVariable.ttf",
  variable: "--pretendard-font",
  display: "swap",
});

const jetBrainsMonoFont = JetBrains_Mono({
  variable: "--jetbrains-mono-font",
  subsets: [
    "latin",
    "latin-ext",
    "cyrillic",
    "cyrillic-ext",
    "greek",
    "vietnamese",
  ],
  display: "swap",
});

export default function RootLayout({ Component, pageProps, router }) {
  /** getLayout은 페이지에서 반환되는 함수입니다(`./dashboard/overview.js` 등 참고).
   * getLayout으로 반환되는 내용은 페이지를 전환해도 바뀌지 않기 하기 위해 사용합니다.
   */
  const getLayout = Component.getLayout || ((page) => page);

  const selectedTheme = "white"; // TODO 테마 선택 기능 추가
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
    <div
      className={`${pretendardFont.variable} ${jetBrainsMonoFont.variable}`}
      id="font-provider"
    >
      <ThemeProvider theme={theme}>
        <GlobalStyle />

        {getLayout(<Component {...pageProps} key={router.asPath} />)}
      </ThemeProvider>
    </div>
  );
}
