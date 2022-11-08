import React from 'react';
import {Box} from 'atoms/Box';
import {Formik, FormikHelpers} from 'formik';
import {Button} from 'molecules/Button';
import {PressEvent} from 'typings/utils';
import {addNewRelationType} from 'typings/addNewRelation.type';
import {FormSelectInput} from 'molecules/FormSelectInput';
import {RelationProps} from 'typings/relation.type';

type FormValues = {
  relation: string;
};

type AddRelativeFormProps = {
  onSubmit(values: FormValues, helpers: FormikHelpers<FormValues>): void;
  loading?: boolean;
  error?: string;
  initialValues: addNewRelationType;
  list: Array<RelationProps>;
};

export const AddRelativeForm = ({
  onSubmit,
  loading,
  initialValues,
  list,
}: AddRelativeFormProps) => {
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
              placeholder="select.relation"
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
