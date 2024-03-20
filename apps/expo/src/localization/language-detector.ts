import {
  getStorageLanguage,
  setStorageLanguage,
} from "@services/storage/language";
import i18next, { LanguageDetectorModule } from "i18next";
import { I18nManager } from "react-native";
import * as Localization from "expo-localization";
import { supportedLanguages } from "./translations";

export const swapLayoutDirection = (language: string): boolean => {
  const direction = i18next.dir(language);
  const isRTL = direction === "rtl";
  I18nManager.allowRTL(isRTL);
  I18nManager.forceRTL(isRTL);
  I18nManager.swapLeftAndRightInRTL(isRTL);
  return isRTL;
};

const languageDetector: LanguageDetectorModule = {
  type: "languageDetector",
  init: (): void => {},
  detect: (): string => {
    const language = getStorageLanguage();
    let pickedLanguage = language || "en";
    if (!language) {
      pickedLanguage = Localization.locale.split("-")[0] || "en";
    }
    swapLayoutDirection(pickedLanguage);
    return pickedLanguage;
  },
  cacheUserLanguage: (language: string) => {
    setStorageLanguage(language);
  },
};
export default languageDetector;
