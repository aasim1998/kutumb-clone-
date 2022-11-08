import React, {FC} from 'react';
import {Platform} from 'react-native';
import {Box} from 'atoms/Box';
import {TextView} from 'atoms/TextView';
import {SelectableCard} from 'atoms/SelectableCard';
import theme from 'styles/theme';
import capitalizeName, {capitalizeTitle} from 'utils/capitalization';
import {ViewMoreText} from 'molecules/ViewMoreText/ViewMoreText';

export const GiftListItem: FC<{
  giftName: string;
  giftDescription: string;
  giftDate: string;
  giftStatus: string;
}> = ({giftName, giftDescription, giftDate, giftStatus}) => {
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
            <TextView
              variant={Platform.OS == 'ios' ? 'normalText' : 'text_sm'}
              color="zBlack"
              fontWeight="700"
              lineHeight={21}>
              {capitalizeTitle(giftName)}
            </TextView>
            {giftDescription.length > 0 && (
              <ViewMoreText
                variant={Platform.OS == 'ios' ? 'normalText' : 'text_sm'}
                color="zBlack"
                mb="xss"
                numberOfLines={2}
                localeId={capitalizeTitle(giftDescription)}
              />
            )}
            <TextView fontWeight="700" variant="text_sm" color="greyText">
              {capitalizeName(giftStatus)}
            </TextView>
            <TextView fontWeight="700" variant="text_sm" color="greyText">
              {giftDate}
            </TextView>
          </Box>
        </Box>
      </SelectableCard>
    </Box>
  );
};
