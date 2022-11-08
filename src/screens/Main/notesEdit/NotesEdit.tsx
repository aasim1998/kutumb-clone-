import React, {useEffect} from 'react';
import {Box} from 'atoms/Box';
import {NoteEditForm} from './organism';
import {Navbar} from 'molecules/Navbar';
import {useRoute} from '@react-navigation/native';
import {editNewNotesType} from 'typings/editNote.type';
import {Spinner} from 'atoms/Spinner';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {TextView} from 'atoms/TextView';
import {deviceHeight} from 'utils/device';
import useNotes from 'context/NotesAPI';
import {en} from 'locales/en';

export const NotesEdit = () => {
  const {listItemId, contactId, fullName} = useRoute<any>().params;

  const {
    actions: {getNoteItem, editNotes},
    state: {noteItem, noteItemLoading, editNotesLoading},
  } = useNotes();

  useEffect(() => {
    getNoteItem(listItemId, contactId);
  }, [contactId, getNoteItem, listItemId]);

  const handleSubmit = async (values: editNewNotesType) => {
    const data = {
      api_note: {
        title: values.title,
        body: values.editNotes,
      },
    };
    await editNotes(listItemId, contactId, data);
  };

  const initialValues = {
    title: noteItem.title || '',
    editNotes: noteItem.body,
  };
  return (
    <Box height="100%" pt={'m'} flex={1} backgroundColor="lightBackground">
      <Box>
        <Navbar showBack title="edit.notes" />
        <TextView
          mt="xxl"
          ml="xl"
          variant="normalText"
          color="black"
          text={`${en['edit.note.subtitle']} ${fullName}`}
        />
      </Box>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        enableOnAndroid>
        <Box
          mx="xl"
          mt={deviceHeight < 780 ? 'ml' : 'xs'}
          justifyContent="flex-end">
          {noteItemLoading ? (
            // eslint-disable-next-line react-native/no-inline-styles
            <Box style={{height: '100%', justifyContent: 'center'}}>
              <Spinner size={'large'} color={'primary'} />
            </Box>
          ) : (
            <NoteEditForm
              initialValues={initialValues}
              onSubmit={handleSubmit}
              loading={editNotesLoading}
            />
          )}
        </Box>
      </KeyboardAwareScrollView>
    </Box>
  );
};
