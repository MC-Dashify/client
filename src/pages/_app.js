import { NextUIProvider } from "@nextui-org/react";
import { JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import { ThemeProvider } from "styled-components";

import "@/styles/dist/tailwindOutput.css";
import GlobalStyle from "@/components/styles/GlobalStyle";
import { dark as darkTheme, light as lightTheme } from "@/styles/themes";

const pretendardFont = localFont({
  src: "../styles/font/PretendardVariable.ttf",
  display: "swap",
});

const jetBrainsMonoFont = JetBrains_Mono({
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
    <NextUIProvider>
      <style jsx global>{`
        :root {
          --pretendard-font: ${pretendardFont.style.fontFamily};
          --jetbrains-mono-font: ${jetBrainsMonoFont.style.fontFamily};
        }
      `}</style>

      <ThemeProvider theme={theme}>
        <GlobalStyle />

        {getLayout(<Component {...pageProps} key={router.asPath} />)}
      </ThemeProvider>
    </NextUIProvider>
  );
}
