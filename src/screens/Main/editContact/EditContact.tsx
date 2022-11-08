import React, {useEffect} from 'react';
import {Box} from 'atoms/Box';
import {TextView} from 'atoms/TextView';
import {EditContactForm} from './organisms/EditContactForm';
import {Navbar} from 'molecules/Navbar';
import {useContact} from 'context/ContactAPI';
import {useRoute} from '@react-navigation/native';
import {Spinner} from 'atoms/Spinner';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {deviceHeight} from 'utils/device';

export const EditContact = () => {
  const {contactItemId} = useRoute<any>().params;

  const {
    actions: {editContact, getEditContactItem},
    state: {editContactLoading, editContactItem, editContactItemLoading},
  } = useContact();

  useEffect(() => {
    getEditContactItem(contactItemId);
  }, [contactItemId, getEditContactItem]);

  const handleSubmit = async (values: any) => {
    const objValue = {
      api_contact: {
        first_name: `${values.contactFirstName}`,
        last_name: `${values.contactLastName}`,
        phone: `${values.contactPhone}`,
        email: `${values.contactEmail}`,
      },
    };
    await editContact(contactItemId, objValue);
  };

  const initialValues = {
    contactFirstName: editContactItem.first_name,
    contactLastName: editContactItem.last_name,
    contactEmail: editContactItem.email,
    contactPhone: editContactItem.phone,
  };

  return (
    <Box height="100%" bg="mainBackground" pt={'m'} flex={1}>
      <Box>
        <Navbar showBack title="edit.contact.title" />
        <TextView
          mt="xxl"
          ml="xl"
          variant="normalText"
          color="black"
          fontWeight="300"
          text="edit.contact.sub.title"
        />
      </Box>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        enableOnAndroid>
        <Box
          mx="xl"
          mt={deviceHeight < 780 ? 'ml' : 'xs'}
          justifyContent="flex-end">
          {editContactItemLoading ? (
            <Box height="100%" justifyContent="center">
              <Spinner size={'large'} color={'primary'} />
            </Box>
          ) : (
            <EditContactForm
              initialValues={initialValues}
              onSubmit={handleSubmit}
              loading={editContactLoading}
            />
          )}
        </Box>
      </KeyboardAwareScrollView>
    </Box>
  );
};
