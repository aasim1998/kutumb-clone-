import React from 'react';
import {Box} from 'atoms/Box';
import {TextView} from 'atoms/TextView';
import {Navbar} from 'molecules/Navbar';
import {addNewGiftsType} from 'typings/addNewGift.type';
import {useRoute} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {deviceHeight} from 'utils/device';
import {GiftAddForm} from './organism';
import useGifts from 'context/GiftsAPI';

export const GiftsAdd = () => {
  const {
    actions: {addGifts},
    state: {addGiftsLoading},
  } = useGifts();

  const {contactId} = useRoute<any>().params;

  const handleSubmit = async (value: addNewGiftsType) => {
    const data = {
      api_gift: {
        name: value.name,
        body: value.description,
        status: value.status === 'true' ? 'received' : 'given',
        date: value.date,
      },
    };
    await addGifts(contactId, data);
  };

  const initialValues = {
    name: '',
    description: '',
    status: '',
    date: '',
  };
  return (
    <Box height="100%" pt={'m'} flex={1} backgroundColor="lightBackground">
      <Box>
        <Navbar showBack title="add.new.gifts" />
        <TextView
          mt="xxl"
          mx="xl"
          variant="normalText"
          text="add.new.gifts.subtitle"
        />
      </Box>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        enableOnAndroid>
        <Box
          mx="xl"
          mt={deviceHeight < 780 ? 'ml' : 'xs'}
          justifyContent="flex-end">
          <GiftAddForm
            initialValues={initialValues}
            onSubmit={handleSubmit}
            loading={addGiftsLoading}
          />
        </Box>
      </KeyboardAwareScrollView>
    </Box>
  );
};
