import React, {useRef} from 'react';
import {Box} from 'atoms/Box';
import {Formik, FormikHelpers} from 'formik';
import {editContactTasks} from 'typings/editcontacttasks.type';
import {FormTextInput} from 'molecules/FormTextInput';
import {Button} from 'molecules/Button';
import {PressEvent} from 'typings/utils';
import * as yup from 'yup';
import {validateSummryRequired} from 'utils/validators';
import {FormDateInput} from 'molecules/FormDateInput';

type FormValues = {
  title: string;
  editTask: string;
  dueDate: string;
};

type EditContactTasksFormProps = {
  onSubmit(values: FormValues, helpers: FormikHelpers<FormValues>): void;
  loading?: boolean;
  error?: string;
  initialValues: editContactTasks;
};

const editContactTaskSchema = yup.object({
  title: validateSummryRequired(),
});
export const EditContactTasksForm = ({
  onSubmit,
  loading,
  initialValues,
}: EditContactTasksFormProps) => {
  const ref1 = useRef<any>();

  return (
    <Formik<FormValues>
      initialValues={initialValues}
      enableReinitialize
      validationSchema={editContactTaskSchema}
      onSubmit={onSubmit}>
      {props => {
        return (
          <Box height="100%" bg="mainBackground" mt="ml">
            <FormTextInput
              name="title"
              placeholder="edit.task.title"
              autoFocus
              textAlignVertical="center"
              autoCapitalize="sentences"
              onSubmitEditing={() => ref1.current.focus()}
              returnKeyType="next"
            />
            <FormTextInput
              name="editTask"
              placeholder="edit.task.summry"
              multiline
              height={200}
              textAlignVertical="top"
              autoCapitalize="sentences"
              ref={ref1}
            />
            <FormDateInput
              name="dueDate"
              textAlignVertical="center"
              placeholder="placeholder.dueDate"
              minimumDate={'today'}
            />
            <Button
              title="btn.edit.task.title"
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
