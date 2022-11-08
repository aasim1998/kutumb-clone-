import React, {useRef} from 'react';
import {Box} from 'atoms/Box';
import {Formik, FormikHelpers} from 'formik';
import {addChangePasswordType} from 'typings/changepassword.type';
import {Button} from 'molecules/Button';
import * as yup from 'yup';
import {PressEvent} from 'typings/utils';
import {
  validateConfirmPasswordRequired,
  validateNewPasswordRequired,
  validateOldPasswordRequired,
} from 'utils/validators';
import {FormPasswordInput} from 'molecules/FormPasswordInput';

type FormValues = {
  profileOldPassword: string;
  profileNewPassword: string;
  profileConfirmPassword: string;
};

type ChangePasswordFormProps = {
  onSubmit(values: FormValues, helpers: FormikHelpers<FormValues>): void;
  loading?: boolean;
  error?: string;
  initialValues: addChangePasswordType;
};

const passwordSchema = yup.object({
  profileOldPassword: validateOldPasswordRequired(),
  profileNewPassword: validateNewPasswordRequired(),
  profileConfirmPassword: validateConfirmPasswordRequired(),
});

export const ChangePasswordForm = ({
  onSubmit,
  loading,
  initialValues,
}: ChangePasswordFormProps) => {
  const ref1 = useRef<any>();
  const ref2 = useRef<any>();
  return (
    <Formik<FormValues>
      validationSchema={passwordSchema}
      initialValues={initialValues}
      enableReinitialize
      onSubmit={onSubmit}>
      {({handleSubmit}) => {
        return (
          <Box height="100%" bg="mainBackground">
            <FormPasswordInput
              name="profileOldPassword"
              placeholder="old.password"
              textAlignVertical="center"
              returnKeyType="next"
              onSubmitEditing={() => ref1.current.focus()}
            />
            <FormPasswordInput
              name="profileNewPassword"
              placeholder="new.password"
              textAlignVertical="center"
              returnKeyType="next"
              onSubmitEditing={() => ref2.current.focus()}
              ref={ref1}
            />
            <FormPasswordInput
              name="profileConfirmPassword"
              placeholder="confirm.password"
              textAlignVertical="center"
              ref={ref2}
            />
            <Button
              title="changePassword.title"
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
