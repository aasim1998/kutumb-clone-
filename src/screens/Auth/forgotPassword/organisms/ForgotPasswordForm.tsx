import React from 'react';
import {Box} from 'atoms/Box';
import {Formik, FormikHelpers} from 'formik';
import {Button} from 'molecules/Button';
import {PressEvent} from 'typings/utils';
import {forgetPasswordType} from 'typings/forgot.type';
import * as Yup from 'yup';
import {validateRequiredEmail} from 'utils/validators';
import {FormEmailInput} from 'molecules/FormEmailInput';

export type FormValues = {
  email: string;
};

type ForgotFormProps = {
  onSubmit(values: FormValues, helpers: FormikHelpers<FormValues>): void;
  loading?: boolean;
  initialValues: forgetPasswordType;
};

const ForgotPasswordSchema = Yup.object({
  email: validateRequiredEmail(),
});

export const ForgotPasswordForm = ({
  onSubmit,
  loading,
  initialValues,
}: ForgotFormProps) => {
  return (
    <Formik<FormValues>
      initialValues={initialValues}
      enableReinitialize
      validationSchema={ForgotPasswordSchema}
      onSubmit={onSubmit}>
      {props => {
        return (
          <Box height="100%" bg="mainBackground" mt="ml">
            <FormEmailInput name="email" textAlignVertical="center" />
            <Button
              title="reset.btn.title"
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
