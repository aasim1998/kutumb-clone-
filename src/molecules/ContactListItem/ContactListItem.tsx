import React from 'react';
import {Image} from 'atoms/Image';
import {Box} from 'atoms/Box';
import {TextView} from 'atoms/TextView';
import {SelectableCard} from 'atoms/SelectableCard';
import theme from 'styles/theme';
import capitalizeName from 'utils/capitalization';

export const ContactListItem = ({image, firstName, lastName, phone}) => {
  return (
    <Box>
      <SelectableCard
        minHeight={theme.spacing.xxxl}
        p="none"
        bg="mainBackground"
        borderRadius={theme.spacing.none}>
        <Box flexDirection="row" height={56} mb="s" alignItems="center">
          <Box alignItems="center" justifyContent="center">
            <Image
              source={image}
              width={theme.spacing.xllx}
              height={theme.spacing.xllx}
              borderRadius={theme.spacing.XXXL}
            />
          </Box>
          <Box ml="bm" />
          <Box flexDirection="column" maxWidth="80%" alignItems="flex-start">
            <TextView variant="text_lg" color="subTextColor" fontWeight="400">
              {capitalizeName(firstName + ' ' + lastName)}
            </TextView>
            <TextView variant="text_sm" color="greyText">
              {phone}
            </TextView>
          </Box>
        </Box>
      </SelectableCard>
    </Box>
  );
};
