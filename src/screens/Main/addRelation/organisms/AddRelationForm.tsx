import React from 'react';
import {Box} from 'atoms/Box';
import {Formik, FormikHelpers} from 'formik';
import {FormTextInput} from 'molecules/FormTextInput';
import {Button} from 'molecules/Button';
import {PressEvent} from 'typings/utils';
import {addRelation} from 'typings/addrelation.type';
import * as yup from 'yup';
import {validateLabelRelationField} from 'utils/validators';
type FormValues = {
  addRelation: string;
};
type AddRelationFormProps = {
  onSubmit(values: FormValues, helpers: FormikHelpers<FormValues>): void;
  loading?: boolean;
  initialValues: addRelation;
};
const addRelationSchema = yup.object({
  addRelation: validateLabelRelationField(),
});
export const AddRelationForm = ({
  onSubmit,
  loading,
  initialValues,
}: AddRelationFormProps) => {
  return (
    <Formik<FormValues>
      initialValues={initialValues}
      enableReinitialize
      onSubmit={onSubmit}
      validationSchema={addRelationSchema}>
      {({handleSubmit}) => {
        return (
          <Box height="100%" bg="mainBackground">
            <FormTextInput
              name="addRelation"
              placeholder="placeholder.relation"
              textAlignVertical="center"
              maxLength={25}
              autoCapitalize="sentences"
            />
            <Button
              title="addrelation.btn.title"
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
