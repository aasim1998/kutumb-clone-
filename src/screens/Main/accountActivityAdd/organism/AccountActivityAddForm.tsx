import React from 'react';
import {Box} from 'atoms/Box';
import {Formik, FormikHelpers} from 'formik';
import {FormTextInput} from 'molecules/FormTextInput';
import {Button} from 'molecules/Button';
import {PressEvent} from 'typings/utils';
import {FormSelectInput} from 'molecules/FormSelectInput';
import * as yup from 'yup';
import {validateRequiredField} from 'utils/validators';
import {addAccountActivityType} from 'typings/addAccountActivity.type';
import {AccountActivitiesGroupProps} from 'typings/accountActivitiesGroup.type';

type FormValues = {
  name: string;
  group: string;
};

const addAccountActivitySchema = yup.object({
  name: validateRequiredField(),
});

type AddAccountActivityFormProps = {
  onSubmit(values: FormValues, helpers: FormikHelpers<FormValues>): void;
  loading?: boolean;
  error?: string;
  initialValues: addAccountActivityType;
  list: Array<AccountActivitiesGroupProps>;
};

export const AccountActivityAddForm = ({
  onSubmit,
  loading,
  initialValues,
  list,
}: AddAccountActivityFormProps) => {
  return (
    <Formik<FormValues>
      initialValues={initialValues}
      validationSchema={addAccountActivitySchema}
      enableReinitialize
      onSubmit={onSubmit}>
      {({handleSubmit}) => {
        return (
          <Box height="100%" bg="mainBackground">
            <FormSelectInput
              name="group"
              options={list}
              placeholder="select.group"
            />
            <Box mt={'-sl'} />
            <FormTextInput
              name="name"
              placeholder="placeholder.activity"
              textAlignVertical="center"
              autoCapitalize="sentences"
              maxLength={25}
              returnKeyType="done"
            />
            <Button
              title="add.account.activity.button"
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
