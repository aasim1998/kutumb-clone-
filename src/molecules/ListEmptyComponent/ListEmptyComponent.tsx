import React from 'react';

import {Box} from 'atoms/Box';
import {Text} from 'atoms/Text';

export const ListEmptyComponent = props => {
  return (
    <Box minHeight="100%" justifyContent="center" {...props}>
      <Text
        textAlign="center"
        variant="text_lg"
        color="black"
        fontWeight="700"
        localeId="no.record.found"
      />
    </Box>
  );
};
