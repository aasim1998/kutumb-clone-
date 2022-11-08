import React from 'react';
import {Box} from 'atoms/Box';
import {Formik, FormikHelpers} from 'formik';
import {FormTextInput} from 'molecules/FormTextInput';
import {Button} from 'molecules/Button';
import {PressEvent} from 'typings/utils';
import * as yup from 'yup';
import {validateSummryRequired} from 'utils/validators';
import {FormDateInput} from 'molecules/FormDateInput';
import {FormSelectInput} from 'molecules/FormSelectInput';
import {ContactFieldTypesProps} from 'typings/contactFieldTypes.type';
import {editConversationType} from 'typings/editConversation.type';

type FormValues = {
  date: string;
  field: string;
  body: string;
};

const editConversationSchema = yup.object({
  field: validateSummryRequired(),
  body: validateSummryRequired(),
});

type ConversationEditFormProps = {
  onSubmit(values: FormValues, helpers: FormikHelpers<FormValues>): void;
  loading?: boolean;
  error?: string;
  initialValues: editConversationType;
  list: Array<ContactFieldTypesProps>;
};

export const ConversationsEditForm = ({
  onSubmit,
  loading,
  initialValues,
  list,
}: ConversationEditFormProps) => {
  return (
    <Formik<FormValues>
      validationSchema={editConversationSchema}
      initialValues={initialValues}
      enableReinitialize
      onSubmit={onSubmit}>
      {({handleSubmit}) => {
        return (
          <Box height="100%" bg="mainBackground" mt="ml">
            <FormDateInput
              name="date"
              textAlignVertical="center"
              placeholder="placeholder.conversation.date"
            />
            <FormSelectInput
              name="field"
              options={list}
              values={
                initialValues.field !== undefined ? initialValues.field : ''
              }
            />
            <FormTextInput
              name="body"
              placeholder="placeholder.summry"
              height={230}
              multiline
              autoFocus
              textAlignVertical="top"
              autoCapitalize="sentences"
              marginTop="-sl"
            />
            <Button
              title="edit.conversation.button"
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
