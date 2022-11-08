import React, {useState} from 'react';
import {Box} from 'atoms/Box';
import {Formik, FormikHelpers} from 'formik';
import {FormTextInput} from 'molecules/FormTextInput';
import {Button} from 'molecules/Button';
import {PressEvent} from 'typings/utils';
import * as yup from 'yup';
import {validateSummryRequired} from 'utils/validators';
import {editPhoneCallType} from 'typings/editPhoneCall.type';
import {FormDateInput} from 'molecules/FormDateInput';
import {FormRadioButton} from 'molecules/FormRadioButton';

type FormValues = {
  date: string;
  body: string;
  whoCalled: string;
};

const editPhoneCallSchema = yup.object({
  body: validateSummryRequired(),
});

type PhoneCallEditFormProps = {
  onSubmit(values: FormValues, helpers: FormikHelpers<FormValues>): void;
  loading?: boolean;
  error?: string;
  initialValues: editPhoneCallType;
  contactName: string;
};

export const PhoneCallEditForm = ({
  onSubmit,
  loading,
  initialValues,
  contactName,
}: PhoneCallEditFormProps) => {
  const [selectedOption, setSelectedOption] = useState(initialValues.whoCalled);
  return (
    <Formik<FormValues>
      validationSchema={editPhoneCallSchema}
      initialValues={initialValues}
      enableReinitialize
      onSubmit={onSubmit}>
      {({handleSubmit}) => {
        return (
          <Box height="100%" bg="mainBackground" mt="ml">
            <FormDateInput
              name="date"
              textAlignVertical="center"
              placeholder="placeholder.phoneCall.date"
              maximumDate={'today'}
            />
            <FormRadioButton
              name="whoCalled"
              value={selectedOption}
              title="who.called"
              label1="phone.status.you"
              label2={`${contactName.split(' ')[0]} called`}
              onCheck={value => setSelectedOption(value)}
              buttonValue1="user.text"
              buttonValue2="contact.text"
            />
            <FormTextInput
              name="body"
              placeholder="placeholder.summry"
              height={230}
              multiline
              autoFocus
              textAlignVertical="top"
              autoCapitalize="sentences"
              marginTop="m"
            />
            <Button
              title="edit.phoneCall"
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
