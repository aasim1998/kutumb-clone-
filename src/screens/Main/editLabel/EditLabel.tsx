import React, {useEffect} from 'react';
import {Box} from 'atoms/Box';
import {Text} from 'atoms/Text';
import {EditLabelForm} from './organisms/EditLabelForm';
import {Navbar} from 'molecules/Navbar';
import useSetting from 'context/SettingsAPI';
import {useRoute} from '@react-navigation/native';
import {deviceHeight} from 'utils/device';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export const EditLabel = () => {
  const {
    actions: {editLabel, getLabelItem},
    state: {editLabelLoading, editLabelItem},
  } = useSetting();

  const {labelItemId} = useRoute<any>().params;

  useEffect(() => {
    getLabelItem(labelItemId);
  }, []);

  const handleSubmit = async (values: any) => {
    editLabel(labelItemId, values);
  };

  const initialValues = {
    editLabel: editLabelItem.name,
    color: 'black',
  };

  return (
    <Box height="100%" pt={'m'} flex={1} backgroundColor="lightBackground">
      <Box>
        <Navbar showBack title="editlabel.title" />
        <Text
          mt="xxl"
          ml="xl"
          variant="normalText"
          color="black"
          localeId="editlabel.sub.text"
        />
      </Box>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        enableOnAndroid>
        <Box
          mx="xl"
          mt={deviceHeight < 780 ? 'ml' : 'xs'}
          justifyContent="flex-end">
          <EditLabelForm
            initialValues={initialValues}
            onSubmit={handleSubmit}
            loading={editLabelLoading}
          />
        </Box>
      </KeyboardAwareScrollView>
    </Box>
  );
};
