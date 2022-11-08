import React from 'react';
import {Box} from 'atoms/Box';
import {TextView} from 'atoms/TextView';
import {Navbar} from 'molecules/Navbar';
import {useRoute} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {deviceHeight} from 'utils/device';
import {DocumentAddForm} from './organism';
import {en} from 'locales/en';
import {addNewDocumentType} from 'typings/addNewDocument.type';
import useDocument from 'context/DocumentAPI';

export const DocumentsAdd = () => {
  const {contactId, fullName} = useRoute<any>().params;

  const {
    actions: {addDocument},
    state: {addDocumentLoading},
  } = useDocument();

  const handleSubmit = async (value: addNewDocumentType) => {
    const data = {
      api_document: {
        filename: value.filename,
        comments: value.comments,
        link: value.link,
      },
    };
    addDocument(contactId, data);
  };

  const initialValues = {
    filename: '',
    comments: '',
    link: '',
  };
  return (
    <Box height="100%" pt={'m'} flex={1} backgroundColor="lightBackground">
      <Box>
        <Navbar showBack title="add.new.document" />
        <TextView
          mt="xxl"
          ml="xl"
          variant="normalText"
          text={`${en['add.new.document.subtitle']} ${fullName}`}
        />
      </Box>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        enableOnAndroid>
        <Box
          mx="xl"
          mt={deviceHeight < 780 ? 'ml' : 'xs'}
          justifyContent="flex-end">
          <DocumentAddForm
            initialValues={initialValues}
            onSubmit={handleSubmit}
            loading={addDocumentLoading}
          />
        </Box>
      </KeyboardAwareScrollView>
    </Box>
  );
};
