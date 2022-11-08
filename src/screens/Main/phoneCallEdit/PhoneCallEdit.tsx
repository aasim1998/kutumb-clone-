import React, {useEffect} from 'react';
import {Box} from 'atoms/Box';
import {TextView} from 'atoms/TextView';
import {Navbar} from 'molecules/Navbar';
import {useRoute} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {deviceHeight} from 'utils/device';
import {PhoneCallEditForm} from './organism';
import {editPhoneCallType} from 'typings/editPhoneCall.type';
import {Spinner} from 'atoms/Spinner';
import usePhoneCall from 'context/PhoneCallAPI';
import {en} from 'locales/en';

export const PhoneCallEdit = () => {
  const {listItemId, contactId, fullName} = useRoute<any>().params;

  const {
    actions: {getPhoneCallItem, editPhoneCall},
    state: {phoneCallItem, phoneCallItemLoading, editPhoneCallLoading},
  } = usePhoneCall();

  useEffect(() => {
    getPhoneCallItem(listItemId, contactId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getPhoneCallItem, listItemId]);

  const handleSubmit = async (value: editPhoneCallType) => {
    const data = {
      api_phone_call: {
        date: value.date,
        body: value.body,
        status: value.whoCalled,
      },
    };
    editPhoneCall(listItemId, contactId, data);
  };

  const initialValues = {
    date: phoneCallItem.date,
    body: phoneCallItem.body,
    whoCalled: phoneCallItem.status,
  };
  return (
    <Box height="100%" pt={'m'} flex={1} backgroundColor="lightBackground">
      <Box>
        <Navbar showBack title="edit.phoneCall" />
        <TextView
          mt="xxl"
          ml="xl"
          variant="normalText"
          text={`${en['edit.phoneCall.subtitle']} ${fullName}`}
        />
      </Box>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        enableOnAndroid>
        <Box
          mx="xl"
          mt={deviceHeight < 780 ? 'ml' : 'xs'}
          justifyContent="flex-end">
          {phoneCallItemLoading ? (
            <Box
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                height: '100%',
                justifyContent: 'center',
              }}>
              <Spinner size={'large'} color={'primary'} />
            </Box>
          ) : (
            <PhoneCallEditForm
              initialValues={initialValues}
              onSubmit={handleSubmit}
              loading={editPhoneCallLoading}
              contactName={fullName}
            />
          )}
        </Box>
      </KeyboardAwareScrollView>
    </Box>
  );
};
