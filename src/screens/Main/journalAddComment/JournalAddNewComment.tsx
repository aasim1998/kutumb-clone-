import React from 'react';
import {Box} from 'atoms/Box';
import {Navbar} from 'molecules/Navbar';
import {Text} from 'atoms/Text';
import {JournalAddNewCommentForm} from './organism/JournalAddNewCommentForm';
import {AddJournalProps} from 'typings/journal.types';
import {useJournal} from 'context/JournalAPI';
import {useRoute} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {deviceHeight} from 'utils/device';

export const JournalAddNewComment = () => {
  const {journal_id} = useRoute<any>().params;

  const {
    actions: {addJournalComment},
    state: {addJournalCommentLoading},
  } = useJournal();

  const handleSubmit = (value: AddJournalProps) => {
    const data = {
      api_comment: {
        title: value.title,
        journal_id: journal_id,
      },
    };
    addJournalComment(data, journal_id);
  };

  const initialValues = {
    title: '',
  };

  return (
    <Box pt={'m'} flex={1} backgroundColor="lightBackground">
      <Box>
        <Navbar showBack title="title.add.new.comment" />
        <Text
          mt="xxl"
          ml="xl"
          variant="normalText"
          color="greyText"
          localeId={'heading.add.new.comment'}
        />
      </Box>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        enableOnAndroid>
        <Box
          mx="xl"
          mt={deviceHeight < 780 ? 'ml' : 'xs'}
          justifyContent="flex-end">
          <JournalAddNewCommentForm
            initialValues={initialValues}
            onSubmit={handleSubmit}
            loading={addJournalCommentLoading}
          />
        </Box>
      </KeyboardAwareScrollView>
    </Box>
  );
};
