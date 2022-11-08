import React from 'react';
import {TextInput} from 'atoms/TextInput';
import theme from 'styles/theme';
import {deviceHeight} from 'utils/device';
import {Touch} from 'atoms/Touch';
import {Icon} from 'atoms/Icon';
import {Box} from 'atoms/Box';

export const SearchTextInput = ({value, ...props}) => {
  return (
    <Box mt="xm">
      <TextInput
        backgroundColor="searchBackgroundColor"
        value={value}
        borderRadius={theme.spacing.xs}
        borderColor="transparent"
        placeholder="search.text"
        paddingLeft="xxxl"
        placeholderTextColor={theme.colors.searchTextColor}
        renderLeft={
          <Touch
            justifyContent="center"
            zIndex={theme.spacing.sl}
            position="absolute"
            paddingTop={deviceHeight < 780 ? 'xm' : 'bm'}
            left={theme.spacing.sl}>
            <Icon
              color={theme.colors.searchIconColor}
              size={20}
              icon={'search'}
            />
          </Touch>
        }
        rightIcon={value.length > 0 ? 'cancel' : undefined}
        keyboardType="default"
        {...props}
      />
    </Box>
  );
};
