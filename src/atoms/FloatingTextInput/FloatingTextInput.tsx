import {
  backgroundColor,
  BackgroundColorProps,
  border,
  BorderProps,
  ColorProps,
  createVariant,
  layout,
  LayoutProps,
  spacing,
  SpacingProps,
  typography,
  TypographyProps,
  useRestyle,
  VariantProps,
} from '@shopify/restyle';
import {Box} from 'atoms/Box';
import {Icon, Iconprops} from 'atoms/Icon';
import {Text} from 'atoms/Text';
import {Touch} from 'atoms/Touch';
import {useColor} from 'hooks/useColor';
import {LocaleString} from 'locales/en';
import React, {forwardRef, useEffect, useState} from 'react';
import {TextInput as RNTextInput} from 'react-native';
import {HelperText} from 'react-native-paper';
import {Theme} from 'styles/theme';
import {useDebounce} from 'use-debounce';
import {translate} from 'utils/locale';

export type FloatingTextInputProps = React.ComponentPropsWithRef<
  typeof RNTextInput
> &
  BorderProps<Theme> &
  BackgroundColorProps<Theme> &
  ColorProps<Theme> &
  SpacingProps<Theme> &
  TypographyProps<Theme> &
  LayoutProps<Theme> &
  VariantProps<Theme, 'textInputVariants'> & {
    errorMessage?: string | boolean;
    containerProps?: React.ComponentProps<typeof Box>;
    renderRight?: React.ReactNode;
    renderLeft?: React.ReactNode;
    rightIcon?: Iconprops['name'];
    rightText?: LocaleString;
    onRightIconPress?: () => void;
    rightIconSize?: number;
    rightIconProps?: Partial<Iconprops>;
    loading?: boolean;
    debounce?: boolean;
    testID?: string;
    inputMode?: 'flat' | 'outlined' | undefined;
    label?: string | undefined;
  };

const variant = createVariant<Theme>({
  themeKey: 'textInputVariants',
  defaults: {
    height: 50,
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: 'm',
    paddingHorizontal: 's',
    borderColor: 'textInputBorderColor',
    backgroundColor: 'textInputBackground',
    justifyContent: 'center',
  },
});
const restyleFunctions = [
  spacing,
  border,
  layout,
  backgroundColor,
  typography,
  variant,
];

export const FloatingTextInput = forwardRef<
  RNTextInput,
  FloatingTextInputProps
>(
  (
    {
      errorMessage,
      containerProps,
      rightIcon,
      renderLeft,
      renderRight,
      rightText,
      testID,
      onRightIconPress,
      rightIconSize = 20,
      rightIconProps,
      debounce,
      value,
      onChangeText,
      ...rest
    },
    ref,
  ) => {
    const props = useRestyle(restyleFunctions as any, rest as any);
    const darkTextColor = useColor('darkText');
    const [text, setText] = useState(value);
    const [debouncedValue] = useDebounce(text, 400);

    const handleChange = (t: string) => {
      if (debounce) {
        setText(t);
      }
    };

    useEffect(() => {
      if (debounce) {
        if (typeof onChangeText === 'function') {
          onChangeText(debouncedValue || '');
        }
      }
    }, [debouncedValue, debounce, onChangeText]);

    const renderRightSpinner = () => {
      if (rightIcon) {
        return (
          <Touch
            bg="lightBackground"
            onPress={onRightIconPress}
            justifyContent="center"
            zIndex={10}
            position="absolute"
            paddingTop="sl"
            top={4}
            alignItems="center"
            bottom={34}
            paddingLeft="s"
            right={6}
            paddingRight="s">
            <Icon
              size={rightIconSize}
              icon={rightIcon}
              {...rightIconProps}
              onPress={onRightIconPress}
            />
          </Touch>
        );
      }

      if (rightText) {
        return (
          <Touch
            bg="mainBackground"
            onPress={onRightIconPress}
            justifyContent="center"
            zIndex={10}
            position="absolute"
            top={1}
            alignItems="center"
            borderTopRightRadius={5}
            borderBottomRightRadius={5}
            style={{padding: 15}}
            right={1}
            paddingRight="m">
            <Text
              variant="mediumText"
              localeId={rightText}
              color="darkGreyText"
            />
          </Touch>
        );
      }

      return null;
    };

    return (
      <Box width="100%" {...containerProps} mb="sl">
        {renderRightSpinner()}
        {renderLeft ? (
          <Box pl="m" position="absolute" height={42} left={0} zIndex={100}>
            {renderLeft}
          </Box>
        ) : null}
        {renderRight ? (
          <Box
            pl="m"
            position="absolute"
            top={10}
            height={42}
            right={0}
            zIndex={100}>
            {renderRight}
          </Box>
        ) : null}

        <RNTextInput
          selectionColor={darkTextColor}
          ref={ref as any}
          testID={testID}
          value={debounce ? text : value}
          onChangeText={debounce ? handleChange : onChangeText}
          {...props}
        />
        <HelperText
          style={{paddingLeft: 0}}
          type="error"
          visible={`${rest.variant}`.toLowerCase().includes('error')}>
          {translate(`${errorMessage}` as LocaleString)}
        </HelperText>
      </Box>
    );
  },
);
