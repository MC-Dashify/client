import { useEffect, useState } from "react";
import { JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "styled-components";

import "@/styles/dist/tailwindOutput.css";
import GlobalStyle from "@/components/styles/GlobalStyle";
import { dark as darkTheme, light as lightTheme } from "@/styles/themes";
import { useTheme } from "@/hooks/useLocalStorage";

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
  const [selectedTheme, setSelectedTheme] = useTheme();
  const [theme, setTheme] = useState("light");

  /** getLayout은 페이지에서 반환되는 함수입니다(`./dashboard/overview.js` 등 참고).
   * getLayout으로 반환되는 내용은 페이지를 전환해도 바뀌지 않습니다. */
  const getLayout = Component.getLayout || ((page) => page);

  useEffect(() => {
    const isDarkThemeUsed =
      selectedTheme === "dark" ||
      (selectedTheme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    setTheme(isDarkThemeUsed ? "dark" : "light");
  }, [selectedTheme]);

  return (
    <NextUIProvider>
      <style jsx global>{`
        :root {
          --pretendard-font: ${pretendardFont.style.fontFamily};
          --jetbrains-mono-font: ${jetBrainsMonoFont.style.fontFamily};
        }
      `}</style>

      <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
        <GlobalStyle />

        {getLayout(<Component {...pageProps} key={router.asPath} />)}
      </ThemeProvider>
    </NextUIProvider>
  );
}
