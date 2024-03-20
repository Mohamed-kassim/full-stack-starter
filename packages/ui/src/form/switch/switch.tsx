import {
  GetProps,
  Label,
  LabelProps,
  Separator,
  Spinner,
  Stack,
  styled,
  Switch as TamaguiSwitch,
  XStack,
  XStackProps,
  YStack,
} from 'tamagui'

export const BaseSwitch = styled(TamaguiSwitch, {
  name: 'Switch',
})

// helper to get props for any TamaguiComponent
export type BaseSwitchProps = GetProps<typeof BaseSwitch>

export type SwitchProps = {
  separated?: boolean
  containerProps?: XStackProps
  isDisabled?: boolean
  isLoading?: boolean
} & (
  | { label?: never; labelProps?: never }
  | {
      label?: string
      labelProps?: LabelProps
    }
) &
  BaseSwitchProps
export const Switch = (props: SwitchProps) => {
  const { label, id, separated, containerProps, isDisabled, labelProps, isLoading, ...rest } = props
  return (
    <XStack ai="center" space="$4" jc="center" {...containerProps}>
      <YStack flex={1}>
        {Boolean(label) && (
          <Label
            // htmlFor={id}
            size={props.size || '$5'}
            h="$5"
            lineHeight="$2"
            fontWeight="600"
            pr="$0"
            {...labelProps}
          >
            {label}
          </Label>
        )}
      </YStack>
      {separated && <Separator mih={20} vertical />}

      <Stack h="100%">
        {isLoading ? (
          <Spinner />
        ) : (
          <BaseSwitch id={id} size={props.size} bg="$gray7Light" {...rest}>
            <TamaguiSwitch.Thumb animation="quick" />
          </BaseSwitch>
        )}
      </Stack>
    </XStack>
  )
}
