import React from 'react';
import {Box} from 'atoms/Box';
import {useJournal} from 'context/JournalAPI';
import {Navbar} from 'molecules/Navbar';
import {Text} from 'atoms/Text';
import {AddJournalForm} from './organism/AddJournalForm';
import {AddJournalProps} from 'typings/journal.types';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {deviceHeight} from 'utils/device';
export const AddJournal = () => {
  const {
    actions: {addJournal},
    state: {addJournalLoading},
  } = useJournal();

  const handleSubmit = async (value: AddJournalProps) => {
    const jTitle = value.title.charAt(0).toUpperCase() + value.title.slice(1);
    const jBody = value.body.charAt(0).toUpperCase() + value.body.slice(1);
    const data = {
      api_journal: {
        title: jTitle,
        body: jBody,
      },
    };
    await addJournal(data);
  };

  const initialValues = {
    title: '',
    body: '',
  };

  return (
    <Box height="100%" pt={'m'} flex={1} backgroundColor="lightBackground">
      <Box>
        <Navbar showBack title="add.journal.title" />
        <Text
          mt="xxl"
          ml="xl"
          variant="normalText"
          color="greyText"
          localeId={'add.journal.heading'}
        />
      </Box>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        enableOnAndroid>
        <Box
          mx="xl"
          mt={deviceHeight < 780 ? 'ml' : 'xs'}
          justifyContent="flex-end">
          <Box>
            <AddJournalForm
              initialValues={initialValues}
              onSubmit={handleSubmit}
              loading={addJournalLoading}
            />
          </Box>
        </Box>
      </KeyboardAwareScrollView>
    </Box>
  );
};
