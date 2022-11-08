import React, {useRef} from 'react';
import {Box} from 'atoms/Box';
import {Formik, FormikHelpers} from 'formik';
import {FormTextInput} from 'molecules/FormTextInput';
import {Button} from 'molecules/Button';
import {PressEvent} from 'typings/utils';
import * as yup from 'yup';
import {validateSummryRequired} from 'utils/validators';
import {FormDateInput} from 'molecules/FormDateInput';
import {EditContactActivity} from 'typings/editContactActivity.type';

type FormValues = {
  title: string;
  body: string;
  date: string;
};

type EditContactActivityFormProps = {
  onSubmit(values: FormValues, helpers: FormikHelpers<FormValues>): void;
  loading?: boolean;
  error?: string;
  initialValues: EditContactActivity;
};

const editContactActivitySchema = yup.object({
  title: validateSummryRequired(),
  body: validateSummryRequired(),
});
export const EditContactActivitiesForm = ({
  onSubmit,
  loading,
  initialValues,
}: EditContactActivityFormProps) => {
  const ref1 = useRef<any>();

  return (
    <Formik<FormValues>
      initialValues={initialValues}
      enableReinitialize
      validationSchema={editContactActivitySchema}
      onSubmit={onSubmit}>
      {props => {
        return (
          <Box height="100%" bg="mainBackground" mt="ml">
            <FormTextInput
              name="title"
              placeholder="edit.contactActivity.title"
              autoFocus
              textAlignVertical="center"
              autoCapitalize="sentences"
              onSubmitEditing={() => ref1.current.focus()}
              returnKeyType="next"
            />
            <FormTextInput
              name="body"
              placeholder="edit.contactActivity.summry"
              multiline
              height={100}
              textAlignVertical="top"
              autoCapitalize="sentences"
              ref={ref1}
            />
            <FormDateInput
              name="date"
              textAlignVertical="center"
              placeholder="placeholder.date"
            />
            <Button
              title="edit.activity"
              loading={loading}
              variant="primary"
              onPress={props.handleSubmit as PressEvent}
            />
          </Box>
        );
      }}
    </Formik>
  );
};
