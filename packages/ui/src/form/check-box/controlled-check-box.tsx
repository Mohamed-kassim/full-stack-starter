import * as React from "react";
import { Controller, ControllerProps, FieldValues } from "react-hook-form";

import { CheckBox, CheckBoxProps } from "./check-box";

type ControlledCheckBoxProps<T extends FieldValues> = CheckBoxProps &
  Omit<ControllerProps<T>, "render">;

export const ControlledCheckBox = <T extends FieldValues>(
  props: ControlledCheckBoxProps<T>
) => {
  const { name, control, rules, defaultValue, shouldUnregister, ...rest } =
    props;

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      shouldUnregister={shouldUnregister}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        const onCheckedChange = (newValue: boolean) => {
          onChange(newValue);
        };
        return (
          <CheckBox
            id={name}
            testID={`${name}_CheckBox`}
            checked={Boolean(value)}
            defaultChecked={defaultValue}
            onCheckedChange={onCheckedChange}
            {...(error?.message && { error: error?.message })}
            {...rest}
          />
        );
      }}
    />
  );
};
