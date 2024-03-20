import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Updates from "expo-updates";

import languageDetector, { swapLayoutDirection } from "./language-detector";
import { resources } from "./translations";

// eslint-disable-next-line @typescript-eslint/no-floating-promises
i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    compatibilityJSON: "v3",
  });
i18n.on("languageChanged", (language) => {
  swapLayoutDirection(language);
  Updates.reloadAsync();
});

export default i18n;
