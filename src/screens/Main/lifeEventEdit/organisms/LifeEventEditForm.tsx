import React from 'react';
import {Box} from 'atoms/Box';
import {Formik, FormikHelpers} from 'formik';
import {FormTextInput} from 'molecules/FormTextInput';
import {Button} from 'molecules/Button';
import {PressEvent} from 'typings/utils';
import * as yup from 'yup';
import {validateRequiredField} from 'utils/validators';
import {editLifeEventType} from 'typings/editLifeEvent.type';
import {Text} from 'atoms/Text';

type FormValues = {
  name: string;
};

const editLifeEventSchema = yup.object({
  name: validateRequiredField(),
});

type EditLifeEventFormProps = {
  onSubmit(values: FormValues, helpers: FormikHelpers<FormValues>): void;
  loading?: boolean;
  error?: string;
  initialValues: editLifeEventType;
};

export const LifeEventEditForm = ({
  onSubmit,
  loading,
  initialValues,
}: EditLifeEventFormProps) => {
  return (
    <Formik<FormValues>
      initialValues={initialValues}
      validationSchema={editLifeEventSchema}
      enableReinitialize
      onSubmit={onSubmit}>
      {({handleSubmit}) => {
        return (
          <Box height="100%" bg="mainBackground">
            <Text variant="text_Base" mb="s" localeId="life.event.title" />
            <FormTextInput
              name="name"
              placeholder="placeholder.life.event"
              textAlignVertical="center"
              autoCapitalize="sentences"
              maxLength={25}
              returnKeyType="done"
            />
            <Button
              title="edit.life.event.button"
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
