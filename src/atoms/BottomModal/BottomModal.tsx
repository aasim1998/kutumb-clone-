import React, {FC} from 'react';
import {ModalProps, Modal} from 'react-native';
import {Merge} from 'typings/utils';
import {Touch} from 'atoms/Touch';
import {Box} from 'atoms/Box';

type CenteredModalProps = Merge<ModalProps, {onBackdropPress?: () => void}>;

export const BottomModal: FC<CenteredModalProps> = ({
  children,
  visible,
  onBackdropPress,
  ...props
}) => {
  return (
    <Modal
      transparent
      animationType="slide"
      visible={visible}
      onRequestClose={onBackdropPress}
      {...props}>
      <Box flex={1} justifyContent="center" alignItems="center">
        <Touch
          bg="darkText"
          position="absolute"
          width="100%"
          height="100%"
          flex={1}
          opacity={0.3}
          onPress={onBackdropPress}
        />
        {children}
      </Box>
    </Modal>
  );
};
