import { createVariant, useRestyle, VariantProps } from "@shopify/restyle";
import { Text, TextProps } from "atoms/Text";
import React from "react";
import { Theme } from "styles/theme";

const textVariant = createVariant<Theme>({
  themeKey: "buttonTextVariants",
  defaults: {
    fontFamily: "IBMPlexSans-SemiBold",
    fontSize: 18,
  },
});
const restyleFunctions = [textVariant];

type ButtonTextProps = Omit<TextProps, "variant"> &
  VariantProps<Theme, "buttonTextVariants">;
export const ButtonText = ({ variant, ...props }: ButtonTextProps) => {
  const p = useRestyle(restyleFunctions as any, { variant } as any);
  return <Text {...p} {...props} />;
};
