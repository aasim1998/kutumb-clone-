import {BottomModal} from 'atoms/BottomModal';
import {Box} from 'atoms/Box';
import {Row} from 'atoms/Row';
import {Text} from 'atoms/Text';
import {Touch} from 'atoms/Touch';
import {Button} from 'molecules/Button';
import React from 'react';
import {PressEvent} from 'typings/utils';
import {OptionalLocalString} from 'locales/en';
import {isIOS} from 'utils/device';

type modalProps = {
  isModalVisible?: boolean;
  onCloseModal?: PressEvent;
  onPress: PressEvent;
  title: OptionalLocalString;
  subtitle?: OptionalLocalString;
  loading?: boolean;
};

export const Modal = ({
  isModalVisible,
  onCloseModal,
  onPress,
  title,
  subtitle,
  loading,
}: modalProps) => {
  return (
    <BottomModal visible={isModalVisible}>
      <Box
        bg="mainBackground"
        width="90%"
        pt="l"
        pb="xll"
        p="s"
        borderRadius={10}
        maxHeight={300}
        alignItems="center"
        paddingHorizontal="ml">
        <Row width="100%" alignItems="center" justifyContent="center">
          <Text
            variant="text_2xl"
            localeId={title}
            color="zBlack"
            pl="l"
            pr="l"
          />
        </Row>
        <Text
          variant={isIOS ? 'text_Base' : 'normalText'}
          p="m"
          localeId={subtitle}
          color="zBlack"
          textAlign="center"
        />
        <Row mt="m">
          <Box width="45%">
            <Touch onPress={onCloseModal}>
              <Button
                alignSelf="center"
                variant="secondary"
                textAlign="center"
                onPress={onCloseModal}
                title="logout.not"
              />
            </Touch>
          </Box>
          <Box width={20} />
          <Box width="45%">
            <Touch onPress={onPress}>
              <Button
                alignSelf="center"
                variant="primary"
                textAlign="center"
                onPress={onPress}
                loading={loading}
                title="logout.yes"
              />
            </Touch>
          </Box>
        </Row>
      </Box>
    </BottomModal>
  );
};
