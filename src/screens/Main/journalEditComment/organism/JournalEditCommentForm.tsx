import React, {useRef} from 'react';
import {Box} from 'atoms/Box';
import {FormTextInput} from 'molecules/FormTextInput';
import {Formik, FormikHelpers} from 'formik';
import {PressEvent} from 'typings/utils';
import {Button} from 'molecules/Button';
import {EditJournalCommentProps} from 'typings/journal.types';
import {validateSummryRequired} from 'utils/validators';
import * as yup from 'yup';

type FormValues = {
  title: string;
};

const editJournalcommentValidationSchema = yup.object().shape({
  title: validateSummryRequired(),
});

type JournalEditCommentFormType = {
  onSubmit(values: FormValues, helpers: FormikHelpers<FormValues>): void;
  loading?: boolean;
  error?: string;
  initialValues: EditJournalCommentProps;
};

export const JournalEditCommentForm = ({
  onSubmit,
  loading,
  initialValues,
}: JournalEditCommentFormType) => {
  const refEditJournalComment = useRef<any>();
  return (
    <Formik<FormValues>
      initialValues={initialValues}
      validationSchema={editJournalcommentValidationSchema}
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
              onSubmitEditing={() => refEditJournalComment.current.focus()}
              blurOnSubmit={false}
              ref={refEditJournalComment}
            />
            <Box>
              <Button
                title="bt.edit.journal.comment"
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
