import { Controller, ControllerProps, FieldValues } from 'react-hook-form'

import { Input, InputProps } from './input'

type ControlledInputProps<T extends FieldValues> = InputProps & Omit<ControllerProps<T>, 'render'>

export const ControlledInput = <T extends FieldValues>(props: ControlledInputProps<T>) => {
  const { name, control, rules, defaultValue, shouldUnregister, ...rest } = props

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      shouldUnregister={shouldUnregister}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <Input
          name={name}
          onBlur={onBlur}
          testID={`${name}_input`}
          onChangeText={onChange}
          value={value as string}
          {...(error?.message && { error: error?.message })}
          {...rest}
        />
      )}
    />
  )
}
