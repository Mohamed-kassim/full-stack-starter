import Storage from '.'
export const STORAGE_LANGUAGE_KEY = 'LANGUAGE'
export const setStorageLanguage = (value: string): void => {
  Storage.set(STORAGE_LANGUAGE_KEY, value)
}

export const getStorageLanguage = (): string | undefined => Storage.getString(STORAGE_LANGUAGE_KEY)
