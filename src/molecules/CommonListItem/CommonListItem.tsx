import React, {FC} from 'react';
import {Box} from 'atoms/Box';
import {TextView} from 'atoms/TextView';
import {SelectableCard} from 'atoms/SelectableCard';
import theme from 'styles/theme';
import {Platform} from 'react-native';
import {capitalizeTitle} from 'utils/capitalization';
import {ViewMoreText} from 'molecules/ViewMoreText/ViewMoreText';
import {Text} from 'atoms/Text';

export const CommonListItem: FC<{
  title?: string;
  body: string;
  time?: string;
  subtitle?: string;
}> = ({title, body, time, subtitle}) => {
  return (
    <Box>
      <SelectableCard
        p="none"
        m="-xs"
        minHeight={0}
        pt="s"
        pb="xs"
        bg="mainBackground"
        borderRadius={theme.spacing.none}>
        <Box p="xs" flexDirection="row" alignItems="center">
          <Box flexDirection="column" alignItems="flex-start">
            {title && (
              <TextView
                variant={Platform.OS === 'ios' ? 'normalText' : 'text_sm'}
                color="zBlack"
                fontWeight="700"
                lineHeight={21}>
                {capitalizeTitle(title)}
                {subtitle && (
                  <Text
                    variant={Platform.OS === 'ios' ? 'normalText' : 'text_sm'}
                    color="zBlack"
                    fontWeight="700"
                    lineHeight={21}
                    localeId={` (${capitalizeTitle(subtitle)})`}
                  />
                )}
              </TextView>
            )}
            {body.length > 0 && (
              <ViewMoreText
                variant={Platform.OS === 'ios' ? 'normalText' : 'text_sm'}
                color="zBlack"
                mb="xss"
                numberOfLines={2}
                localeId={capitalizeTitle(body)}
              />
            )}
            {time && (
              <TextView
                mt="xss"
                fontWeight="700"
                variant="text_sm"
                color="greyText">
                {time}
              </TextView>
            )}
          </Box>
        </Box>
      </SelectableCard>
    </Box>
  );
};
