import React, {useCallback, useEffect, useState} from 'react';
import {useField} from 'formik';
import {Option, SelectInput} from 'atoms/SelectInput';
import {LocaleString} from 'locales/en';

type FormSelectInputProps = {
  name: string;
  placeholder?: LocaleString;
  options: Option[];
  handleOnChange?: (...params: any) => void;
  values?: string;
  disabled?: boolean;
};

export const FormSelectInput = ({
  name,
  placeholder,
  options,
  handleOnChange,
  disabled,
  values,
}: FormSelectInputProps) => {
  const [, meta, helpers] = useField(name);
  const [selectedValue, setSelectedValue] = useState('');
  const error = meta.touched && meta.error;

  useEffect(() => {
    if (values) {
      setSelectedValue(values);
    }
  }, [values]);

  const handleChange = useCallback(
    newValue => {
      helpers.setValue(newValue.id, true);
      setSelectedValue(newValue.id);
      const fn = handleOnChange;
      if (typeof fn === 'function') {
        handleOnChange ? handleOnChange(newValue) : newValue;
      }
    },
    [helpers, handleOnChange],
  );

  return (
    <SelectInput
      name={name}
      options={options}
      value={options?.find(
        item => item.id === selectedValue || item.locale === selectedValue,
      )}
      error={error as LocaleString}
      placeholder={placeholder}
      onChange={handleChange}
      disabled={disabled}
    />
  );
};
