import { KeyboardProvider } from 'react-native-keyboard-controller'
import { PropsWithChildren } from 'react'
export function UIProvider({ children }: PropsWithChildren) {
  return <KeyboardProvider>{children}</KeyboardProvider>
}
