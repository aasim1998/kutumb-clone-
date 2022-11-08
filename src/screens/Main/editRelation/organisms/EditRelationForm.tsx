import React from 'react';
import {Box} from 'atoms/Box';
import {Formik, FormikHelpers} from 'formik';
import {FormTextInput} from 'molecules/FormTextInput';
import {Button} from 'molecules/Button';
import {PressEvent} from 'typings/utils';
import {editRelation} from 'typings/editrelation.type';
import * as yup from 'yup';
import {validateLabelRelationField} from 'utils/validators';
import {deviceHeight} from 'utils/device';
type FormValues = {
  editRelation: string;
  color: string;
};
type EditRelationFormProps = {
  onSubmit(values: FormValues, helpers: FormikHelpers<FormValues>): void;
  loading?: boolean;
  initialValues: editRelation;
};
const editRelationSchema = yup.object({
  editRelation: validateLabelRelationField(),
});
export const EditRelationForm = ({
  onSubmit,
  loading,
  initialValues,
}: EditRelationFormProps) => {
  return (
    <Formik<FormValues>
      initialValues={initialValues}
      enableReinitialize
      onSubmit={onSubmit}
      validationSchema={editRelationSchema}>
      {({handleSubmit}) => {
        return (
          <Box height="100%" bg="mainBackground">
            <FormTextInput
              name="editRelation"
              placeholder="placeholder.editRelation"
              textAlignVertical="center"
              maxLength={25}
              autoCapitalize="sentences"
            />
            <Button
              title="editrelation.btn.title"
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
