import React, {useEffect} from 'react';
import {Box} from 'atoms/Box';
import {Navbar} from 'molecules/Navbar';
import {useRoute} from '@react-navigation/native';
import {Spinner} from 'atoms/Spinner';
import {editContactFieldTypes} from 'typings/editContactFieldType.type';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {deviceHeight} from 'utils/device';
import useSetting from 'context/SettingsAPI';
import {ContactFieldTypeEditForm} from './organism';

export const ContactFieldTypeEdit = () => {
  const {contactFieldTypeItemId} = useRoute<any>().params;

  const {
    actions: {getContactFieldTypeItem, editContactFieldType},
    state: {
      contactFieldTypeItem,
      contactFieldTypeItemLoading,
      editContactFieldTypeLoading,
    },
  } = useSetting();

  useEffect(() => {
    getContactFieldTypeItem(contactFieldTypeItemId);
  }, [getContactFieldTypeItem, contactFieldTypeItemId]);

  const handleSubmit = async (value: editContactFieldTypes) => {
    const data = {
      api_field: {
        name: value.name,
        protocol: value.protocol,
        icon: value.icon,
      },
    };
    await editContactFieldType(contactFieldTypeItemId, data);
  };

  const initialValues = {
    name: contactFieldTypeItem.name,
    protocol: contactFieldTypeItem.protocol,
    icon: contactFieldTypeItem.icon,
  };

  return (
    <Box height="100%" pt={'m'} flex={1} backgroundColor="lightBackground">
      <Box>
        <Navbar showBack title="edit.contact.field.type" />
        <Box mt="l" />
      </Box>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        enableOnAndroid>
        <Box
          mx="xl"
          mt={deviceHeight < 780 ? 'ml' : 'xs'}
          justifyContent="flex-end">
          {contactFieldTypeItemLoading ? (
            // eslint-disable-next-line react-native/no-inline-styles
            <Box style={{height: '100%', justifyContent: 'center'}}>
              <Spinner size={'large'} color={'primary'} />
            </Box>
          ) : (
            <ContactFieldTypeEditForm
              initialValues={initialValues}
              onSubmit={handleSubmit}
              loading={editContactFieldTypeLoading}
            />
          )}
        </Box>
      </KeyboardAwareScrollView>
    </Box>
  );
};
