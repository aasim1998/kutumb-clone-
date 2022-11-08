import {CustomRadioButton} from 'atoms/CustomRadioButton';
import {useFormikContext} from 'formik';
import {en, OptionalLocalString} from 'locales/en';
import React, {useCallback, useEffect} from 'react';
import {PressEvent} from 'typings/utils';

type FormRadioButtonProps = {
  title: OptionalLocalString;
  label1: OptionalLocalString;
  label2: OptionalLocalString;
  value: string;
  name: string;
  onCheck?: PressEvent;
  buttonValue1?: OptionalLocalString;
  buttonValue2?: OptionalLocalString;
};
export const FormRadioButton = ({
  title,
  label1,
  label2,
  value,
  name,
  buttonValue1,
  buttonValue2,
}: FormRadioButtonProps) => {
  const {setFieldValue, getFieldMeta} = useFormikContext();
  const handleCheckBox = useCallback(
    (boxValue: string) => {
      setFieldValue(name, boxValue);
    },
    [setFieldValue, name],
  );

  useEffect(() => {
    setFieldValue(name, value);
  }, [setFieldValue, value, name]);

  return (
    <CustomRadioButton
      title={title}
      label1={label1}
      label2={label2}
      onCheck={handleCheckBox}
      value={(getFieldMeta(name).value as string) || 'true'}
      buttonValue1={buttonValue1 ? en[buttonValue1] : 'true'}
      buttonValue2={buttonValue2 ? en[buttonValue2] : 'false'}
    />
  );
};
