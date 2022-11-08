import React from 'react';
import {Box} from 'atoms/Box';
import {TextView} from 'atoms/TextView';
import {NoteAddForm} from './organism';
import {Navbar} from 'molecules/Navbar';
import {addNewNotesType} from 'typings/addNewNote.type';
import {useRoute} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {deviceHeight} from 'utils/device';
import useNotes from 'context/NotesAPI';
import {en} from 'locales/en';

export const NotesAdd = () => {
  const {
    actions: {addNotes},
    state: {addNotesLoading},
  } = useNotes();

  const {contactId, fullName} = useRoute<any>().params;

  const handleSubmit = async (value: addNewNotesType) => {
    const data = {
      api_note: {
        title: value.title,
        body: value.addNotes,
      },
    };
    await addNotes(contactId, data);
  };

  const initialValues = {
    title: '',
    addNotes: '',
  };
  return (
    <Box height="100%" pt={'m'} flex={1} backgroundColor="lightBackground">
      <Box>
        <Navbar showBack title="add.new.notes" />
        <TextView
          mt="xxl"
          ml="xl"
          variant="normalText"
          text={`${en['add.new.note.subtitle']} ${fullName}`}
        />
      </Box>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        enableOnAndroid>
        <Box
          mx="xl"
          mt={deviceHeight < 780 ? 'ml' : 'xs'}
          justifyContent="flex-end">
          <NoteAddForm
            initialValues={initialValues}
            onSubmit={handleSubmit}
            loading={addNotesLoading}
          />
        </Box>
      </KeyboardAwareScrollView>
    </Box>
  );
};
