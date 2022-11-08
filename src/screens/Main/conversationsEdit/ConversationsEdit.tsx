import React, {useEffect} from 'react';
import {Box} from 'atoms/Box';
import {TextView} from 'atoms/TextView';
import {Navbar} from 'molecules/Navbar';
import {useRoute} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {deviceHeight} from 'utils/device';
import {ConversationsEditForm} from './organism';
import {editConversationType} from 'typings/editConversation.type';
import {Spinner} from 'atoms/Spinner';
import useConversation from 'context/ConversationAPI';
import {en} from 'locales/en';
import useSetting from 'context/SettingsAPI';
import {style} from 'styles/style';

export const ConversationsEdit = () => {
  const {conversationId, contactId, fullName} = useRoute<any>().params;

  const {
    actions: {getConversationItem, editConversation},
    state: {conversationItem, conversationItemLoading, editConversationLoading},
  } = useConversation();

  const {
    actions: {getContactFieldTypesList},
    state: {contactFieldTypesList},
  } = useSetting();

  useEffect(() => {
    getConversationItem(conversationId, contactId);
    getContactFieldTypesList();
  }, [
    getConversationItem,
    conversationId,
    contactId,
    getContactFieldTypesList,
  ]);

  const handleSubmit = async (value: editConversationType) => {
    const data = {
      api_conversation: {
        date: value.date,
        body: value.body,
        field_id: value.field,
      },
    };
    editConversation(conversationId, contactId, data);
  };

  const initialValues = {
    date: conversationItem.date,
    body: conversationItem.body,
    field: conversationItem.field_id,
  };
  return (
    <Box height="100%" pt={'m'} flex={1} backgroundColor="lightBackground">
      <Box>
        <Navbar showBack title="edit.conversation.title" />
        <TextView
          mt="xxl"
          ml="xl"
          variant="normalText"
          text={`${en['edit.conversation.subtitle']} ${fullName}`}
        />
      </Box>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        enableOnAndroid>
        <Box
          mx="xl"
          mt={deviceHeight < 780 ? 'ml' : 'xs'}
          justifyContent="flex-end">
          {conversationItemLoading ? (
            <Box style={style.loaderStyles}>
              <Spinner size={'large'} color={'primary'} />
            </Box>
          ) : (
            <ConversationsEditForm
              initialValues={initialValues}
              onSubmit={handleSubmit}
              loading={editConversationLoading}
              list={contactFieldTypesList}
            />
          )}
        </Box>
      </KeyboardAwareScrollView>
    </Box>
  );
};
