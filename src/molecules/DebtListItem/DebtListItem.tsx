import React, {FC} from 'react';
import {Platform} from 'react-native';
import {Box} from 'atoms/Box';
import {TextView} from 'atoms/TextView';
import {SelectableCard} from 'atoms/SelectableCard';
import theme from 'styles/theme';
import capitalizeName, {capitalizeTitle} from 'utils/capitalization';

export const DebtListItem: FC<{
  debtTitle: string;
  debtAmount: string;
  debtDate: string;
  debtOwedBy: string;
}> = ({debtTitle, debtAmount, debtDate, debtOwedBy}) => {
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
              {capitalizeTitle(debtTitle)}
            </TextView>
            <TextView fontWeight="700" variant="text_sm" color="greyText">
              {debtAmount}
            </TextView>
            <TextView fontWeight="700" variant="text_sm" color="greyText">
              {capitalizeName(debtOwedBy)}
            </TextView>
            <TextView fontWeight="700" variant="text_sm" color="greyText">
              {debtDate}
            </TextView>
          </Box>
        </Box>
      </SelectableCard>
    </Box>
  );
};
