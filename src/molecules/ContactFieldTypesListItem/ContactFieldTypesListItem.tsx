import React from 'react';
import {Box} from 'atoms/Box';
import {SelectableCard} from 'atoms/SelectableCard';
import theme from 'styles/theme';
import capitalizeName from 'utils/capitalization';
import {Text} from 'atoms/Text';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {StyleSheet, Linking} from 'react-native';
import {
  TouchableOpacity,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

export const ContactFieldTypesListItem = ({name, protocol, icon}) => {
  return (
    <Box>
      <SelectableCard
        minHeight={theme.spacing.xxl}
        p="none"
        bg="mainBackground"
        borderRadius={theme.spacing.none}>
        <Box flexDirection="row" mb="s" alignItems="center">
          {icon && icon.includes('fa' || 'fab' || 'far' || 'fas') ? (
            <Box>
              <FontAwesomeIcon icon={icon} style={styles.iconStyles} />
            </Box>
          ) : (
            <Box ml="m" />
          )}
          <Box ml="bm" />
          <Box flexDirection="column" maxWidth="80%">
            <Text
              localeId={capitalizeName(name)}
              variant="normalText"
              color="mediumGreyText"
              fontWeight="700"
            />
            {protocol ? (
              <GestureHandlerRootView>
                <TouchableOpacity onPress={() => Linking.openURL(protocol)}>
                  <Text
                    localeId={protocol}
                    variant="text_sm"
                    color="greyText"
                  />
                </TouchableOpacity>
              </GestureHandlerRootView>
            ) : null}
          </Box>
        </Box>
      </SelectableCard>
    </Box>
  );
};

const styles = StyleSheet.create({
  iconStyles: {
    fontSize: theme.spacing.ml,
    color: theme.colors.mediumGreyText,
  },
});
