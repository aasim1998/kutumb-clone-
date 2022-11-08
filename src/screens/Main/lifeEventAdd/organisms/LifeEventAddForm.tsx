import React from 'react';
import {Box} from 'atoms/Box';
import {Formik, FormikHelpers} from 'formik';
import {FormTextInput} from 'molecules/FormTextInput';
import {Button} from 'molecules/Button';
import {PressEvent} from 'typings/utils';
import {FormSelectInput} from 'molecules/FormSelectInput';
import * as yup from 'yup';
import {validateRequiredField, validateSummryRequired} from 'utils/validators';
import {addLifeEventType} from 'typings/addLifeEvent.type';
import {LifeEventGroupProps} from 'typings/lifeEventGroup.type';

type FormValues = {
  name: string;
  group_id: string;
};

const addLifeEventSchema = yup.object({
  name: validateRequiredField(),
  group_id: validateSummryRequired(),
});

type AddLifeEventFormProps = {
  onSubmit(values: FormValues, helpers: FormikHelpers<FormValues>): void;
  loading?: boolean;
  error?: string;
  initialValues: addLifeEventType;
  list: Array<LifeEventGroupProps>;
};

export const LifeEventAddForm = ({
  onSubmit,
  loading,
  initialValues,
  list,
}: AddLifeEventFormProps) => {
  return (
    <Formik<FormValues>
      initialValues={initialValues}
      validationSchema={addLifeEventSchema}
      enableReinitialize
      onSubmit={onSubmit}>
      {({handleSubmit}) => {
        return (
          <Box height="100%" bg="mainBackground">
            <FormSelectInput
              name="group_id"
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
              title="add.life.event.button"
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
