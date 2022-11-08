import React from 'react';
import {Box} from 'atoms/Box';
import {Formik, FormikHelpers} from 'formik';
import {FormTextInput} from 'molecules/FormTextInput';
import {Button} from 'molecules/Button';
import {PressEvent} from 'typings/utils';
import * as yup from 'yup';
import {validateSummryRequired} from 'utils/validators';
import {editDocumentType} from 'typings/editDocument.type';

type FormValues = {
  link: string;
  comments: string;
};

const editDocumentSchema = yup.object({
  link: validateSummryRequired(),
});

type DocumentEditFormProps = {
  onSubmit(values: FormValues, helpers: FormikHelpers<FormValues>): void;
  loading?: boolean;
  error?: string;
  initialValues: editDocumentType;
};

export const DocumentEditForm = ({
  onSubmit,
  loading,
  initialValues,
}: DocumentEditFormProps) => {
  return (
    <Formik<FormValues>
      validationSchema={editDocumentSchema}
      initialValues={initialValues}
      enableReinitialize
      onSubmit={onSubmit}>
      {({handleSubmit}) => {
        return (
          <Box height="100%" bg="mainBackground" mt="ml">
            <FormTextInput
              name="link"
              placeholder="placeholder.link"
              autoFocus
              textAlignVertical="center"
            />
            <FormTextInput
              name="comments"
              placeholder="placeholder.summry"
              textAlignVertical="center"
              autoCapitalize="sentences"
            />
            <Button
              title="edit.document"
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
