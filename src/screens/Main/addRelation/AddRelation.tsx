import React from 'react';
import {Box} from 'atoms/Box';
import {Text} from 'atoms/Text';
import {AddRelationForm} from './organisms/AddRelationForm';
import {addRelation} from 'typings/addrelation.type';
import {Navbar} from 'molecules/Navbar';
import useSetting from 'context/SettingsAPI';
import {deviceHeight} from 'utils/device';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export const AddRelation = () => {
  const {
    actions: {addRelations},
    state: {addRelationsLoading},
  } = useSetting();

  const handleSubmit = async (values: addRelation) => {
    const data = {
      api_relation: {
        name: values.addRelation,
      },
    };
    await addRelations(data);
  };

  const initialValues = {
    addRelation: '',
    color: 'black',
  };

  return (
    <Box height="100%" pt={'m'} flex={1} backgroundColor="lightBackground">
      <Box>
        <Navbar showBack title="addrelation.title" />
        <Text
          mt="xxl"
          ml="xl"
          variant="normalText"
          color="black"
          localeId="addrelation.sub.text"
        />
      </Box>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false} enableOnAndroid>
          <Box
            mx="xl"
            mt={deviceHeight < 780 ? 'ml' : 'xs'}
            justifyContent="flex-end">
            <AddRelationForm
              initialValues={initialValues}
              onSubmit={handleSubmit}
              loading={addRelationsLoading}
            />
          </Box>
        </KeyboardAwareScrollView>
    </Box>
  );
};
