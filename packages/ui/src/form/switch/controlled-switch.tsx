import * as React from "react";
import { Controller, ControllerProps, FieldValues } from "react-hook-form";

import { Switch, SwitchProps } from "./switch";

type ControlledSwitchProps<T extends FieldValues> = SwitchProps &
  Omit<ControllerProps<T>, "render">;

export const ControlledSwitch = <T extends FieldValues>(
  props: ControlledSwitchProps<T>
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
          <Switch
            labeledBy={name}
            id={name}
            name={name}
            testID={`${name}_switch`}
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
