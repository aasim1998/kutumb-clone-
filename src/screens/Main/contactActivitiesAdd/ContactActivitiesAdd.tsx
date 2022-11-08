import React, {useEffect} from 'react';
import {Box} from 'atoms/Box';
import {TextView} from 'atoms/TextView';
import {Navbar} from 'molecules/Navbar';
import {useRoute} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {deviceHeight} from 'utils/device';
import {en} from 'locales/en';
import {AddContactActivitiesForm} from './organism';
import {addContactActivityType} from 'typings/addContactActivity.type';
import useContactActivity from 'context/ContactActivitiesAPI';

export const ContactActivitiesAdd = () => {
  const {contactId, fullName} = useRoute<any>().params;

  const {
    actions: {addContactActivity, getActivityData},
    state: {addContactActivityLoading, activityGroupList, activityItemList},
  } = useContactActivity();

  const handleSubmit = async (value: addContactActivityType) => {
    const data = {
      api_contact_activity: {
        title: value.title,
        date: value.date,
        body: value.body,
        activity_id: value.activity,
      },
    };
    addContactActivity(contactId, data);
  };

  useEffect(() => {
    getActivityData(contactId);
  }, [contactId, getActivityData]);

  const initialValues = {
    title: '',
    body: '',
    date: '',
    group: '',
    activity: '',
  };
  return (
    <Box height="100%" pt={'m'} flex={1} backgroundColor="lightBackground">
      <Box>
        <Navbar showBack title="add.new.activity" />
        <TextView
          mt="xxl"
          ml="xl"
          variant="normalText"
          text={`${en['add.activity.subtitle']} ${fullName}`}
        />
      </Box>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        enableOnAndroid>
        <Box
          mx="xl"
          mt={deviceHeight < 780 ? 'ml' : 'xs'}
          justifyContent="flex-end">
          <AddContactActivitiesForm
            initialValues={initialValues}
            onSubmit={handleSubmit}
            loading={addContactActivityLoading}
            groupList={activityGroupList}
            activityList={activityItemList}
          />
        </Box>
      </KeyboardAwareScrollView>
    </Box>
  );
};
