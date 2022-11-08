import React from 'react';
import {Box} from 'atoms/Box';
import {Text} from 'atoms/Text';
import {SelectableCard} from 'atoms/SelectableCard';
import {capitalizeTitle} from 'utils/capitalization';

export const RelationListItem = ({relationname}) => {
  return (
    <Box>
      <SelectableCard
        height={30}
        mb="xm"
        mt="-xs"
        ml="-mll"
        bg="mainBackground"
        borderRadius={0}>
        <Box flexDirection="column">
          <Text
            variant="text_lg"
            color="subTextColor"
            fontWeight="400"
            letterSpacing={0.18}
            mb="xs">
            {capitalizeTitle(relationname)}
          </Text>
        </Box>
      </SelectableCard>
    </Box>
  );
};
