import React, {useRef} from 'react';
import {Box} from 'atoms/Box';
import {Formik, FormikHelpers} from 'formik';
import {FormTextInput} from 'molecules/FormTextInput';
import {Button} from 'molecules/Button';
import {PressEvent} from 'typings/utils';
import {editNewNotesType} from 'typings/editNote.type';
import * as yup from 'yup';
import {
  validateRequired25letters,
  validateSummryRequired,
} from 'utils/validators';

type FormValues = {
  title: string;
  editNotes: string;
};

type NoteEditFormProps = {
  onSubmit(values: FormValues, helpers: FormikHelpers<FormValues>): void;
  loading?: boolean;
  error?: string;
  initialValues: editNewNotesType;
};

const editNotesSchema = yup.object({
  title: validateRequired25letters(),
  editNotes: validateSummryRequired(),
});

export const NoteEditForm = ({
  onSubmit,
  loading,
  initialValues,
}: NoteEditFormProps) => {
  const ref1 = useRef<any>();
  // const ref2 = useRef<any>();

  return (
    <Formik<FormValues>
      initialValues={initialValues}
      enableReinitialize
      validationSchema={editNotesSchema}
      onSubmit={onSubmit}>
      {({handleSubmit}) => {
        return (
          <Box height="100%" bg="mainBackground" mt="ml">
            <FormTextInput
              name="title"
              placeholder="edit.note.title"
              textAlignVertical="center"
              autoCapitalize="sentences"
              autoFocus
              onSubmitEditing={() => ref1.current.focus()}
              returnKeyType="next"
            />
            <FormTextInput
              name="editNotes"
              placeholder="edit.note.summry"
              height={230}
              multiline
              textAlignVertical="top"
              autoCapitalize="sentences"
              ref={ref1}
            />
            <Button
              title="edit.notes.button"
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
