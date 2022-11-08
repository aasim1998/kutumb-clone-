import React from 'react';
import {Box} from 'atoms/Box';
import {Formik, FormikHelpers} from 'formik';
import {editContactType} from 'typings/editcontact.type';
import {FormTextInput} from 'molecules/FormTextInput';
import {Button} from 'molecules/Button';
import {PressEvent} from 'typings/utils';
import * as yup from 'yup';
import {
  validateRequiredEmailContact,
  validateRequiredFirstName,
  validateRequiredLastName,
  validateRequiredPhone,
} from 'utils/validators';

type FormValues = {
  contactFirstName: string;
  contactLastName: string;
  contactEmail: string;
  contactPhone: string;
};
type EditContactFormProps = {
  onSubmit(values: FormValues, helpers: FormikHelpers<FormValues>): void;
  loading?: boolean;
  initialValues: editContactType;
};
const editContactSchema = yup.object({
  contactFirstName: validateRequiredFirstName(),
  contactLastName: validateRequiredLastName(),
  contactEmail: validateRequiredEmailContact(),
  contactPhone: validateRequiredPhone(),
});

export const EditContactForm = ({
  onSubmit,
  loading,
  initialValues,
}: EditContactFormProps) => {
  const lastNameRef = React.useRef<any>();
  const emailRef = React.useRef<any>();
  const phoneRef = React.useRef<any>();
  return (
    <Formik<FormValues>
      initialValues={initialValues}
      enableReinitialize
      validationSchema={editContactSchema}
      onSubmit={onSubmit}>
      {({handleSubmit}) => {
        return (
          <Box height="100%" bg="mainBackground">
            <FormTextInput
              name="contactFirstName"
              placeholder="first.name"
              autoCapitalize="words"
              maxLength={25}
              textAlignVertical="center"
              returnKeyType={'next'}
              blurOnSubmit={false}
              onSubmitEditing={() => {
                lastNameRef.current.focus();
              }}
            />
            <FormTextInput
              name="contactLastName"
              placeholder="last.name"
              autoCapitalize="words"
              maxLength={25}
              textAlignVertical="center"
              returnKeyType={'next'}
              ref={lastNameRef}
              onSubmitEditing={() => {
                emailRef.current.focus();
              }}
              blurOnSubmit={false}
            />
            <FormTextInput
              name="contactEmail"
              placeholder="email.text"
              textAlignVertical="center"
              keyboardType="email-address"
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
              keyboardType="decimal-pad"
              maxLength={12}
              returnKeyType={'done'}
              blurOnSubmit={true}
              ref={phoneRef}
            />
            <Button
              title="edit.contact.title"
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
