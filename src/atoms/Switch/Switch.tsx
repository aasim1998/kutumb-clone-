import React from "react";
import { Icon, Iconprops } from "atoms/Icon";
import { PressEvent } from "typings/utils";
import { Merge } from "typings/utils";
import { Touch } from "atoms/Touch";

type SwitchProps = Merge<
  {
    checked: boolean;
    onPress?: PressEvent;
  },
  Partial<Iconprops>
>;

export const Switch = ({ checked, onPress, ...props }: SwitchProps) => {
  return (
    <Touch onPress={onPress}>
      <Icon
        icon={checked ? "toggle-on" : "toggle-off"}
        color={checked ? "primary" : "disabled"}
        size={22}
        {...props}
      />
    </Touch>
  );
};
