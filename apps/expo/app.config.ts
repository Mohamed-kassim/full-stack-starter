import { ExpoConfig, ConfigContext } from 'expo/config'
type AppVariants = 'production' | 'preview' | 'dev-preview' | 'development' | 'debug'
type VariantData = {
  name: string
  bundleIdentifier: string
  package: string
}
const variants: Record<AppVariants, VariantData> = {
  production: {
    name: 'YourAppName',
    bundleIdentifier: 'com.yourprojectsname.app',
    package: 'com.yourprojectsname.app',
  },
  preview: {
    name: 'YourAppName(preview)',
    bundleIdentifier: 'com.yourprojectsname.preview',
    package: 'com.yourprojectsname.preview',
  },
  'dev-preview': {
    name: 'YourAppName(dev-preview)',
    bundleIdentifier: 'com.yourprojectsname.devpreview',
    package: 'com.yourprojectsname.devpreview',
  },
  development: {
    name: 'YourAppName(dev)',
    bundleIdentifier: 'com.yourprojectsname.dev',
    package: 'com.yourprojectsname.dev',
  },
  debug: {
    name: 'YourAppName(debug)',
    bundleIdentifier: 'com.yourprojectsname.debug',
    package: 'com.yourprojectsname.debug',
  },
}

const APP_ENV = process.env.EXPO_PUBLIC_APP_ENV || ('development' as AppVariants)

const APP_VARIANT = variants[APP_ENV]

const name = APP_VARIANT.name

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name,
  scheme: APP_VARIANT.scheme,
  ios: {
    supportsTablet: true,
    bundleIdentifier: APP_VARIANT.bundleIdentifier,
  },
  android: {
    package: APP_VARIANT.package,
  },
})
