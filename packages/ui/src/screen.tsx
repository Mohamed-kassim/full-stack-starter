import { ExtendedEdge, useSafeAreaInsetsStyle } from './utils/use-safe-area-insets-style'
import { StatusBar, StatusBarProps } from 'expo-status-bar'
import { PropsWithChildren, ReactElement } from 'react'
import { GetProps, YStack, YStackProps } from 'tamagui'

import { KeyboardAwareScrollView, KeyboardAwareScrollViewProps } from './keyboard-aware-scroll-view'
import { Loader, LoaderProps } from './loader'

interface BaseProps {
  /**
   * Status bar setting. Defaults to dark.
   */
  statusBarStyle?: 'light' | 'dark'
  /**
   * Pass any additional props directly to the StatusBar component.
   */
  StatusBarProps?: StatusBarProps
  /**
   * Override the default edges for the safe area.
   */
  safeAreaEdges?: ExtendedEdge[]
  /**
   * Screen Footer Component, useful in preset scroll.
   */
  footer?: ReactElement
  footerProps?: YStackProps
  isLoading?: boolean
  loaderProps?: LoaderProps
}
type FixedViewProps = { preset: 'fixed' } & YStackProps
type ScrollViewProps = { preset: 'scroll' } & KeyboardAwareScrollViewProps
type Props = BaseProps & (FixedViewProps | ScrollViewProps)
export const Screen = (props: PropsWithChildren<Props>) => {
  const {
    preset = 'fixed',
    children,
    statusBarStyle = 'dark',
    StatusBarProps,
    safeAreaEdges,
    footer,
    footerProps = {},
    bg,
    isLoading = false,
    loaderProps,
    ...rest
  } = props
  const isScrollable = preset === 'scroll'
  const Container = isScrollable ? KeyboardAwareScrollView : YStack
  const containerInsets = useSafeAreaInsetsStyle(safeAreaEdges)
  return (
    <>
      <YStack flex={1} bg={bg ? bg : '$background'} {...containerInsets}>
        <Container flex={1} px="$4" pb="$3" {...rest}>
          <StatusBar style={statusBarStyle} {...StatusBarProps} />
          {children}
        </Container>
        {footer && (
          <YStack px="$4" py="$3" {...footerProps}>
            {footer}
          </YStack>
        )}
      </YStack>
      {isLoading && <Loader {...loaderProps} />}
    </>
  )
}
export type ScreenProps = GetProps<typeof Screen>
