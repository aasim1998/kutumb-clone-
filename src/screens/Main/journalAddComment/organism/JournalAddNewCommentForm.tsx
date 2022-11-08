import React, {useRef} from 'react';
import {Box} from 'atoms/Box';
import {FormTextInput} from 'molecules/FormTextInput';
import {Formik, FormikHelpers} from 'formik';
import {PressEvent} from 'typings/utils';
import {Button} from 'molecules/Button';
import {AddJournalCommentProps} from 'typings/journal.types';
import {validateSummryRequired} from 'utils/validators';
import * as yup from 'yup';

type FormValues = {
  title: string;
};

const addJournalcommentValidationSchema = yup.object().shape({
  title: validateSummryRequired(),
});

type JournalAddNewCommentFormType = {
  onSubmit(values: FormValues, helpers: FormikHelpers<FormValues>): void;
  loading?: boolean;
  error?: string;
  initialValues: AddJournalCommentProps;
};

export const JournalAddNewCommentForm = ({
  onSubmit,
  loading,
  initialValues,
}: JournalAddNewCommentFormType) => {
  const refAddJournalComment = useRef<any>();
  return (
    <Formik<FormValues>
      initialValues={initialValues}
      validationSchema={addJournalcommentValidationSchema}
      enableReinitialize
      onSubmit={onSubmit}>
      {({handleSubmit}) => {
        return (
          <Box>
            <FormTextInput
              name="title"
              placeholder="placeholder.summry"
              autoFocus
              multiline
              height={230}
              textAlignVertical="top"
              autoCapitalize="sentences"
              maxLength={255}
              onSubmitEditing={() => refAddJournalComment.current.focus()}
              blurOnSubmit={false}
              ref={refAddJournalComment}
            />
            <Button
              title="bt.add.journal.comment"
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
