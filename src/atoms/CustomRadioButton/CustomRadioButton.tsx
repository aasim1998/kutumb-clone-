import React from 'react';
import {Text} from 'atoms/Text';
import {OptionalLocalString} from 'locales/en';
import {RadioButton} from 'react-native-paper';
import {PressEvent} from 'typings/utils';
import {Box} from 'atoms/Box';
import theme from 'styles/theme';

type RadioButtonProps = {
  label1: OptionalLocalString;
  label2: OptionalLocalString;
  title: OptionalLocalString;
  onCheck: PressEvent;
  value: string;
  buttonValue1: string;
  buttonValue2: string;
};

export const CustomRadioButton = ({
  label1,
  label2,
  onCheck,
  value,
  title,
  buttonValue1,
  buttonValue2,
}: RadioButtonProps) => {
  return (
    <RadioButton.Group
      onValueChange={newValue => onCheck(newValue)}
      value={value}>
      <Text localeId={title} variant="normalText" color="zBlack" />
      <Box flexDirection="row">
        <Box flexDirection="row" alignItems="center">
          <RadioButton.Android
            value={buttonValue1}
            color={theme.colors.primary}
          />
          <Text localeId={label1} />
        </Box>
        <Box flexDirection="row" alignItems="center">
          <RadioButton.Android
            value={buttonValue2}
            color={theme.colors.primary}
          />
          <Text localeId={label2} />
        </Box>
      </Box>
    </RadioButton.Group>
  );
};
