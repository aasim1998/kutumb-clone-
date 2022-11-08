import React from 'react';
import {Box} from 'atoms/Box';
import {Formik, FormikHelpers} from 'formik';
import {Button} from 'molecules/Button';
import {PressEvent} from 'typings/utils';
import {editRelative} from 'typings/editRelative.type';
import {FormSelectInput} from 'molecules/FormSelectInput';
import {RelationProps} from 'typings/relation.type';

type FormValues = {
  relation: string;
};

type EditRelativeFormProps = {
  onSubmit(values: FormValues, helpers: FormikHelpers<FormValues>): void;
  loading?: boolean;
  error?: string;
  initialValues: editRelative;
  list: Array<RelationProps>;
};

export const EditRelativeForm = ({
  onSubmit,
  loading,
  initialValues,
  list,
}: EditRelativeFormProps) => {
  return (
    <Formik<FormValues>
      initialValues={initialValues}
      enableReinitialize
      onSubmit={onSubmit}>
      {({handleSubmit}) => {
        return (
          <Box height="100%" bg="mainBackground">
            <FormSelectInput
              name="relation"
              options={list}
              values={
                initialValues.relation !== undefined
                  ? initialValues.relation
                  : ''
              }
            />
            <Box mt={'-sl'}>
              <Button
                title="add.relation.button"
                loading={loading}
                variant="primary"
                onPress={handleSubmit as PressEvent}
              />
            </Box>
          </Box>
        );
      }}
    </Formik>
  );
};
