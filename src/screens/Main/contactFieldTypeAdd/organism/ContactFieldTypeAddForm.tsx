import React, {useRef} from 'react';
import {Box} from 'atoms/Box';
import {Formik, FormikHelpers} from 'formik';
import {FormTextInput} from 'molecules/FormTextInput';
import {Button} from 'molecules/Button';
import {PressEvent} from 'typings/utils';
import * as yup from 'yup';
import {validateRequiredField} from 'utils/validators';
import {Text} from 'atoms/Text';
import {addContactFieldTypes} from 'typings/addContactFieldType.type';

type FormValues = {
  name: string;
  protocol?: string;
  icon?: string;
};

const addContactFieldTypeSchema = yup.object({
  name: validateRequiredField(),
});

type AddContactFieldTypeFormProps = {
  onSubmit(values: FormValues, helpers: FormikHelpers<FormValues>): void;
  loading?: boolean;
  error?: string;
  initialValues: addContactFieldTypes;
};

export const ContactFieldTypeAddForm = ({
  onSubmit,
  loading,
  initialValues,
}: AddContactFieldTypeFormProps) => {
  const ref1 = useRef<any>();
  const ref2 = useRef<any>();

  return (
    <Formik<FormValues>
      validationSchema={addContactFieldTypeSchema}
      initialValues={initialValues}
      enableReinitialize
      onSubmit={onSubmit}>
      {({handleSubmit}) => {
        return (
          <Box height="100%" bg="mainBackground" mt="ml">
            <FormTextInput
              name="name"
              placeholder="placeholder.field.type"
              autoFocus
              textAlignVertical="center"
              autoCapitalize="words"
              maxLength={25}
              onSubmitEditing={() => ref1.current.focus()}
              returnKeyType="next"
            />
            <Text
              localeId="protocol.title"
              variant="normalText"
              color="zBlack"
              mb="s"
            />
            <FormTextInput
              name="protocol"
              placeholder="placeholder.protocol"
              textAlignVertical="center"
              ref={ref1}
              onSubmitEditing={() => ref2.current.focus()}
              returnKeyType="next"
            />
            <Text
              localeId="protocol.desc"
              variant="text_sm"
              color="black"
              mb="l"
              mt="-m"
            />
            <Text
              localeId="icon.title"
              variant="normalText"
              color="zBlack"
              mb="s"
              mt="-xm"
            />
            <FormTextInput
              name="icon"
              placeholder="placeholder.icon"
              textAlignVertical="center"
              ref={ref2}
              returnKeyType="done"
            />
            <Text
              localeId="icon.desc"
              variant="text_sm"
              color="black"
              mb="s"
              mt="-m"
            />
            <Button
              title="add.contact.field.type.button"
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
