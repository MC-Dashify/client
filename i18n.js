/** @type {import('next-translate').I18nConfig} */
export const i18nConfig = {
  locales: ["ko", "en"],
  defaultLocale: "ko",
  loader: false,
  pages: {
    "*": ["common"],
  },
  defaultNS: "common",
  loadLocaleFrom: (lang, ns) =>
    import(`@/locales/${lang}/${ns}.json`).then((m) => m.default),
};
