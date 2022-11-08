import React, {useRef} from 'react';
import {Box} from 'atoms/Box';
import {Formik, FormikHelpers} from 'formik';
import {FormTextInput} from 'molecules/FormTextInput';
import {Button} from 'molecules/Button';
import {PressEvent} from 'typings/utils';
import * as yup from 'yup';
import {addNewNotesType} from 'typings/addNewNote.type';
import {
  validateRequired25letters,
  validateSummryRequired,
} from 'utils/validators';

type FormValues = {
  title: string;
  addNotes: string;
};

const addNotesSchema = yup.object({
  title: validateRequired25letters(),
  addNotes: validateSummryRequired(),
});

type NoteAddFormProps = {
  onSubmit(values: FormValues, helpers: FormikHelpers<FormValues>): void;
  loading?: boolean;
  error?: string;
  initialValues: addNewNotesType;
};

export const NoteAddForm = ({
  onSubmit,
  loading,
  initialValues,
}: NoteAddFormProps) => {
  const ref1 = useRef<any>();
  // const ref2 = useRef<any>();

  return (
    <Formik<FormValues>
      validationSchema={addNotesSchema}
      initialValues={initialValues}
      enableReinitialize
      onSubmit={onSubmit}>
      {({handleSubmit}) => {
        return (
          <Box height="100%" bg="mainBackground" mt="ml">
            <FormTextInput
              name="title"
              placeholder="placeholder.title"
              textAlignVertical="center"
              autoCapitalize="sentences"
              autoFocus
              onSubmitEditing={() => ref1.current.focus()}
              returnKeyType="next"
            />
            <FormTextInput
              name="addNotes"
              placeholder="placeholder.summry"
              height={230}
              multiline
              textAlignVertical="top"
              autoCapitalize="sentences"
              ref={ref1}
            />
            <Button
              title="add.notes.button"
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
