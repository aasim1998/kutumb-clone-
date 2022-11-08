import React, {useRef, useState} from 'react';
import {Box} from 'atoms/Box';
import {Formik, FormikHelpers} from 'formik';
import {editGift} from 'typings/editGift.type';
import {FormTextInput} from 'molecules/FormTextInput';
import {Button} from 'molecules/Button';
import {PressEvent} from 'typings/utils';
import * as yup from 'yup';
import {
  validateRequired25letters,
  validateSummryRequired,
} from 'utils/validators';
import {FormDateInput} from 'molecules/FormDateInput';
import {Text} from 'atoms/Text';
import {FormRadioButton} from 'molecules/FormRadioButton';

type FormValues = {
  name: string;
  description: string;
  status: string;
  date: string;
};

const editGiftSchema = yup.object({
  name: validateRequired25letters(),
  description: validateSummryRequired(),
});

type EditGiftFormProps = {
  onSubmit(values: FormValues, helpers: FormikHelpers<FormValues>): void;
  loading?: boolean;
  error?: string;
  initialValues: editGift;
};

export const GiftEditForm = ({
  onSubmit,
  loading,
  initialValues,
}: EditGiftFormProps) => {
  const [selectedOption, setSelectedOption] = useState(initialValues.status);
  const ref1 = useRef<any>();

  return (
    <Formik<FormValues>
      validationSchema={editGiftSchema}
      initialValues={initialValues}
      enableReinitialize
      onSubmit={onSubmit}>
      {({handleSubmit}) => {
        return (
          <Box height="100%" bg="mainBackground" mt="ml">
            <FormTextInput
              name="name"
              placeholder="placeholder.name"
              autoFocus
              textAlignVertical="center"
              autoCapitalize="sentences"
              maxLength={25}
              onSubmitEditing={() => ref1.current.focus()}
              returnKeyType="next"
            />
            <FormTextInput
              name="description"
              placeholder="placeholder.summry"
              height={200}
              multiline
              textAlignVertical="top"
              autoCapitalize="sentences"
              ref={ref1}
            />
            <FormRadioButton
              name="status"
              value={selectedOption}
              title="status.title"
              label1="Received"
              label2="Given"
              onCheck={value => setSelectedOption(value)}
            />
            <Text
              localeId={'date.title'}
              variant="normalText"
              color="zBlack"
              mb="s"
            />
            <FormDateInput
              name="date"
              textAlignVertical="center"
              placeholder="placeholder.dueDate"
            />
            <Button
              title="edit.gift.button"
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
