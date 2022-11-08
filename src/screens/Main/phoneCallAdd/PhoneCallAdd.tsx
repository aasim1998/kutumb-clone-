import React from 'react';
import {Box} from 'atoms/Box';
import {TextView} from 'atoms/TextView';
import {Navbar} from 'molecules/Navbar';
import {useRoute} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {deviceHeight} from 'utils/device';
import {PhoneCallAddForm} from './organism';
import {addNewPhoneCallType} from 'typings/addNewPhoneCall.type';
import usePhoneCall from 'context/PhoneCallAPI';
import {en} from 'locales/en';

export const PhoneCallAdd = () => {
  const {contactId, fullName} = useRoute<any>().params;

  const {
    actions: {addPhoneCall},
    state: {addPhoneCallLoading},
  } = usePhoneCall();

  const handleSubmit = async (value: addNewPhoneCallType) => {
    const data = {
      api_phone_call: {
        date: value.date,
        body: value.body,
        status: value.whoCalled,
      },
    };
    addPhoneCall(contactId, data);
  };

  const initialValues = {
    date: '',
    body: '',
    whoCalled: '',
  };
  return (
    <Box height="100%" pt={'m'} flex={1} backgroundColor="lightBackground">
      <Box>
        <Navbar showBack title="add.new.phoneCall" />
        <TextView
          mt="xxl"
          ml="xl"
          variant="normalText"
          text={`${en['add.new.phoneCall.subtitle']} ${fullName}`}
        />
      </Box>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        enableOnAndroid>
        <Box
          mx="xl"
          mt={deviceHeight < 780 ? 'ml' : 'xs'}
          justifyContent="flex-end">
          <PhoneCallAddForm
            initialValues={initialValues}
            onSubmit={handleSubmit}
            loading={addPhoneCallLoading}
            contactName={fullName}
          />
        </Box>
      </KeyboardAwareScrollView>
    </Box>
  );
};
