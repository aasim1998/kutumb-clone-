import React, {useState} from 'react';
import {Box} from 'atoms/Box';
import {Formik, FormikHelpers} from 'formik';
import {FormTextInput} from 'molecules/FormTextInput';
import {Button} from 'molecules/Button';
import {PressEvent} from 'typings/utils';
import * as yup from 'yup';
import {validateSummryRequired} from 'utils/validators';
import {FormDateInput} from 'molecules/FormDateInput';
import {addContactActivityType} from 'typings/addContactActivity.type';
import {AccountActivitiesGroupProps} from 'typings/accountActivitiesGroup.type';
import {AccountActivitiesProps} from 'typings/accountActivities.type';
import {FormSelectInput} from 'molecules/FormSelectInput';

type FormValues = {
  title: string;
  body: string;
  date: string;
  group: string;
  activity: string;
};

const addContactActivitiesSchema = yup.object({
  title: validateSummryRequired(),
  body: validateSummryRequired(),
  activity: validateSummryRequired(),
});

type AddContactActivitiesFormProps = {
  onSubmit(values: FormValues, helpers: FormikHelpers<FormValues>): void;
  loading?: boolean;
  error?: string;
  initialValues: addContactActivityType;
  groupList: Array<AccountActivitiesGroupProps>;
  activityList: Array<AccountActivitiesProps>;
};

export const AddContactActivitiesForm = ({
  onSubmit,
  loading,
  initialValues,
  groupList,
  activityList,
}: AddContactActivitiesFormProps) => {
  const [selectedGroupId, setSelectedGroupId] = useState();

  return (
    <Formik<FormValues>
      validationSchema={addContactActivitiesSchema}
      initialValues={initialValues}
      enableReinitialize
      onSubmit={onSubmit}>
      {({handleSubmit}) => {
        return (
          <Box height="100%" bg="mainBackground" mt="ml">
            <FormTextInput
              name="title"
              autoFocus
              placeholder="placeholder.title"
              textAlignVertical="center"
              autoCapitalize="sentences"
            />
            <FormTextInput
              name="body"
              placeholder="placeholder.summry"
              height={110}
              multiline
              textAlignVertical="top"
              autoCapitalize="sentences"
            />
            <FormDateInput
              name="date"
              textAlignVertical="center"
              placeholder="placeholder.phoneCall.date"
              initialDate={new Date()}
            />
            <FormSelectInput
              name="group"
              placeholder="select.group"
              options={groupList}
              handleOnChange={groupItem => {
                setSelectedGroupId(groupItem.id);
              }}
            />
            <Box my={'-sl'}>
              <FormSelectInput
                name="activity"
                placeholder="select.activity"
                options={
                  selectedGroupId === undefined
                    ? activityList
                    : activityList.filter(activity => {
                        return activity.group_id === selectedGroupId;
                      })
                }
              />
            </Box>
            <Button
              title="add.account.activity.button"
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
