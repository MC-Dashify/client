import { useEffect, useState } from "react";
import { JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "styled-components";
import I18nProvider from "next-translate/I18nProvider";

import "@/styles/dist/tailwindOutput.css";
import { getDarkTheme, getLightTheme, pointcolorDict } from "@/styles/themes";
import { LanguageWrapper } from "@/components/wrappers/LanguageWrapper";
import GlobalStyle from "@/components/styles/GlobalStyle";
import { usePointColor, useTheme } from "@/hooks/useLocalStorage";
import commonKO from "@/locales/ko/common.json";
import commonEN from "@/locales/en/common.json";
import { i18nConfig } from "@/../i18n";

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
  const [pointColor, setPointColor] = usePointColor();
  const [theme, setTheme] = useState("light");

  const lang = i18nConfig.locales.includes(router.query.locale)
    ? router.query.locale
    : i18nConfig.defaultLocale;

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

  useEffect(() => {
    // nextui 테마 적용을 위해 html 태그에 data-theme 속성을 추가합니다.
    // 문서상으로 <main> 태그에 className을 적용하면 되지만 어째서인지 작동하지 않네요.
    const html = document.querySelector("html");

    html.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <I18nProvider
      lang={lang}
      namespaces={{ common: lang === "ko" ? commonKO : commonEN }}
    >
      <LanguageWrapper>
        <NextUIProvider>
          <style jsx global>{`
            :root {
              --pretendard-font: ${pretendardFont.style.fontFamily};
              --jetbrains-mono-font: ${jetBrainsMonoFont.style.fontFamily};
            }
          `}</style>

          <ThemeProvider
            theme={
              theme === "dark"
                ? getDarkTheme(pointcolorDict[pointColor])
                : getLightTheme(pointcolorDict[pointColor])
            }
          >
            <GlobalStyle />

            {getLayout(<Component {...pageProps} key={router.asPath} />)}
          </ThemeProvider>
        </NextUIProvider>
      </LanguageWrapper>
    </I18nProvider>
  );
}
