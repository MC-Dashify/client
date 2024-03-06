import useTranslation from "next-translate/useTranslation";
import { i18nConfig } from "@/../i18n";

export const useI18n = ({ namespace } = {}) => {
  const { t, lang } = useTranslation(
    namespace ? namespace : i18nConfig.defaultNS
  );

  return { t, lang };
};
