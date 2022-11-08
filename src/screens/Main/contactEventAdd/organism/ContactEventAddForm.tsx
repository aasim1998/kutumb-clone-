import React, {useEffect, useRef, useState} from 'react';
import {Box} from 'atoms/Box';
import {Formik, FormikHelpers} from 'formik';
import {addContactEventType} from 'typings/addContactEvent.type';
import {FormTextInput} from 'molecules/FormTextInput';
import {Button} from 'molecules/Button';
import {PressEvent} from 'typings/utils';
import * as yup from 'yup';
import {validateSummryRequired} from 'utils/validators';
import {FormDateInput} from 'molecules/FormDateInput';
import {FormSelectInput} from 'molecules/FormSelectInput';
import {LifeEventGroupProps} from 'typings/lifeEventGroup.type';
import {LifeEventProps} from 'typings/lifeEvent.type';

type FormValues = {
  title: string;
  body: string;
  date: string;
  group: string;
  event: string;
};

const addEventSchema = yup.object({
  title: validateSummryRequired(),
  body: validateSummryRequired(),
  event: validateSummryRequired(),
});

type ContactAddEventFormProps = {
  onSubmit(values: FormValues, helpers: FormikHelpers<FormValues>): void;
  loading?: boolean;
  error?: string;
  initialValues: addContactEventType;
  groupList: Array<LifeEventGroupProps>;
  eventList: Array<LifeEventProps>;
};

export const ContactEventAddForm = ({
  onSubmit,
  loading,
  initialValues,
  groupList,
  eventList,
}: ContactAddEventFormProps) => {
  const ref1 = useRef<any>();
  const [groupId, setGroupId] = useState();
  const [event, setEvent] = useState<any>([]);

  useEffect(() => {
    setEvent(
      eventList.filter(item => (groupId ? item.group_id === groupId : item)),
    );
  }, [eventList, groupId]);

  return (
    <Formik<FormValues>
      validationSchema={addEventSchema}
      initialValues={initialValues}
      enableReinitialize
      onSubmit={onSubmit}>
      {({handleSubmit}) => {
        return (
          <Box height="100%" bg="mainBackground" mt="ml">
            <FormTextInput
              name="title"
              placeholder="placeholder.title"
              autoFocus
              textAlignVertical="center"
              autoCapitalize="sentences"
              onSubmitEditing={() => ref1.current.focus()}
              returnKeyType="next"
            />
            <FormTextInput
              name="body"
              placeholder="placeholder.summry"
              height={100}
              multiline
              textAlignVertical="top"
              autoCapitalize="sentences"
              ref={ref1}
              returnKeyType="done"
            />
            <FormDateInput
              name="date"
              textAlignVertical="center"
              placeholder="placeholder.dueDate"
              initialDate={new Date()}
            />
            <FormSelectInput
              name="group"
              options={groupList}
              placeholder="select.group"
              handleOnChange={item => {
                setGroupId(item.id);
              }}
            />
            <Box my="-sl">
              <FormSelectInput
                name="event"
                options={event}
                placeholder="select.event"
              />
            </Box>
            <Button
              title="add.event.button"
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
