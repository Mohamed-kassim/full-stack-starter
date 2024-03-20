import { getSize } from '@tamagui/get-token'
import { Check } from '@tamagui/lucide-icons'
import type { IconProps } from '@tamagui/helpers-icon'
import { isValidElement, useState } from 'react'
import {
  AnimatePresence,
  GetProps,
  getVariableValue,
  SizeTokens,
  Stack,
  styled,
  XStack,
  XStackProps,
  YStack,
} from 'tamagui'
import { Label } from '../label'
import { FormError } from '../form-error'
import { FromElementLabel } from '../types'

const getSwitchSize = (val: SizeTokens) => Math.round(getVariableValue(getSize(val)) * 0.65)

const CheckBoxFrame = styled(Stack, {
  name: 'CheckBox',
  borderRadius: '$2',
  backgroundColor: '$gray7Light',
  borderWidth: 0,
  justifyContent: 'center',
  alignItems: 'center',
  variants: {
    size: {
      '...size': (val) => {
        const height = getSwitchSize(val) + 4
        const width = getSwitchSize(val) + 4
        return {
          height,
          minHeight: height,
          width,
        }
      },
    },
  } as const,

  defaultVariants: {
    size: '$4',
  },
})

export type CheckBoxFrameProps = GetProps<typeof CheckBoxFrame>

type CheckIconProps = { checked?: boolean } & IconProps
const CheckIcon = ({ checked }: { checked?: boolean }) => {
  return (
    <AnimatePresence>
      {checked && (
        <Stack
          key="CHECK_ICON"
          animation="quick"
          exitStyle={{ opacity: 0, scale: 0.5 }}
          opacity={1}
          scale={1}
          enterStyle={{ opacity: 0, scale: 0.5 }}
        >
          <Check color="green" />
        </Stack>
      )}
    </AnimatePresence>
  )
}

export type CheckBoxProps = {
  id?: string
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (state: boolean) => void
  checkIconProps?: CheckIconProps
  containerProps?: XStackProps
  isDisabled?: boolean
  error?: string
} & FromElementLabel &
  CheckBoxFrameProps
export const CheckBox = (props: CheckBoxProps) => {
  const {
    onCheckedChange,
    defaultChecked,
    checkIconProps,
    label,
    labelProps,
    id,
    containerProps,
    error,
    ...rest
  } = props
  const [checked, setChecked] = useState(defaultChecked)
  const onChangeChecked = () => {
    setChecked((prev) => {
      onCheckedChange?.(!prev)
      return !prev
    })
  }
  return (
    <YStack>
      <XStack ai="center" space="$4" {...containerProps}>
        <CheckBoxFrame onPress={onChangeChecked} {...rest}>
          <CheckIcon checked={checked} {...checkIconProps} />
        </CheckBoxFrame>
        <YStack flex={1}>
          {Boolean(label) && isValidElement(label) && label}
          {Boolean(label) && !isValidElement(label) && (
            <Label size={props.size || '$5'} fontWeight="600" pr="$0" {...labelProps}>
              {label}
            </Label>
          )}
        </YStack>
      </XStack>
      <FormError error={error} />
    </YStack>
  )
}
