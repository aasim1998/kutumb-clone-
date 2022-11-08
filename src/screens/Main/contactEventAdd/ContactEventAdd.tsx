import React, {useEffect} from 'react';
import {Box} from 'atoms/Box';
import {TextView} from 'atoms/TextView';
import {Navbar} from 'molecules/Navbar';
import {useRoute} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {deviceHeight} from 'utils/device';
import {ContactEventAddForm} from './organism';
import useEvents from 'context/EventsAPI';
import {addContactEventType} from 'typings/addContactEvent.type';
import useSetting from 'context/SettingsAPI';

export const ContactAddEvent = () => {
  const {
    actions: {addEvents},
    state: {addEventsLoading},
  } = useEvents();

  const {
    actions: {getLifeEventGroupList, getLifeEventList},
    state: {lifeEventGroupList, lifeEventList},
  } = useSetting();

  useEffect(() => {
    getLifeEventGroupList();
    getLifeEventList();
  }, [getLifeEventGroupList, getLifeEventList]);

  const {contactId} = useRoute<any>().params;

  const handleSubmit = async (values: addContactEventType) => {
    const data = {
      api_contact_event: {
        title: values.title,
        body: values.body,
        date: values.date,
        life_event_id: Number(values.event),
      },
    };
    await addEvents(contactId, data);
  };

  const initialValues = {
    title: '',
    body: '',
    date: '',
    group: '',
    event: '',
  };

  return (
    <Box height="100%" pt={'m'} flex={1} backgroundColor="lightBackground">
      <Box>
        <Navbar showBack title="add.new.event" />
        <TextView
          mt="xxl"
          mx="xl"
          variant="normalText"
          text="add.new.event.subtitle"
        />
      </Box>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        enableOnAndroid>
        <Box
          mx="xl"
          mt={deviceHeight < 780 ? 'ml' : 'xs'}
          justifyContent="flex-end">
          <ContactEventAddForm
            initialValues={initialValues}
            onSubmit={handleSubmit}
            loading={addEventsLoading}
            groupList={lifeEventGroupList}
            eventList={lifeEventList}
          />
        </Box>
      </KeyboardAwareScrollView>
    </Box>
  );
};
