import { Eye, EyeOff } from '@tamagui/lucide-icons'
import React, { MutableRefObject, PropsWithChildren, Ref, useCallback, useReducer } from 'react'
import { TextInput } from 'react-native'
import {
  GetProps,
  InputFrame as TamaguiInputFrame,
  InputProps as BaseInputProps,
  Stack,
  styled,
  TamaguiElement,
  XStack,
  YStack,
} from 'tamagui'

import { Button } from '../../button'
import { FormError } from '../form-error'
import { Label, LabelProps } from '../label'

const defaultProps: BaseInputProps = {
  h: '$5',
  borderRadius: 0,
  borderWidth: 0,
  borderBottomWidth: 1,
  bg: 'transparent',
  focusStyle: { borderBottomWidth: 2 },
}

const InputBase = styled(TamaguiInputFrame, {
  name: 'Input',

  ...defaultProps,

  variants: {
    status: {
      error: {
        color: '$red7',
        borderColor: '$red7',
        focusStyle: { borderColor: 'red', color: 'red' },
      },
      success: {
        color: '$green7',
        borderColor: '$green7',
        focusStyle: { borderColor: 'green', color: 'red' },
      },
    },
  } as const,
})

const ACCESSORY_WIDTH = 35
const Accessory = (
  props: PropsWithChildren<{
    direction: 'right' | 'left'
  }>
) => {
  const { direction } = props
  return (
    <Stack
      w={ACCESSORY_WIDTH}
      h="100%"
      position="absolute"
      {...(direction === 'right' && {
        right: 0,
      })}
      {...(direction === 'left' && {
        left: 0,
      })}
      top={0}
      justifyContent="center"
      alignItems="center"
      px="$3"
    >
      {props.children}
    </Stack>
  )
}

const SecureAccessory = ({
  securedEntry,
  toggleSecureEntry,
}: {
  toggleSecureEntry: () => void
  securedEntry: boolean
}) => {
  // TODO: Check press style
  return (
    <Button
      onPress={toggleSecureEntry}
      px={0}
      bg="transparent"
      pressStyle={{ opacity: 0.8 }}
      w={ACCESSORY_WIDTH}
      icon={
        !securedEntry ? (
          <EyeOff size={ACCESSORY_WIDTH / 1.5} />
        ) : (
          <Eye size={ACCESSORY_WIDTH / 1.5} />
        )
      }
    />
  )
}

export type InputRef = MutableRefObject<TextInput | undefined>

type Props = {
  label?: string
  name: string
  labelProps?: LabelProps
  error?: string
  accessoryRight?: React.ReactElement
  accessoryLeft?: React.ReactElement
  inputRef?: InputRef
  nextRef?: InputRef
  secureTextEntry?: boolean
  isDisabled?: boolean
  hideErrorForm?: boolean
} & BaseInputProps
const toggleSecure = (prevState: boolean) => !prevState
export const Input = (props: PropsWithChildren<Props>) => {
  const {
    label,
    name,
    labelProps,
    accessoryRight,
    accessoryLeft,
    error,
    inputRef,
    nextRef,
    isDisabled,
    hideErrorForm,
    secureTextEntry: secureTextEntryProp,
    ...rest
  } = props

  const [secureTextEntry, toggleSecureEntry] = useReducer(
    toggleSecure,
    Boolean(secureTextEntryProp)
  )
  const onSubmitEditing = useCallback(() => {
    if (nextRef?.current) {
      nextRef.current.focus()
    }
  }, [nextRef])
  return (
    <YStack>
      {Boolean(label) && (
        <Label
          // htmlFor={name}
          {...labelProps}
        >
          {label}
        </Label>
      )}
      <XStack w="100%">
        {accessoryLeft && <Accessory direction="left">{accessoryLeft}</Accessory>}
        <InputBase
          ref={inputRef as Ref<TextInput>}
          // id={name}
          pl={accessoryLeft ? ACCESSORY_WIDTH : 0}
          pr={accessoryRight ? ACCESSORY_WIDTH : 0}
          w="100%"
          editable={!isDisabled}
          onSubmitEditing={onSubmitEditing}
          secureTextEntry={secureTextEntry}
          blurOnSubmit={false}
          {...(error && { status: 'error' })}
          {...rest}
        />

        {(accessoryRight || secureTextEntryProp) && (
          <Accessory direction="right">
            {accessoryRight ? (
              accessoryRight
            ) : (
              <SecureAccessory
                securedEntry={secureTextEntry}
                toggleSecureEntry={toggleSecureEntry}
              />
            )}
          </Accessory>
        )}
      </XStack>
      {!hideErrorForm && <FormError error={error} />}
    </YStack>
  )
}

export type InputProps = GetProps<typeof Input>
