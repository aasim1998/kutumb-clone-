import React from 'react';
import {Box} from 'atoms/Box';
import {Formik, FormikHelpers} from 'formik';
import {addContactType} from 'typings/addcontact.type';
import {FormTextInput} from 'molecules/FormTextInput';
import {Button} from 'molecules/Button';
import {PressEvent} from 'typings/utils';
import * as Yup from 'yup';
import {
  validateRequiredPhone,
  validateRequiredFirstName,
  validateRequiredLastName,
  validateRequiredEmailContact,
} from 'utils/validators';

type FormValues = {
  contactFirstName: string;
  contactLastName: string;
  contactEmail: string;
  contactPhone: string;
};

type AddContactFormProps = {
  onSubmit(values: FormValues, helpers: FormikHelpers<FormValues>): void;
  loading?: boolean;
  initialValues: addContactType;
};

const AddContactSchema = Yup.object({
  contactFirstName: validateRequiredFirstName(),
  contactLastName: validateRequiredLastName(),
  contactEmail: validateRequiredEmailContact(),
  contactPhone: validateRequiredPhone(),
});

export const AddContactForm = ({
  onSubmit,
  loading,
  initialValues,
}: AddContactFormProps) => {
  const lastNameRef = React.useRef<any>();
  const emailRef = React.useRef<any>();
  const phoneRef = React.useRef<any>();
  return (
    <Formik<FormValues>
      initialValues={initialValues}
      enableReinitialize
      validationSchema={AddContactSchema}
      onSubmit={onSubmit}>
      {({handleSubmit}) => {
        return (
          <Box height="100%" bg="mainBackground">
            <FormTextInput
              name="contactFirstName"
              placeholder="first.name"
              autoFocus
              textAlignVertical="center"
              autoCapitalize="words"
              onSubmitEditing={() => {
                lastNameRef.current.focus();
              }}
              blurOnSubmit={false}
              returnKeyType={'next'}
              maxLength={25}
            />
            <FormTextInput
              name="contactLastName"
              placeholder="last.name"
              textAlignVertical="center"
              autoCapitalize="words"
              maxLength={25}
              ref={lastNameRef}
              onSubmitEditing={() => {
                emailRef.current.focus();
              }}
              blurOnSubmit={false}
              returnKeyType={'next'}
            />
            <FormTextInput
              name="contactEmail"
              placeholder="email.text"
              keyboardType="email-address"
              textAlignVertical="center"
              maxLength={30}
              ref={emailRef}
              onSubmitEditing={() => {
                phoneRef.current.focus();
              }}
              blurOnSubmit={false}
              returnKeyType={'next'}
            />
            <FormTextInput
              name="contactPhone"
              placeholder="placeholder.phone"
              textAlignVertical="center"
              keyboardType="phone-pad"
              maxLength={12}
              blurOnSubmit={true}
              ref={phoneRef}
            />
            <Button
              title="add.contact.title"
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
