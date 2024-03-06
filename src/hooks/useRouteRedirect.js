import { useRouter } from "next/router";
import { i18nConfig } from "@/../i18n";
import { languageDetector } from "@/lib/languageDetector";

/** 현재 언어에 맞는 페이지로 리다이렉트하는 훅입니다. */
export const useRouteRedirect = () => {
  const router = useRouter();

  /** 현재 언어에 맞는 페이지로 리다이렉트합니다. */
  const redirect = (to, replace) => {
    const detectedLanguage = i18nConfig.locales.includes(router.query.locale)
      ? router.query.locale
      : languageDetector.detect();

    if (to.startsWith("/" + detectedLanguage) && router.route === "/404") {
      router.replace("/" + detectedLanguage + router.route);
      return;
    }

    if (detectedLanguage && languageDetector.cache) {
      languageDetector.cache(detectedLanguage);
    }

    if (replace) {
      router.replace("/" + detectedLanguage + to);
    } else {
      router.push("/" + detectedLanguage + to);
    }
  };

  return { redirect };
};
