import React from 'react';
import {FormTextInput, FormTextInputProps} from 'molecules/FormTextInput';

export const FormEmailInput = (props: Partial<FormTextInputProps>) => {
  return (
    <FormTextInput
      name="email"
      placeholder="user.email"
      keyboardType="email-address"
      {...props}
    />
  );
};
