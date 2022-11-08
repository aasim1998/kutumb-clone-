import React, {FC} from 'react';
import {Box} from 'atoms/Box';
import {TextView} from 'atoms/TextView';
import {SelectableCard} from 'atoms/SelectableCard';
import theme from 'styles/theme';
import {Linking, Platform} from 'react-native';
import {capitalizeTitle} from 'utils/capitalization';
import {ViewMoreText} from 'molecules/ViewMoreText/ViewMoreText';
import {Text} from 'atoms/Text';
import {Row} from 'atoms/Row';
import {Touch} from 'atoms/Touch';
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from 'react-native-gesture-handler';

export const StatusListItem: FC<{
  body: string;
  time: string;
  status: string;
  userName: string;
  protocol?: string;
}> = ({body, time, status, userName, protocol}) => {
  let statusBg;
  let statusColor;
  let statusText;
  let statusDisabled;

  switch (status) {
    case 'user':
      statusBg = 'lighterRed';
      statusColor = 'darkRed';
      statusText = 'outgoing.call';
      statusDisabled = true;
      break;

    case 'contact':
      statusBg = 'lightGreen';
      statusColor = 'darkGreen';
      statusText = 'incoming.call';
      statusDisabled = true;
      break;

    default:
      statusBg = 'lightGreyBackground';
      statusColor = 'darkText';
      statusText = `${status}`;
      statusDisabled = false;
      break;
  }

  return (
    <Box>
      <SelectableCard
        p="none"
        m="-xs"
        minHeight={0}
        pt="s"
        mb="xss"
        bg="mainBackground"
        borderRadius={theme.spacing.none}>
        <Box p="xs" flexDirection="row" alignItems="center">
          <Box flexDirection="column" alignItems="flex-start">
            <Row mb="xss">
              <Text localeId={userName} />
              <GestureHandlerRootView>
                <TouchableOpacity
                  disabled={statusDisabled}
                  onPress={() => (protocol ? Linking.openURL(protocol) : null)}>
                  <Box ml="s" bg={statusBg} borderRadius={theme.spacing.m}>
                    <Text
                      color={statusColor}
                      pb="xss"
                      px="s"
                      localeId={statusText}
                    />
                  </Box>
                </TouchableOpacity>
              </GestureHandlerRootView>
            </Row>
            {body.length > 0 && (
              <ViewMoreText
                variant={Platform.OS === 'ios' ? 'normalText' : 'text_sm'}
                color="zBlack"
                mb="xss"
                numberOfLines={2}
                localeId={capitalizeTitle(body)}
              />
            )}
            <TextView
              mt="xss"
              fontWeight="700"
              variant="text_sm"
              color="greyText">
              {time}
            </TextView>
          </Box>
        </Box>
      </SelectableCard>
    </Box>
  );
};
