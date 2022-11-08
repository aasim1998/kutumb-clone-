import React, {useEffect} from 'react';
import {Box} from 'atoms/Box';
import {TextView} from 'atoms/TextView';
import {GiftEditForm} from './organism';
import {Navbar} from 'molecules/Navbar';
import {useRoute} from '@react-navigation/native';
import {Spinner} from 'atoms/Spinner';
import {editGift} from 'typings/editGift.type';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {deviceHeight} from 'utils/device';
import useGifts from 'context/GiftsAPI';

export const GiftsEdit = () => {
  const {listItemId, contactId, fullName} = useRoute<any>().params;

  const {
    actions: {getGiftItem, editGifts},
    state: {giftItem, giftItemLoading, editGiftsLoading},
  } = useGifts();

  useEffect(() => {
    getGiftItem(listItemId, contactId);
  }, [contactId, getGiftItem, listItemId]);

  const handleSubmit = async (values: editGift) => {
    const data = {
      api_gift: {
        name: values.name,
        body: values.description,
        status: values.status === 'false' ? 'given' : 'received',
        date: values.date,
      },
    };
    await editGifts(listItemId, contactId, data);
  };

  const initialValues = {
    name: giftItem.name,
    description: giftItem.body,
    status: giftItem.status === 'given' ? 'false' : 'true',
    date: giftItem.date,
  };

  return (
    <Box height="100%" pt={'m'} flex={1} backgroundColor="lightBackground">
      <Box>
        <Navbar showBack title="edit.gifts.title" />
        <TextView
          mt="xxl"
          ml="xl"
          variant="normalText"
          color="black"
          text={`Edit Gift for ${fullName}`}
        />
      </Box>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        enableOnAndroid>
        <Box
          mx="xl"
          mt={deviceHeight < 780 ? 'ml' : 'xs'}
          justifyContent="flex-end">
          {giftItemLoading ? (
            // eslint-disable-next-line react-native/no-inline-styles
            <Box style={{height: '100%', justifyContent: 'center'}}>
              <Spinner size={'large'} color={'primary'} />
            </Box>
          ) : (
            <GiftEditForm
              initialValues={initialValues}
              onSubmit={handleSubmit}
              loading={editGiftsLoading}
            />
          )}
        </Box>
      </KeyboardAwareScrollView>
    </Box>
  );
};
