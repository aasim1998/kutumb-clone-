import React from 'react';
import {Box} from 'atoms/Box';
import {TextView} from 'atoms/TextView';
import {SelectableCard} from 'atoms/SelectableCard';
import {Platform} from 'react-native';
import {capitalizeTitle} from 'utils/capitalization';

export const JournalListItem = ({title, body, time}) => {
  return (
    <Box>
      <SelectableCard
        minHeight={0}
        mx="-s"
        pr="-m"
        pt="sx"
        mb="-xm"
        borderRadius={0}
        bg="mainBackground">
        <Box flexDirection="row" alignItems="center" justifyContent="center">
          <Box mr="bm" flex={3}>
            <TextView
              variant="normalText"
              color="subTextColor"
              fontWeight="700">
              {capitalizeTitle(title)}
            </TextView>
            <TextView
              mt="xs"
              variant="normalText"
              color="subTextColor"
              fontWeight="400"
              numberOfLines={2}>
              {capitalizeTitle(body)}
            </TextView>
          </Box>
          <Box ml="s" flexDirection="row-reverse" alignSelf="flex-start">
            <TextView
              color="greyText"
              variant={Platform.OS === 'ios' ? 'normalText' : 'text_sm'}>
              {time}
            </TextView>
          </Box>
        </Box>
      </SelectableCard>
    </Box>
  );
};
