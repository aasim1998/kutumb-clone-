import React from 'react';
import {Box} from 'atoms/Box';
import {TextView} from 'atoms/TextView';
import {AddContactForm} from './organisms/AddContactForm';
import {Navbar} from 'molecules/Navbar';
import useContact from 'context/ContactAPI';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {deviceHeight} from 'utils/device';

export const AddContact = ({navigation}) => {
  const {
    actions: {addContact},
    state: {addContactLoading},
  } = useContact();

  const handleSubmit = async (values: any) => {
    const objValue = {
      api_contact: {
        first_name: `${values.contactFirstName}`,
        last_name: `${values.contactLastName}`,
        phone: `${values.contactPhone}`,
        email: `${values.contactEmail}`,
      },
    };
    addContact(objValue, navigation);
  };

  const initialValues = {
    contactFirstName: '',
    contactLastName: '',
    contactEmail: '',
    contactPhone: '',
  };

  return (
    <Box height="100%" pt={'m'} flex={1} bg="mainBackground">
      <Box>
        <Navbar showBack title="add.contact.title" />
        <TextView
          mt="xxl"
          ml="xl"
          variant="normalText"
          color="black"
          text="add.contact.sub.title"
        />
      </Box>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        enableOnAndroid>
        <Box
          mx="xl"
          mt={deviceHeight < 780 ? 'ml' : 'xs'}
          justifyContent="flex-end">
          <AddContactForm
            initialValues={initialValues}
            onSubmit={handleSubmit}
            loading={addContactLoading}
          />
        </Box>
      </KeyboardAwareScrollView>
    </Box>
  );
};
