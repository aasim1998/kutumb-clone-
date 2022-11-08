import React from "react";
import { Icon, Iconprops } from "atoms/Icon";
import { PressEvent } from "typings/utils";
import { Merge } from "typings/utils";
import { Touch } from "atoms/Touch";

type CheckBoxProps = Merge<
  {
    checked: boolean;
    onPress?: PressEvent;
  },
  Partial<Iconprops>
>;

export const CheckBox = ({ checked, onPress, ...props }: CheckBoxProps) => {
  return (
    <Touch onPress={onPress}>
      <Icon
        icon={checked ? "check_box_selected" : "uncheck_box"}
        color={checked ? "primary" : "textInputBorderColor"}
        size={20}
        {...props}
      />
    </Touch>
  );
};
