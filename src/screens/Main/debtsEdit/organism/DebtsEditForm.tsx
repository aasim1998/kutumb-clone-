import React, {useRef, useState} from 'react';
import {Box} from 'atoms/Box';
import {Formik, FormikHelpers} from 'formik';
import {editDebt} from 'typings/editDebt.type';
import {FormTextInput} from 'molecules/FormTextInput';
import {Button} from 'molecules/Button';
import {PressEvent} from 'typings/utils';
import * as yup from 'yup';
import {
  validateRequiredAmount,
  validateRequired25letters,
} from 'utils/validators';
import {FormDateInput} from 'molecules/FormDateInput';
import {Text} from 'atoms/Text';
import {FormRadioButton} from 'molecules/FormRadioButton';

type FormValues = {
  title: string;
  amount: string;
  owed_by: string;
  due_date: string;
};

const editDebtSchema = yup.object({
  title: validateRequired25letters(),
  amount: validateRequiredAmount(),
});

type EditDebtFormProps = {
  onSubmit(values: FormValues, helpers: FormikHelpers<FormValues>): void;
  loading?: boolean;
  error?: string;
  initialValues: editDebt;
  fullName: string;
};

export const DebtEditForm = ({
  onSubmit,
  loading,
  initialValues,
  fullName,
}: EditDebtFormProps) => {
  const [selectedOption, setSelectedOption] = useState(initialValues.owed_by);
  const ref1 = useRef<any>();

  return (
    <Formik<FormValues>
      validationSchema={editDebtSchema}
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
              maxLength={25}
              onSubmitEditing={() => ref1.current.focus()}
              returnKeyType="next"
            />
            <FormTextInput
              name="amount"
              placeholder="placeholder.amount"
              textAlignVertical="center"
              keyboardType="numeric"
              maxLength={10}
              ref={ref1}
            />
            <FormRadioButton
              name="owed_by"
              value={selectedOption}
              title="owed.by.title"
              label1="assignee.text"
              label2={fullName}
              onCheck={value => setSelectedOption(value)}
            />
            <Text
              localeId={'due.date.title'}
              variant="normalText"
              color="zBlack"
              mb="s"
            />
            <FormDateInput
              name="due_date"
              textAlignVertical="center"
              placeholder="placeholder.dueDate"
            />
            <Button
              title="edit.debt.button"
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
