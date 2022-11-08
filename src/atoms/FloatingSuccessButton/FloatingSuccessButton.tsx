import { Box } from "atoms/Box";
import { Text } from "atoms/Text";
import { LocaleString } from "locales/en";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type FloatingBackButtonProps = {
  title?: LocaleString;
};

export const FloatingSuccessButton = ({ title }: FloatingBackButtonProps) => {
  const { top } = useSafeAreaInsets();
  return (
    <Box position="absolute" zIndex={99} top={top} width="100%">
      {title ? (
        <Box position="absolute" alignSelf="center" top={20}>
          <Text variant="normalText" color="whiteText" localeId={title} />
        </Box>
      ) : (
        <Box />
      )}
    </Box>
  );
};
