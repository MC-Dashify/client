"use client";

import { usePathname } from "next/navigation";
import { ThemeProvider } from "styled-components";

import GlobalStyle from "@/components/styles/GlobalStyle";
import { dark as darkTheme, light as lightTheme } from "@/styles/themes";
import "@/styles/font-settings.css";

export default function RootLayout({ children }) {
  const pathname = usePathname();

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

  children.key = pathname;

  console.log(children);

  return (
    <html lang="ko">
      {/* XXX 언어 변경 시 lang 어트리뷰트 수정 */}{" "}
      <body>
        <ThemeProvider theme={theme}>
          <GlobalStyle />

          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
