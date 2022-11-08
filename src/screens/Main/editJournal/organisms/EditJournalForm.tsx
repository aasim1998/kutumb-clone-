import React, {useRef} from 'react';
import {Box} from 'atoms/Box';
import {Formik, FormikHelpers} from 'formik';
import {FormTextInput} from 'molecules/FormTextInput';
import {Button} from 'molecules/Button';
import {PressEvent} from 'typings/utils';
import * as yup from 'yup';
import {validateSummryRequired} from 'utils/validators';
import {EditJournalProps} from 'typings/journal.types';
type FormValues = {
  title: string;
  body: string;
};

const editJournalSchema = yup.object().shape({
  title: validateSummryRequired(),
  body: validateSummryRequired(),
});
type EditJournalFormType = {
  onSubmit(values: FormValues, helpers: FormikHelpers<FormValues>): void;
  loading?: boolean;
  error?: string;
  initialValues: EditJournalProps;
};
export const EditJournalForm = ({
  onSubmit,
  loading,
  initialValues,
}: EditJournalFormType) => {
  const refEditJournal = useRef<any>();
  return (
    <Formik<FormValues>
      validationSchema={editJournalSchema}
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
              onSubmitEditing={() => refEditJournal.current.focus()}
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
              ref={refEditJournal}
            />
            <Button
              title="editjournal.btn.title"
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
