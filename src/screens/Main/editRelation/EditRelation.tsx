import React, {useEffect} from 'react';
import {Box} from 'atoms/Box';
import {Text} from 'atoms/Text';
import {EditRelationForm} from './organisms/EditRelationForm';
import {Navbar} from 'molecules/Navbar';
import useSetting from 'context/SettingsAPI';
import {useRoute} from '@react-navigation/native';
import {KeyboardAvoidingView, ScrollView} from 'react-native';
import {deviceHeight, isIOS} from 'utils/device';

export const EditRelation = () => {
  const {
    actions: {editRelation, getRelationItem},
    state: {editRelationLoading, editRelationItem},
  } = useSetting();

  const {relationItemId} = useRoute<any>().params;

  useEffect(() => {
    getRelationItem(relationItemId);
  }, []);

  const handleSubmit = async (values: any) => {
    editRelation(relationItemId, values);
  };

  const initialValues = {
    editRelation: editRelationItem.name,
    color: 'black',
  };

  return (
    <Box height="100%" pt={'m'} flex={1} backgroundColor="lightBackground">
      <Box>
        <Navbar showBack title="editrelation.title" />
        <Text
          mt="xxl"
          ml="xl"
          variant="normalText"
          color="black"
          localeId="editrelation.sub.text"
        />
      </Box>
      <ScrollView
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView enabled={false} behavior="height">
          <Box
            mx="xl"
            mt={deviceHeight < 780 ? 'ml' :'xs'}
            justifyContent="flex-end">
            <EditRelationForm
              initialValues={initialValues}
              onSubmit={handleSubmit}
              loading={editRelationLoading}
            />
          </Box>
        </KeyboardAvoidingView>
      </ScrollView>
    </Box>
  );
};
