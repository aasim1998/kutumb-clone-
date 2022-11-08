import React, {useRef} from 'react';
import {Box} from 'atoms/Box';
import {Formik, FormikHelpers} from 'formik';
import {SignUpUser} from 'typings/auth.type';
import {FormTextInput} from 'molecules/FormTextInput';
import {Button} from 'molecules/Button';
import {PressEvent} from 'typings/utils';
import * as Yup from 'yup';
import {FormPasswordInput} from 'molecules/FormPasswordInput';
import {
  validateConfirmPasswordRequired,
  validateFirstName,
  validateLastName,
  validateRequiredEmail,
  validateRequiredPassword,
} from 'utils/validators';

export type FormValues = {
  first_name: string;
  last_name: string;
  password: string;
  password_confirmation: string;
  email: string;
};

type SignupFormProps = {
  onSubmit(values: FormValues, helpers: FormikHelpers<FormValues>): void;
  loading?: boolean;
  initialValues: SignUpUser;
};

const SignUpSchema = Yup.object({
  first_name: validateFirstName(),
  last_name: validateLastName(),
  email: validateRequiredEmail(),
  password: validateRequiredPassword(),
  password_confirmation: validateConfirmPasswordRequired().oneOf(
    [Yup.ref('password'), 'password'],
    'validation.confirm.password.not.match',
  ),
});

export const SignUpScreenForm = ({
  onSubmit,
  loading,
  initialValues,
}: SignupFormProps) => {
  const ref1 = useRef<any>();
  const ref2 = useRef<any>();
  const ref3 = useRef<any>();
  const ref4 = useRef<any>();

  return (
    <Formik<FormValues>
      initialValues={initialValues}
      enableReinitialize
      validationSchema={SignUpSchema}
      onSubmit={onSubmit}>
      {props => {
        return (
          <Box bg="mainBackground">
            <FormTextInput
              name="first_name"
              placeholder="first.name"
              textAlignVertical="center"
              autoCapitalize="words"
              maxLength={25}
              autoFocus={true}
              returnKeyType="next"
              onSubmitEditing={() => ref1.current.focus()}
            />
            <FormTextInput
              name="last_name"
              placeholder="last.name"
              textAlignVertical="center"
              autoCapitalize="words"
              maxLength={25}
              returnKeyType="next"
              onSubmitEditing={() => ref2.current.focus()}
              ref={ref1}
            />
            <FormTextInput
              name="email"
              placeholder="user.email"
              keyboardType="email-address"
              maxLength={30}
              returnKeyType="next"
              textAlignVertical="center"
              onSubmitEditing={() => ref3.current.focus()}
              ref={ref2}
            />
            <FormPasswordInput
              name="password"
              placeholder="user.password"
              textAlignVertical="center"
              returnKeyType="next"
              onSubmitEditing={() => ref4.current.focus()}
              ref={ref3}
            />
            <FormPasswordInput
              name="password_confirmation"
              placeholder="confirm.password"
              textAlignVertical="center"
              ref={ref4}
            />
            <Button
              title="signup.button"
              loading={loading}
              variant="primary"
              onPress={props.handleSubmit as PressEvent}
            />
          </Box>
        );
      }}
    </Formik>
  );
};
