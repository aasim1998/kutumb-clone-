import React from 'react';
import {Box} from 'atoms/Box';
import {Navbar} from 'molecules/Navbar';
import {Text} from 'atoms/Text';
import {JournalEditCommentForm} from './organism/JournalEditCommentForm';
import {useRoute} from '@react-navigation/native';
import {useJournal} from 'context/JournalAPI';
import {EditJournalCommentProps} from 'typings/journal.types';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Spinner} from 'atoms/Spinner';
import {deviceHeight} from 'utils/device';

export const JournalEditComment = () => {
  const {item} = useRoute<any>().params;

  const {
    actions: {editJournalComment},
    state: {journalCommentItemLoading, editJournalCommentLoading},
  } = useJournal();

  const handleSubmit = (value: EditJournalCommentProps) => {
    const data = {
      api_comment: {
        title: value.title,
        journal_id: item.journal_id,
      },
    };
    editJournalComment(item.id, data);
  };

  const initialValues = {
    title: item.title || '',
  };

  return (
    <Box pt={'m'} flex={1} backgroundColor="lightBackground">
      <Box>
        <Navbar showBack title="title.edit.journal.comment" />
        <Text
          mt="xxl"
          ml="xl"
          variant="normalText"
          color="greyText"
          localeId={'heading.edit.journal.comment'}
        />
      </Box>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        enableOnAndroid>
        <Box
          mx="xl"
          mt={deviceHeight < 780 ? 'ml' : 'xs'}
          justifyContent="flex-end">
          {journalCommentItemLoading ? (
            // eslint-disable-next-line react-native/no-inline-styles
            <Box style={{height: '100%', justifyContent: 'center'}}>
              <Spinner size={'large'} color={'primary'} />
            </Box>
          ) : (
            <JournalEditCommentForm
              initialValues={initialValues}
              onSubmit={handleSubmit}
              loading={editJournalCommentLoading}
            />
          )}
        </Box>
      </KeyboardAwareScrollView>
    </Box>
  );
};
