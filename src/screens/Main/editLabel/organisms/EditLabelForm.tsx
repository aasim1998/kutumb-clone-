import React from 'react';
import {Box} from 'atoms/Box';
import {Formik, FormikHelpers} from 'formik';
import {FormTextInput} from 'molecules/FormTextInput';
import {Button} from 'molecules/Button';
import {PressEvent} from 'typings/utils';
import {editLabel} from 'typings/editlabel.type';
import * as yup from 'yup';
import {validateLabelRelationField} from 'utils/validators';
import {deviceHeight} from 'utils/device';
type FormValues = {
  editLabel: string;
  color: string;
};
type EditLabelFormProps = {
  onSubmit(values: FormValues, helpers: FormikHelpers<FormValues>): void;
  loading?: boolean;
  initialValues: editLabel;
};
const editLabelSchema = yup.object({
  editLabel: validateLabelRelationField(),
});
export const EditLabelForm = ({
  onSubmit,
  loading,
  initialValues,
}: EditLabelFormProps) => {
  return (
    <Formik<FormValues>
      initialValues={initialValues}
      enableReinitialize
      onSubmit={onSubmit}
      validationSchema={editLabelSchema}>
      {({handleSubmit}) => {
        return (
          <Box height="100%" bg="mainBackground">
            <FormTextInput
              name="editLabel"
              placeholder="placeholder.editLabel"
              textAlignVertical="center"
              maxLength={25}
              autoCapitalize="sentences"
            />
            <Button
              title="editlabel.btn.title"
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
