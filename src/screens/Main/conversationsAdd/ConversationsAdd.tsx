import React, {useEffect} from 'react';
import {Box} from 'atoms/Box';
import {TextView} from 'atoms/TextView';
import {Navbar} from 'molecules/Navbar';
import {useRoute} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {deviceHeight} from 'utils/device';
import {ConversationsAddForm} from './organism';
import {addConversationType} from 'typings/addConversation.type';
import useConversation from 'context/ConversationAPI';
import {en} from 'locales/en';
import useSetting from 'context/SettingsAPI';

export const ConversationsAdd = () => {
  const {contactId, fullName} = useRoute<any>().params;

  const {
    actions: {addConversation},
    state: {addConversationLoading},
  } = useConversation();

  const {
    actions: {getContactFieldTypesList},
    state: {contactFieldTypesList},
  } = useSetting();

  useEffect(() => {
    getContactFieldTypesList();
  }, [getContactFieldTypesList]);

  const handleSubmit = async (value: addConversationType) => {
    const data = {
      api_conversation: {
        field_id: value.field,
        date: value.date,
        body: value.body,
      },
    };
    addConversation(contactId, data);
  };

  const initialValues = {
    field: '',
    date: '',
    body: '',
  };
  return (
    <Box height="100%" pt={'m'} flex={1} backgroundColor="lightBackground">
      <Box>
        <Navbar showBack title="add.conversation.title" />
        <TextView
          mt="xxl"
          ml="xl"
          variant="normalText"
          text={`${en['add.conversation.subtitle']} ${fullName}`}
        />
      </Box>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        enableOnAndroid>
        <Box
          mx="xl"
          mt={deviceHeight < 780 ? 'ml' : 'xs'}
          justifyContent="flex-end">
          <ConversationsAddForm
            initialValues={initialValues}
            onSubmit={handleSubmit}
            loading={addConversationLoading}
            list={contactFieldTypesList}
          />
        </Box>
      </KeyboardAwareScrollView>
    </Box>
  );
};
