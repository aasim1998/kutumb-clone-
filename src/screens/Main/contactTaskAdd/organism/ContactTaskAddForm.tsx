import React, {useRef} from 'react';
import {Box} from 'atoms/Box';
import {Formik, FormikHelpers} from 'formik';
import {addContactAddTaskType} from 'typings/addcontacttask.type';
import {FormTextInput} from 'molecules/FormTextInput';
import {Button} from 'molecules/Button';
import {PressEvent} from 'typings/utils';
import * as yup from 'yup';
import {validateRequired25letters} from 'utils/validators';
import {FormDateInput} from 'molecules/FormDateInput';

type FormValues = {
  title: string;
  addTask: string;
  dueDate: string;
};
const addTaskSchema = yup.object({
  title: validateRequired25letters(),
});
type ContactAddTaskFormProps = {
  onSubmit(values: FormValues, helpers: FormikHelpers<FormValues>): void;
  loading?: boolean;
  error?: string;
  initialValues: addContactAddTaskType;
};
export const ContactTaskAddForm = ({
  onSubmit,
  loading,
  initialValues,
}: ContactAddTaskFormProps) => {
  const ref1 = useRef<any>();

  return (
    <Formik<FormValues>
      validationSchema={addTaskSchema}
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
              name="addTask"
              placeholder="placeholder.summry"
              height={200}
              multiline
              textAlignVertical="top"
              autoCapitalize="sentences"
              ref={ref1}
            />
            <FormDateInput
              name="dueDate"
              textAlignVertical="center"
              placeholder="placeholder.dueDate"
              minimumDate={'today'}
              initialDate={new Date()}
            />
            <Button
              title="add.task.button"
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
