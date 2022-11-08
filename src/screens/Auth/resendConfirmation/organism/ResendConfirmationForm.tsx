import React from 'react';
import {Box} from 'atoms/Box';
import {Formik, FormikHelpers} from 'formik';
import {Button} from 'molecules/Button';
import {PressEvent} from 'typings/utils';
import * as Yup from 'yup';
import {validateRequiredEmail} from 'utils/validators';
import {FormEmailInput} from 'molecules/FormEmailInput';
import {resendConfirmationType} from 'typings/resendConfirmation.type';

export type FormValues = {
  email: string;
};

type ResendConfirmationFormProps = {
  onSubmit(values: FormValues, helpers: FormikHelpers<FormValues>): void;
  loading?: boolean;
  initialValues: resendConfirmationType;
};

const ResendConfirmationSchema = Yup.object({
  email: validateRequiredEmail(),
});

export const ResendConfirmationForm = ({
  onSubmit,
  loading,
  initialValues,
}: ResendConfirmationFormProps) => {
  return (
    <Formik<FormValues>
      initialValues={initialValues}
      enableReinitialize
      validationSchema={ResendConfirmationSchema}
      onSubmit={onSubmit}>
      {props => {
        return (
          <Box height="100%" bg="mainBackground" mt="ml">
            <FormEmailInput
              name="email"
              textAlignVertical="center"
              returnKeyType="done"
            />
            <Button
              title="resend.confirmation.title"
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
