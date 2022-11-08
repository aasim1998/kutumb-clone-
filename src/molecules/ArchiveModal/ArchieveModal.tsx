import {BottomModal} from 'atoms/BottomModal';
import {Box} from 'atoms/Box';
import {Row} from 'atoms/Row';
import {Text} from 'atoms/Text';
import {Touch} from 'atoms/Touch';
import {Button} from 'molecules/Button';
import React from 'react';
import {PressEvent} from 'typings/utils';
import {LocaleString} from 'locales/en';
import {deviceHeight} from 'utils/device';
import {isIOS} from 'utils/device';

type archiveModalProps = {
  isModalVisible?: boolean;
  onCloseModal?: PressEvent;
  onArchive: PressEvent;
  localeID: LocaleString;
  archiveLoading?: boolean;
};

export const ArchiveModal = ({
  isModalVisible,
  onCloseModal,
  onArchive,
  localeID,
  archiveLoading,
}: archiveModalProps) => {
  return (
    <BottomModal visible={isModalVisible}>
      <Box
        bg="mainBackground"
        width="90%"
        height={isIOS ? deviceHeight / 3 : deviceHeight / 2.6}
        p="s"
        borderRadius={10}
        maxHeight={240}
        alignItems="center"
        paddingHorizontal="ml">
        <Row width="100%" alignItems="center" justifyContent="center">
          <Text
            variant="text_2xl"
            localeId="archive.text"
            color="zBlack"
            pt="l"
            pl="l"
            pr="l"
          />
        </Row>
        <Text
          variant={isIOS ? 'text_Base' : 'normalText'}
          p="m"
          localeId={localeID}
          color="zBlack"
        />
        <Row mt="mll">
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
            <Touch onPress={onArchive}>
              <Button
                alignSelf="center"
                variant="primary"
                textAlign="center"
                onPress={onArchive}
                loading={archiveLoading}
                title="logout.yes"
              />
            </Touch>
          </Box>
        </Row>
      </Box>
    </BottomModal>
  );
};
