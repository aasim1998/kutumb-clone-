import React, {forwardRef, useState, useEffect} from 'react';
import {useDebounce} from 'use-debounce';
import {
  ColorProps,
  useRestyle,
  spacing,
  border,
  backgroundColor,
  BorderProps,
  BackgroundColorProps,
  createVariant,
  VariantProps,
  typography,
  SpacingProps,
  TypographyProps,
  layout,
  LayoutProps,
} from '@shopify/restyle';
import {TextInput as RNTextInput} from 'react-native';
import {HelperText} from 'react-native-paper';
import {Icon, Iconprops} from 'atoms/Icon';
import theme, {Theme} from 'styles/theme';
import {Box} from 'atoms/Box';
import {useColor} from 'hooks/useColor';
import {translate} from 'utils/locale';
import {LocaleString} from 'locales/en';
import {Touch} from 'atoms/Touch';
import {Spinner} from 'atoms/Spinner';
import {deviceHeight} from 'utils/device';

export type TextInputProps = React.ComponentPropsWithRef<typeof RNTextInput> &
  BorderProps<Theme> &
  BackgroundColorProps<Theme> &
  ColorProps<Theme> &
  SpacingProps<Theme> &
  TypographyProps<Theme> &
  LayoutProps<Theme> &
  VariantProps<Theme, 'textInputVariants'> & {
    placeholder?: string;
    errorMessage?: string | boolean;
    containerProps?: React.ComponentProps<typeof Box>;
    leftIcon?: Iconprops['icon'];
    renderRight?: React.ReactNode;
    renderLeft?: React.ReactNode;
    rightIcon?: Iconprops['icon'];
    onRightIconPress?: () => void;
    leftIconSize?: number;
    rightIconSize?: number;
    leftIconProps?: Partial<Iconprops>;
    rightIconProps?: Partial<Iconprops>;
    loading?: boolean;
    debounce?: boolean;
  };

const variant = createVariant<Theme>({
  themeKey: 'textInputVariants',
  defaults: {
    fontFamily: 'IBMPlexSans-Light',
    height: 43,
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

export const TextInput = forwardRef<RNTextInput, TextInputProps>(
  (
    {
      placeholder,
      errorMessage,
      containerProps,
      leftIcon,
      rightIcon,
      renderLeft,
      onRightIconPress,
      leftIconSize = 20,
      rightIconSize = 20,
      leftIconProps,
      rightIconProps,
      loading,
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
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedValue, debounce]);

    const renderRight = () => {
      if (loading) {
        return (
          <Spinner
            zIndex={10}
            position="absolute"
            color="primary"
            paddingTop="sl"
            top={0}
            right={0}
            paddingRight="s"
            size="small"
          />
        );
      }
      if (rightIcon) {
        return (
          <Touch
            justifyContent="center"
            zIndex={10}
            position="absolute"
            paddingTop={deviceHeight < 780 ? 'xm' : 'bm'}
            right={theme.spacing.sl}
            onPress={onRightIconPress}>
            <Icon
              color={
                rightIcon !== 'cancel'
                  ? theme.colors.iconColorRight
                  : theme.colors.searchIconColor
              }
              size={rightIconSize}
              icon={rightIcon}
              onPress={onRightIconPress}
              {...rightIconProps}
            />
          </Touch>
        );
      }
      if (leftIcon) {
        return (
          <Touch
            justifyContent="center"
            zIndex={theme.spacing.sl}
            position="absolute"
            paddingTop={deviceHeight < 780 ? 'xm' : 'bm'}
            top={theme.spacing.bm}
            left={theme.spacing.sl}>
            <Icon
              color={theme.colors.searchIconColor}
              size={leftIconSize}
              icon={leftIcon}
              {...leftIconProps}
            />
          </Touch>
        );
      }
      return null;
    };
    return (
      <Box width="100%" {...containerProps}>
        {renderRight()}
        {renderLeft ? (
          <Box pl="m" position="absolute" height={43} left={0} zIndex={100}>
            {renderLeft}
          </Box>
        ) : null}
        <RNTextInput
          selectionColor={darkTextColor}
          ref={ref as any}
          value={debounce ? text : value}
          onChangeText={debounce ? handleChange : onChangeText}
          placeholder={translate(`${placeholder}` as LocaleString)}
          {...props}
        />
        <HelperText
          type="error"
          padding="none"
          visible={`${rest.variant}`.toLowerCase().includes('error')}>
          {translate(`${errorMessage}` as LocaleString)}
        </HelperText>
      </Box>
    );
  },
);
