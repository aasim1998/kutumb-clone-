import React from 'react';
import {Box} from 'atoms/Box';
import {TextView} from 'atoms/TextView';
import {SelectableCard} from 'atoms/SelectableCard';
import theme from 'styles/theme';
import capitalizeName from 'utils/capitalization';

export const ArchivedContactListItem = ({firstName, lastName, date}) => {
  return (
    <Box>
      <SelectableCard
        minHeight={theme.spacing.xxxl}
        p="none"
        bg="mainBackground"
        borderRadius={theme.spacing.none}>
        <Box flexDirection="row" height={56} my="s" alignItems="center">
          <Box flexDirection="column" maxWidth="100%" alignItems="flex-start">
            <TextView
              variant="text_lg"
              color="mediumGreyText"
              fontWeight="700"
              mb="xs">
              {capitalizeName(firstName + ' ' + lastName)}
            </TextView>
            <TextView variant="normalText" color="greyText">
              {date}
            </TextView>
          </Box>
        </Box>
      </SelectableCard>
    </Box>
  );
};
