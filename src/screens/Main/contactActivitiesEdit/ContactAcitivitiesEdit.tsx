import React, {useEffect} from 'react';
import {Box} from 'atoms/Box';
import {TextView} from 'atoms/TextView';
import {Navbar} from 'molecules/Navbar';
import {useRoute} from '@react-navigation/native';
import {Spinner} from 'atoms/Spinner';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {deviceHeight} from 'utils/device';
import {en} from 'locales/en';
import {EditContactActivitiesForm} from './organisms';
import {EditContactActivity} from 'typings/editContactActivity.type';
import useContactActivity from 'context/ContactActivitiesAPI';
import {style} from 'styles/style';

export const ContactActivitiesEdit = () => {
  const {listItemId, contactId, fullName} = useRoute<any>().params;

  const {
    actions: {getContactActivityItem, editContactActivity},
    state: {
      contactActivityItem,
      contactActivityItemLoading,
      editContactActivityLoading,
    },
  } = useContactActivity();

  useEffect(() => {
    getContactActivityItem(listItemId, contactId);
  }, [contactId, getContactActivityItem, listItemId]);

  const handleSubmit = async (values: EditContactActivity) => {
    const data = {
      api_contact_activity: {
        title: values.title,
        body: values.body,
        date: values.date,
      },
    };

    await editContactActivity(listItemId, contactId, data);
  };

  const initialValues = {
    title: contactActivityItem.title,
    body: contactActivityItem.body,
    date: contactActivityItem.date,
  };

  return (
    <Box height="100%" pt={'m'} flex={1} backgroundColor="lightBackground">
      <Box>
        <Navbar showBack title="edit.activity" />
        <TextView
          mt="xxl"
          ml="xl"
          variant="normalText"
          color="black"
          text={`${en['edit.contactActivity.subtitle']} ${fullName}`}
        />
      </Box>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        enableOnAndroid>
        <Box
          mx="xl"
          mt={deviceHeight < 780 ? 'ml' : 'xs'}
          justifyContent="flex-end">
          {contactActivityItemLoading ? (
            <Box style={style.loaderStyles}>
              <Spinner size={'large'} color={'primary'} />
            </Box>
          ) : (
            <EditContactActivitiesForm
              initialValues={initialValues}
              onSubmit={handleSubmit}
              loading={editContactActivityLoading}
            />
          )}
        </Box>
      </KeyboardAwareScrollView>
    </Box>
  );
};
