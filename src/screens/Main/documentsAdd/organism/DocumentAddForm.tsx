import React from 'react';
import {Box} from 'atoms/Box';
import {Formik, FormikHelpers} from 'formik';
import {FormTextInput} from 'molecules/FormTextInput';
import {Button} from 'molecules/Button';
import {PressEvent} from 'typings/utils';
import * as yup from 'yup';
import {validateSummryRequired} from 'utils/validators';
import {addNewDocumentType} from 'typings/addNewDocument.type';

type FormValues = {
  filename: string;
  comments: string;
  link: string;
};

const addDocumentSchema = yup.object({
  filename: validateSummryRequired(),
  link: validateSummryRequired(),
});

type DocumentAddFormProps = {
  onSubmit(values: FormValues, helpers: FormikHelpers<FormValues>): void;
  loading?: boolean;
  error?: string;
  initialValues: addNewDocumentType;
};

export const DocumentAddForm = ({
  onSubmit,
  loading,
  initialValues,
}: DocumentAddFormProps) => {
  return (
    <Formik<FormValues>
      validationSchema={addDocumentSchema}
      initialValues={initialValues}
      enableReinitialize
      onSubmit={onSubmit}>
      {({handleSubmit}) => {
        return (
          <Box height="100%" bg="mainBackground" mt="ml">
            <FormTextInput
              name="filename"
              placeholder="placeholder.filename"
              autoFocus
              textAlignVertical="center"
              autoCapitalize="sentences"
            />
            <FormTextInput
              name="link"
              placeholder="placeholder.link"
              textAlignVertical="center"
            />
            <FormTextInput
              name="comments"
              placeholder="placeholder.summry"
              textAlignVertical="center"
              autoCapitalize="sentences"
            />
            <Button
              title="add.document.button"
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
