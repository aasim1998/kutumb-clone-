import React, {useRef} from 'react';
import {Box} from 'atoms/Box';
import {Formik, FormikHelpers} from 'formik';
import {addProfileScreenType} from 'typings/profilescreen.type';
import {FormTextInput} from 'molecules/FormTextInput';
import {Button} from 'molecules/Button';
import {PressEvent} from 'typings/utils';

type FormValues = {
  profileFirstName: string;
  profileLastName: string;
};

type ProfileScreenFormProps = {
  onSubmit(values: FormValues, helpers: FormikHelpers<FormValues>): void;
  loading?: boolean;
  initialValues: addProfileScreenType;
};

export const ProfileScreenForm = ({
  onSubmit,
  loading,
  initialValues,
}: ProfileScreenFormProps) => {
  return (
    <Formik<FormValues>
      initialValues={initialValues}
      enableReinitialize
      onSubmit={onSubmit}>
      {({handleSubmit}) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const ref1 = useRef<any>();
        return (
          <Box height="100%" bg="mainBackground">
            <FormTextInput
              name="profileFirstName"
              placeholder="first.name"
              textAlignVertical="center"
              maxLength={25}
              autoCapitalize="words"
              returnKeyType="next"
              onSubmitEditing={() => ref1.current.focus()}
            />
            <FormTextInput
              name="profileLastName"
              placeholder="last.name"
              textAlignVertical="center"
              maxLength={25}
              autoCapitalize="words"
              ref={ref1}
            />
            <Button
              title="btn.save"
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
