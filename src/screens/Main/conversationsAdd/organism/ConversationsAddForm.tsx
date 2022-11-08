import React from 'react';
import {Box} from 'atoms/Box';
import {Formik, FormikHelpers} from 'formik';
import {FormTextInput} from 'molecules/FormTextInput';
import {Button} from 'molecules/Button';
import {PressEvent} from 'typings/utils';
import * as yup from 'yup';
import {validateSummryRequired} from 'utils/validators';
import {addConversationType} from 'typings/addConversation.type';
import {FormDateInput} from 'molecules/FormDateInput';
import {FormSelectInput} from 'molecules/FormSelectInput';
import {ContactFieldTypesProps} from 'typings/contactFieldTypes.type';

type FormValues = {
  date: string;
  field: string;
  body: string;
};

const addConversationSchema = yup.object({
  field: validateSummryRequired(),
  body: validateSummryRequired(),
});

type ConversationAddFormProps = {
  onSubmit(values: FormValues, helpers: FormikHelpers<FormValues>): void;
  loading?: boolean;
  error?: string;
  initialValues: addConversationType;
  list: Array<ContactFieldTypesProps>;
};

export const ConversationsAddForm = ({
  onSubmit,
  loading,
  initialValues,
  list,
}: ConversationAddFormProps) => {
  return (
    <Formik<FormValues>
      validationSchema={addConversationSchema}
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
              initialDate={new Date()}
            />
            <FormSelectInput
              name="field"
              options={list}
              placeholder="select.contact.field"
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
              title="add.conversation.button"
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
