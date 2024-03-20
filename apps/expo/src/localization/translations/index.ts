import ar from './ar'
import en from './en'

export const resources = {
  en: {
    translation: en,
  },
  ar: {
    translation: ar,
  },
} as const
export const supportedLanguages = Object.keys(resources)

export type Language = (typeof supportedLanguages)[number]
interface ILanguageOption {
  nativeName: string
  flag: string
}
interface ILanguageOptions {
  [key: Language]: ILanguageOption
}
export const languagesOptions: ILanguageOptions = {
  en: {
    nativeName: 'English',
    flag: '🇺🇲',
  },
  ar: {
    nativeName: 'العربية',
    flag: '🇦🇪',
  },
}
