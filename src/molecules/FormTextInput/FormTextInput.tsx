import React, {useCallback} from 'react';

import {useField} from 'formik';
import {TextInput, TextInputProps} from 'atoms/TextInput';
import {Merge} from 'typings/utils';
import {TextInput as RNTextInput} from 'react-native';
import {LocaleString} from 'locales/en';
import theme from 'styles/theme';

type InternalFormTextInputProps = {
  name: string;
  placeholder?: LocaleString | string;
  nextInputRef?: React.MutableRefObject<RNTextInput> | null;
};

export type FormTextInputProps = Merge<
  Partial<TextInputProps>,
  InternalFormTextInputProps
>;

export const FormTextInput = React.forwardRef<RNTextInput, FormTextInputProps>(
  ({name, placeholder, nextInputRef, rightIcon, ...props}, ref) => {
    const [field, meta, helpers] = useField(name as any);
    const error = meta.touched && meta.error;
    const handleBlur = useCallback(() => {
      helpers.setTouched(true);
    }, [helpers]);
    const handleSubmitEditing = useCallback(() => {
      nextInputRef?.current?.focus();
    }, [nextInputRef]);
    return (
      <TextInput
        ref={ref as any}
        autoCorrect={false}
        autoCapitalize="none"
        placeholder={placeholder}
        variant={error ? 'error' : undefined}
        errorMessage={error}
        value={field.value}
        borderColor={'textInputBorderColor'}
        onChangeText={field.onChange(name) as any}
        onBlur={handleBlur}
        onSubmitEditing={handleSubmitEditing}
        rightIcon={rightIcon}
        style={{color: '#000000'}}
        placeholderTextColor={theme.colors.textInputBorderColor}
        {...props}
      />
    );
  },
);
