import React, {useEffect, useState} from 'react';
import {Box} from 'atoms/Box';
import {Navbar} from 'molecules/Navbar';
import {useRoute} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {deviceHeight} from 'utils/device';
import useEvents from 'context/EventsAPI';
import {ContactEventEditForm} from './organism';
import {editContactEventType} from 'typings/editContactEvent.type';
import {style} from 'styles/style';
import {Spinner} from 'atoms/Spinner';
import {capitalizeTitle} from 'utils/capitalization';

export const ContactEditEvent = () => {
  const {contactId, listItemId} = useRoute<any>().params;
  const [eventDetails, setEventDetails] = useState<any>({});

  const {
    actions: {getEventItem, editEvents},
    state: {eventItem, eventItemLoading, editEventsLoading},
  } = useEvents();

  useEffect(() => {
    getEventItem(listItemId, contactId);
  }, [contactId, getEventItem, listItemId]);

  useEffect(() => {
    if (eventItem) {
      setEventDetails(eventItem);
    }
  }, [eventItem]);

  const handleSubmit = async (values: editContactEventType) => {
    const data = {
      api_contact_event: {
        title: values.title,
        body: values.body,
        date: values.date,
      },
    };
    await editEvents(listItemId, contactId, data);
  };

  const initialValues = {
    title: eventItem.title,
    body: eventItem.body,
    date: eventItem.created_at,
  };

  return (
    <Box height="100%" pt={'m'} flex={1} backgroundColor="lightBackground">
      <Box>
        <Navbar
          showBack
          title={`Edit ${capitalizeTitle(eventDetails?.life_event?.name)}`}
        />
        <Box mt="xl" />
      </Box>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        enableOnAndroid>
        <Box
          mx="xl"
          mt={deviceHeight < 780 ? 'ml' : 'xs'}
          justifyContent="flex-end">
          {eventItemLoading ? (
            <Box style={style.loaderStyles}>
              <Spinner size={'large'} color={'primary'} />
            </Box>
          ) : (
            <ContactEventEditForm
              initialValues={initialValues}
              onSubmit={handleSubmit}
              loading={editEventsLoading}
            />
          )}
        </Box>
      </KeyboardAwareScrollView>
    </Box>
  );
};
