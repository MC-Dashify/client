import { ThemeProvider } from "styled-components";
import GlobalStyle from "@/components/styles/GlobalStyle";
import { dark as darkTheme, light as lightTheme } from "@/styles/themes";

export default function App({ Component, pageProps }) {
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
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
