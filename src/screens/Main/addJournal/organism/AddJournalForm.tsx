import React, {useRef} from 'react';
import {Box} from 'atoms/Box';
import {FormTextInput} from 'molecules/FormTextInput';
import {Formik, FormikHelpers} from 'formik';
import {PressEvent} from 'typings/utils';
import {Button} from 'molecules/Button';
import {AddJournalProps} from 'typings/journal.types';
import {validateSummryRequired} from 'utils/validators';
import * as yup from 'yup';

type FormValues = {
  title: string;
  body: string;
};

const addJournalFornValidationSchema = yup.object().shape({
  title: validateSummryRequired(),
  body: validateSummryRequired(),
});

type AddJournalFormProps = {
  onSubmit(values: FormValues, helpers: FormikHelpers<FormValues>): void;
  loading?: boolean;
  error?: string;
  initialValues: AddJournalProps;
};
export const AddJournalForm = ({
  onSubmit,
  loading,
  initialValues,
}: AddJournalFormProps) => {
  const refAddJournal = useRef<any>();
  return (
    <Formik<FormValues>
      validationSchema={addJournalFornValidationSchema}
      initialValues={initialValues}
      enableReinitialize
      onSubmit={onSubmit}>
      {({handleSubmit}) => {
        return (
          <Box>
            <FormTextInput
              name="title"
              placeholder="placeholder.title"
              autoFocus
              textAlignVertical="top"
              autoCapitalize="sentences"
              maxLength={25}
              onSubmitEditing={() => refAddJournal.current.focus()}
              blurOnSubmit={false}
              returnKeyType="next"
            />
            <FormTextInput
              name="body"
              placeholder="placeholder.summry"
              multiline
              height={230}
              textAlignVertical="top"
              autoCapitalize="sentences"
              maxLength={255}
              ref={refAddJournal}
            />
            <Button
              title="button.add.journal"
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
