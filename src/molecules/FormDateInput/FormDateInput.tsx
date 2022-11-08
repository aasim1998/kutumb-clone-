import React, {useEffect, useState} from 'react';
import {Box} from 'atoms/Box';
import {DateTimePicker} from 'atoms/DateTimePicker';
import {FormTextInput, FormTextInputProps} from 'molecules/FormTextInput';
import {FC} from 'react';
import {Merge} from 'typings/utils';
import {useFormikContext} from 'formik';
import {LocaleString} from 'locales/en';
import {Touch} from 'atoms/Touch';

type InternalFormDateInputProps = {
  name: string;
  placeholder: LocaleString | string;
  mode?: 'date' | 'time' | 'datetime';
  initialDate?: Date;
  minimumDate?: 'today' | Date;
  maximumDate?: 'today' | Date;
};

export type FormDateInputProps = Merge<
  FormTextInputProps,
  InternalFormDateInputProps
>;

export const FormDateInput: FC<FormDateInputProps> = ({
  name,
  placeholder,
  minimumDate,
  maximumDate,
  initialDate,
  mode,
  ...props
}) => {
  useEffect(() => {
    if (initialDate) {
      setFieldValue(name, initialDate);
    }
  }, []);

  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const {setFieldValue, getFieldMeta} = useFormikContext();

  const findDate = getFieldMeta(name).value as Date;
  const [date, setDate] = useState(initialDate || findDate || undefined);

  const getDateTime = (date: Date) => {
    const dueDate = date;
    setFieldValue(name, dueDate);
    setDate(dueDate);
    setDatePickerVisible(false);
  };

  const toggleDatePicker = () => {
    setDatePickerVisible(!datePickerVisible);
  };

  return (
    <Box>
      <Touch onPress={toggleDatePicker}>
        <FormTextInput
          name={name}
          placeholder={placeholder}
          rightIcon={'calendar'}
          editable={false}
          onRightIconPress={toggleDatePicker}
          value={new Date(date).toLocaleDateString('en-GB')}
          {...props}
        />
      </Touch>
      <DateTimePicker
        visible={datePickerVisible}
        onCancel={toggleDatePicker}
        getDateTime={getDateTime}
        minimumDate={minimumDate}
        maximumDate={maximumDate}
        initialDate={new Date(date)}
        mode={mode}
      />
    </Box>
  );
};
