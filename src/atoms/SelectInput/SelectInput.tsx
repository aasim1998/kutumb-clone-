/* eslint-disable react-native/no-inline-styles */
import React, {
  useState,
  forwardRef,
  useEffect,
  useImperativeHandle,
  RefAttributes,
  ForwardRefExoticComponent,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import {Menu} from 'react-native-paper';
import {Touch} from 'atoms/Touch';
import {Keyboard, StyleSheet, Animated} from 'react-native';
import {LocaleString} from 'locales/en';
import {FloatingTextInput} from 'atoms/FloatingTextInput';
import {translate} from 'utils/locale';
import capitalizeName, {capitalizeTitle} from 'utils/capitalization';
import {Text} from 'atoms/Text';
import {Box} from 'atoms/Box';

export type Option = {
  name: string;
  locale?: string;
  id: string | number;
  isShow?: boolean;
  attribute_id?: string;
  is_active?: boolean;
};

export type SelectInputProps = {
  name: string;
  placeholder?: LocaleString;
  options?: Array<Option>;
  onChange?(option: Option): void;
  value?: Option;
  resetOnSelect?: boolean;
  disabled?: boolean;
  isFocused?: boolean;
  isLongLabeled?: boolean;
  testID?: string;
};

export type SelectInputRef = {
  reset: () => void;
};

type T = ForwardRefExoticComponent<
  SelectInputProps & {
    children?: React.ReactNode;
    error?: LocaleString | false;
  } & RefAttributes<SelectInputRef>
>;

export const SelectInput: T = forwardRef(
  (
    {
      placeholder,
      disabled,
      onChange,
      value,
      options = [],
      error,
      isFocused,
      testID,
    },
    ref,
  ) => {
    const [visible, setVisible] = useState(false);
    const [textValue, setTextValue] = useState<Option | undefined>(value);
    const [selected, setSelected] = useState<Option | null>(value || null);
    const [isFieldActive, setIsFieldActive] = useState(
      selected?.name ? true : false,
    );
    const position = useRef(new Animated.Value(selected?.name ? 1 : 0)).current;

    useEffect(() => {
      if (value) {
        setTextValue(value);
      }
    }, [value]);

    useEffect(() => {
      if (selected?.name) {
        const defaultValue = options?.filter(
          item => item.name.toUpperCase() === selected?.name.toUpperCase(),
        );
        if (defaultValue.length > 0) {
          setSelected(defaultValue[0]);
        }
        setIsFieldActive(true);
      }
    }, [options, selected?.name]);

    useImperativeHandle(ref, () => ({
      reset: () => {
        setSelected(null);
      },
      placeholder,
    }));

    const placeholderText = useMemo(() => {
      if (placeholder) {
        return translate(placeholder || '');
      }
      return '';
    }, [placeholder]);

    const onDismiss = useCallback(() => {
      setVisible(false);
    }, []);
    const openMenu = () => {
      setVisible(true);
      Keyboard.dismiss();
    };

    const handleChange = useCallback(
      (option: Option) => () => {
        onDismiss();
        if (typeof onChange === 'function') {
          onChange(option);
          setSelected(option);
        }
      },
      [onDismiss, onChange],
    );

    if (isFieldActive === true && selected?.name) {
      Animated.timing(position, {
        toValue: 1,
        duration: 150,
        useNativeDriver: false,
      }).start();
    }

    const errorStyle = () => {
      if (error) {
        return style.isError;
      } else if (isFieldActive || isFocused) {
        return style.isFocusStyle;
      } else {
        return style.isFocusStyleDisable;
      }
    };

    return (
      <Touch onPress={openMenu}>
        <Box>
          {placeholderText.length !== 0 && !selected && (
            <Text localeId={placeholderText} style={style.titleStyles} />
          )}
          <Menu
            contentStyle={{marginTop: 25}}
            visible={!disabled && visible}
            onDismiss={onDismiss}
            style={{width: '84%'}}
            anchor={
              <FloatingTextInput
                rightIcon="drop-down"
                testID={testID}
                value={
                  (selected && capitalizeName(selected.name)) ||
                  (textValue && capitalizeName(textValue.name))
                }
                placeholder={isFieldActive || disabled ? 'placeholderText' : ''}
                placeholderTextColor="#393E46"
                containerProps={{pointerEvents: 'none'}}
                editable={false}
                variant={error ? 'error' : undefined}
                errorMessage={error}
                style={[style.textInput, errorStyle()]}
              />
            }>
            {options.map((option, index) => (
              <Menu.Item
                disabled={disabled}
                contentStyle={{width: '100%'}}
                key={index.toString()}
                onPress={handleChange(option)}
                title={capitalizeTitle(option.name)}
              />
            ))}
          </Menu>
        </Box>
      </Touch>
    );
  },
);
const style = StyleSheet.create({
  textInput: {
    color: '#393E46',
  },
  titleStyles: {
    position: 'absolute',
    left: 10,
    fontSize: 16,
    color: '#393E46',
    backgroundColor: '#FFFFFF',
    zIndex: 1,
    top: 15,
  },
  isFocusStyle: {
    borderColor: '#CBD5E0',
  },
  isFocusStyleDisable: {
    borderColor: '#CBD5E0',
  },
  isError: {
    borderColor: '#CBD5E0',
  },
});
