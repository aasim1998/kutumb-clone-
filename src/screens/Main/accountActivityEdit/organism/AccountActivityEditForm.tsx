import React from 'react';
import {Box} from 'atoms/Box';
import {Formik, FormikHelpers} from 'formik';
import {FormTextInput} from 'molecules/FormTextInput';
import {Button} from 'molecules/Button';
import {PressEvent} from 'typings/utils';
import * as yup from 'yup';
import {validateRequiredField} from 'utils/validators';
import {editAccountActivityType} from 'typings/editAccountActivity';

type FormValues = {
  name: string;
};

const editAccountActivitySchema = yup.object({
  name: validateRequiredField(),
});

type EditAccountActivityFormProps = {
  onSubmit(values: FormValues, helpers: FormikHelpers<FormValues>): void;
  loading?: boolean;
  error?: string;
  initialValues: editAccountActivityType;
};

export const AccountActivityEditForm = ({
  onSubmit,
  loading,
  initialValues,
}: EditAccountActivityFormProps) => {
  return (
    <Formik<FormValues>
      initialValues={initialValues}
      validationSchema={editAccountActivitySchema}
      enableReinitialize
      onSubmit={onSubmit}>
      {({handleSubmit}) => {
        return (
          <Box height="100%" bg="mainBackground">
            <FormTextInput
              name="name"
              placeholder="placeholder.activity"
              textAlignVertical="center"
              autoCapitalize="sentences"
              maxLength={25}
              returnKeyType="done"
            />
            <Button
              title="edit.account.activity.button"
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
