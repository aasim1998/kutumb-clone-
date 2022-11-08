import React, {useEffect} from 'react';
import {Box} from 'atoms/Box';
import {TextView} from 'atoms/TextView';
import {Navbar} from 'molecules/Navbar';
import {useRoute} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {deviceHeight} from 'utils/device';
import {Spinner} from 'atoms/Spinner';
import {en} from 'locales/en';
import {DocumentEditForm} from './organisms';
import useDocument from 'context/DocumentAPI';
import {editDocumentType} from 'typings/editDocument.type';

export const DocumentsEdit = () => {
  const {listItemId, contactId, fullName} = useRoute<any>().params;

  const {
    actions: {getDocumentItem, editDocument},
    state: {documentItem, documentItemLoading, editDocumentLoading},
  } = useDocument();

  useEffect(() => {
    getDocumentItem(listItemId, contactId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getDocumentItem, listItemId]);

  const handleSubmit = async (value: editDocumentType) => {
    const data = {
      api_document: {
        comments: value.comments,
        link: value.link,
      },
    };
    editDocument(listItemId, contactId, data);
  };

  const initialValues = {
    link: documentItem.link,
    comments: documentItem.comments,
  };
  return (
    <Box height="100%" pt={'m'} flex={1} backgroundColor="lightBackground">
      <Box>
        <Navbar showBack title="edit.document" />
        <TextView
          mt="xxl"
          ml="xl"
          variant="normalText"
          text={`${en['edit.document.subtitle']} ${fullName}`}
        />
      </Box>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        enableOnAndroid>
        <Box
          mx="xl"
          mt={deviceHeight < 780 ? 'ml' : 'xs'}
          justifyContent="flex-end">
          {documentItemLoading ? (
            <Box
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                height: '100%',
                justifyContent: 'center',
              }}>
              <Spinner size={'large'} color={'primary'} />
            </Box>
          ) : (
            <DocumentEditForm
              initialValues={initialValues}
              onSubmit={handleSubmit}
              loading={editDocumentLoading}
            />
          )}
        </Box>
      </KeyboardAwareScrollView>
    </Box>
  );
};
