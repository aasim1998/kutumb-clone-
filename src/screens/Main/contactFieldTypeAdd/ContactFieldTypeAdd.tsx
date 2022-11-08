import React from 'react';
import {Box} from 'atoms/Box';
import {TextView} from 'atoms/TextView';
import {Navbar} from 'molecules/Navbar';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {deviceHeight} from 'utils/device';
import {ContactFieldTypeAddForm} from './organism';
import {addContactFieldTypes} from 'typings/addContactFieldType.type';
import useSetting from 'context/SettingsAPI';

export const ContactFieldTypeAdd = () => {
  const {
    actions: {addContactFieldType},
    state: {addContactFieldTypeLoading},
  } = useSetting();

  const handleSubmit = async (value: addContactFieldTypes) => {
    const data = {
      api_field: {
        name: value.name,
        protocol: value.protocol,
        icon: value.icon,
      },
    };
    await addContactFieldType(data);
  };

  const initialValues = {
    name: '',
    protocol: '',
    icon: '',
  };
  return (
    <Box height="100%" pt={'m'} flex={1} backgroundColor="lightBackground">
      <Box>
        <Navbar showBack title="add.new.contact.field.type" />
        <TextView
          mt="xxl"
          mx="xl"
          variant="normalText"
          text="add.new.contact.field.type.subtitle"
        />
      </Box>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        enableOnAndroid>
        <Box
          mx="xl"
          mt={deviceHeight < 780 ? 'ml' : 'xs'}
          justifyContent="flex-end">
          <ContactFieldTypeAddForm
            initialValues={initialValues}
            onSubmit={handleSubmit}
            loading={addContactFieldTypeLoading}
          />
        </Box>
      </KeyboardAwareScrollView>
    </Box>
  );
};
