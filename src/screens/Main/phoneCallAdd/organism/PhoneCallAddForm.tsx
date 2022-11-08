import React, {useState} from 'react';
import {Box} from 'atoms/Box';
import {Formik, FormikHelpers} from 'formik';
import {FormTextInput} from 'molecules/FormTextInput';
import {Button} from 'molecules/Button';
import {PressEvent} from 'typings/utils';
import * as yup from 'yup';
import {validateSummryRequired} from 'utils/validators';
import {addNewPhoneCallType} from 'typings/addNewPhoneCall.type';
import {FormDateInput} from 'molecules/FormDateInput';
import {FormRadioButton} from 'molecules/FormRadioButton';

type FormValues = {
  date: string;
  body: string;
  whoCalled: string;
};

const addPhoneCallSchema = yup.object({
  body: validateSummryRequired(),
});

type PhoneCallAddFormProps = {
  onSubmit(values: FormValues, helpers: FormikHelpers<FormValues>): void;
  loading?: boolean;
  error?: string;
  initialValues: addNewPhoneCallType;
  contactName: string;
};

export const PhoneCallAddForm = ({
  onSubmit,
  loading,
  initialValues,
  contactName,
}: PhoneCallAddFormProps) => {
  const [selectedOption, setSelectedOption] = useState('user');

  return (
    <Formik<FormValues>
      validationSchema={addPhoneCallSchema}
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
              initialDate={new Date()}
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
              title="add.phoneCall.button"
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
