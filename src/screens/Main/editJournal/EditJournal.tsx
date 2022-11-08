import React, {useEffect} from 'react';
import {Box} from 'atoms/Box';
import {Text} from 'atoms/Text';
import {EditJournalForm} from './organisms/EditJournalForm';
import {Navbar} from 'molecules/Navbar';
import {useRoute} from '@react-navigation/native';
import {useJournal} from 'context/JournalAPI';
import {EditJournalProps} from 'typings/journal.types';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Spinner} from 'atoms/Spinner';
import {deviceHeight} from 'utils/device';

export const EditJournal = () => {
  const {itemId} = useRoute<any>().params;

  const {
    actions: {editJournal, getJournalItem},
    state: {journalItem, editJournalLoading, journalItemLoading},
  } = useJournal();

  useEffect(() => {
    getJournalItem(itemId);
  }, [getJournalItem, itemId]);

  const handleSubmit = (value: EditJournalProps) => {
    const data = {
      api_journal: {
        title: value.title,
        body: value.body,
      },
    };
    editJournal(itemId, data);
  };

  const initialValues = {
    title: journalItem?.title || '',
    body: journalItem?.body || '',
  };

  return (
    <Box height="100%" pt={'m'} flex={1} backgroundColor="lightBackground">
      <Box>
        <Navbar showBack title="editjournal.title" />
        <Text
          mt="xxl"
          ml="xl"
          variant="normalText"
          color="greyText"
          localeId="editjournal.sub"
        />
      </Box>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        enableOnAndroid>
        <Box
          mx="xl"
          mt={deviceHeight < 780 ? 'ml' : 'xs'}
          justifyContent="flex-end">
          {journalItemLoading ? (
            <Box style={{height: '100%', justifyContent: 'center'}}>
              <Spinner size={'large'} color={'primary'} />
            </Box>
          ) : (
            <EditJournalForm
              initialValues={initialValues}
              onSubmit={handleSubmit}
              loading={editJournalLoading}
            />
          )}
        </Box>
      </KeyboardAwareScrollView>
    </Box>
  );
};
