import React from 'react';
import {Box} from 'atoms/Box';
import {Formik, FormikHelpers} from 'formik';
import {FormTextInput} from 'molecules/FormTextInput';
import {Button} from 'molecules/Button';
import {PressEvent} from 'typings/utils';
import {addLabel} from 'typings/addlabel.type';
import * as yup from 'yup';
import {validateLabelRelationField} from 'utils/validators';
import {deviceHeight} from 'utils/device';
type FormValues = {
  addLabel: string;
  color: string;
};
type AddLabelFormProps = {
  onSubmit(values: FormValues, helpers: FormikHelpers<FormValues>): void;
  loading?: boolean;
  initialValues: addLabel;
};
const addLabelSchema = yup.object({
  addLabel: validateLabelRelationField(),
});
export const AddLabelForm = ({
  onSubmit,
  loading,
  initialValues,
}: AddLabelFormProps) => {
  return (
    <Formik<FormValues>
      initialValues={initialValues}
      enableReinitialize
      onSubmit={onSubmit}
      validationSchema={addLabelSchema}>
      {({handleSubmit}) => {
        return (
          <Box height="100%" bg="mainBackground">
            <FormTextInput
              name="addLabel"
              placeholder="placeholder.label"
              textAlignVertical="center"
              maxLength={25}
              autoCapitalize="sentences"
            />
            <Button
              title="addlabel.btn.title"
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
