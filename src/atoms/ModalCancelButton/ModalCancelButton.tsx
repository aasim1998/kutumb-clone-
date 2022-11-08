import React from "react";
import { Box } from "atoms/Box";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Icon } from "atoms/Icon";
import { Row } from "atoms/Row";
import { Text } from "atoms/Text";
import { useColor } from "hooks/useColor";

type ModalCancelButtonProps = {
  dismissModel: () => void;
  title?: string;
  renderRight?: React.ReactNode;
  iconColor?: string;
};

export const ModalCancelButton = ({
  dismissModel,
  title,
  renderRight,
  iconColor,
}: ModalCancelButtonProps) => {
  const { top } = useSafeAreaInsets();
  const internalColor = useColor(iconColor || "whiteText");
  return (
    <Box position="absolute" zIndex={99} top={top} width="100%">
      {title ? (
        <Box width="65%" position="absolute" alignSelf="center" top={20}>
          <Text
            textAlign="center"
            ellipsizeMode="middle"
            numberOfLines={1}
            variant="normalText"
            color="whiteText">
            {title}
          </Text>
        </Box>
      ) : (
        <Box />
      )}
      <Row pr="l" justifyContent="space-between" alignItems="center">
        <Icon
          icon="cancel"
          size={17}
          color={internalColor ? internalColor : "whiteText"}
          onPress={dismissModel}
          // p="l"
        />
        {renderRight || <Box />}
      </Row>
    </Box>
  );
};
