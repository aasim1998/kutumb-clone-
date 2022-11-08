import React from 'react';
import {KeyboardAvoidingView, ScrollView} from 'react-native';
import {Box} from 'atoms/Box';
import {addLabel} from 'typings/addlabel.type';
import {AddLabelForm} from './organisms/AddLabelForm';
import {Navbar} from 'molecules/Navbar';
import useSetting from 'context/SettingsAPI';
import {TextView} from 'atoms/TextView';
import {deviceHeight, isIOS} from 'utils/device';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export const AddLabel = () => {
  const {
    actions: {addLabels},
    state: {addLabelsLoading},
  } = useSetting();

  const handleSubmit = async (values: addLabel) => {
    const data = {
      api_label: {
        name: values.addLabel,
        color: values.color,
      },
    };
    await addLabels(data);
  };

  const initialValues = {
    addLabel: '',
    color: 'black',
  };

  return (
    <Box height="100%" pt={'m'} flex={1} backgroundColor="lightBackground">
      <Box>
        <Navbar showBack title="addlabel.title" />
        <TextView
          mt="xxl"
          ml="xl"
          variant="normalText"
          color="black"
          text="addlabel.sub.text"
        />
      </Box>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false} enableOnAndroid>
          <Box
            mx="xl"
            mt={deviceHeight < 780 ? 'ml' :'xs'}
            justifyContent="flex-end">
            <AddLabelForm
              initialValues={initialValues}
              onSubmit={handleSubmit}
              loading={addLabelsLoading}
            />
          </Box>
        </KeyboardAwareScrollView>
    </Box>
  );
};
