import React, {useRef} from 'react';
import {Box} from 'atoms/Box';
import {Formik, FormikHelpers} from 'formik';
import {Button} from 'molecules/Button';
import {PressEvent} from 'typings/utils';
import {FormEmailInput} from 'molecules/FormEmailInput';
import {FormPasswordInput} from 'molecules/FormPasswordInput';
import {
  validateRequiredEmail,
  validateRequiredPassword,
} from 'utils/validators';
import * as yup from 'yup';
import {LoginUser} from 'typings/auth.type';

export type FormValues = {
  email: string;
  password: string;
};

type LoginFormProps = {
  onSubmit(values: FormValues, helpers: FormikHelpers<FormValues>): void;
  loading?: boolean;
  initialValues: LoginUser;
};

export const loginValidationSchema = yup.object().shape({
  email: validateRequiredEmail(),
  password: validateRequiredPassword(),
});

export const LoginScreenForm = ({
  onSubmit,
  loading,
  initialValues,
}: LoginFormProps) => {
  const ref1 = useRef<any>();

  return (
    <Formik<FormValues>
      initialValues={initialValues}
      validationSchema={loginValidationSchema}
      enableReinitialize
      onSubmit={onSubmit}>
      {({handleSubmit}) => {
        return (
          <Box bg="mainBackground">
            <FormEmailInput
              testID="EmailInput"
              blurOnSubmit={false}
              returnKeyType="next"
              onSubmitEditing={() => ref1.current.focus()}
            />
            <FormPasswordInput
              testID="PasswordInput"
              ref={ref1}
              returnKeyType="done"
            />
            <Button
              title="login.btn.title"
              loading={loading}
              variant="primary"
              onPress={handleSubmit as PressEvent}
            />
          </Box>
        );
      }}
    </Formik>
  );
};
