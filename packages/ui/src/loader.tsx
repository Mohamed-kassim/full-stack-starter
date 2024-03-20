import { H4, Spinner, YStack } from 'tamagui'

export type LoaderProps = {
  text?: string
}

export const Loader = (props: LoaderProps) => {
  const { text } = props
  return (
    <YStack
      position="absolute"
      fullscreen
      justifyContent="center"
      alignItems="center"
      space="$2"
      flex={1}
      top={0}
      bottom={0}
      right={0}
      left={0}
      height="100%"
      width="100%"
      backgroundColor="rgba(0,0,0,.7)"
    >
      {text && (
        <H4 textAlign="center" color="white">
          {text}
        </H4>
      )}
      <Spinner size="large" />
    </YStack>
  )
}
