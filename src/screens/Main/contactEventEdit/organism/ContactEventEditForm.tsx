import React, {useRef} from 'react';
import {Box} from 'atoms/Box';
import {Formik, FormikHelpers} from 'formik';
import {FormTextInput} from 'molecules/FormTextInput';
import {Button} from 'molecules/Button';
import {PressEvent} from 'typings/utils';
import * as yup from 'yup';
import {validateRequired25letters} from 'utils/validators';
import {FormDateInput} from 'molecules/FormDateInput';
import {editContactEventType} from 'typings/editContactEvent.type';

type FormValues = {
  title: string;
  body: string;
  date: string;
};

const editEventSchema = yup.object({
  title: validateRequired25letters(),
});

type ContactEditEventFormProps = {
  onSubmit(values: FormValues, helpers: FormikHelpers<FormValues>): void;
  loading?: boolean;
  error?: string;
  initialValues: editContactEventType;
};

export const ContactEventEditForm = ({
  onSubmit,
  loading,
  initialValues,
}: ContactEditEventFormProps) => {
  const ref1 = useRef<any>();

  return (
    <Formik<FormValues>
      validationSchema={editEventSchema}
      initialValues={initialValues}
      enableReinitialize
      onSubmit={onSubmit}>
      {({handleSubmit}) => {
        return (
          <Box height="100%" bg="mainBackground" mt="ml">
            <FormTextInput
              name="title"
              placeholder="placeholder.title"
              autoFocus
              textAlignVertical="center"
              autoCapitalize="sentences"
              onSubmitEditing={() => ref1.current.focus()}
              returnKeyType="next"
            />
            <FormTextInput
              name="body"
              placeholder="placeholder.summry"
              height={100}
              multiline
              textAlignVertical="top"
              autoCapitalize="sentences"
              ref={ref1}
              returnKeyType="done"
            />
            <FormDateInput
              name="date"
              textAlignVertical="center"
              placeholder="placeholder.dueDate"
            />
            <Button
              title="add.event.button"
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
