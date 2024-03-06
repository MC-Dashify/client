import commonKO from "@/locales/ko/common.json";
import commonEN from "@/locales/en/common.json";

const getNamespaces = (lang) => {
  const ns = (ko, en) => (lang === "ko" ? ko : en);

  return {
    common: ns(commonKO, commonEN),
  };
};

export default getNamespaces;
