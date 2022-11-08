import React, {useEffect} from 'react';
import {Box} from 'atoms/Box';
import {TextView} from 'atoms/TextView';
import {Navbar} from 'molecules/Navbar';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {deviceHeight} from 'utils/device';
import {AccountActivityAddForm} from './organism';
import {addAccountActivityType} from 'typings/addAccountActivity.type';
import useSetting from 'context/SettingsAPI';
import {Text} from 'atoms/Text';

export const AccountActivityAdd = () => {
  const {
    actions: {getAccountActivitiesGroupList, addAccountActivity},
    state: {accountActivitiesGroupList, addAccountActivityLoading},
  } = useSetting();

  useEffect(() => {
    getAccountActivitiesGroupList();
  }, [getAccountActivitiesGroupList]);

  const handleSubmit = async (value: addAccountActivityType) => {
    const data = {
      api_activity: {
        name: value.name,
        group_id: value.group,
      },
    };
    await addAccountActivity(data);
  };

  const initialValues = {
    name: '',
    group: '',
  };

  return (
    <Box height="100%" pt={'m'} flex={1} backgroundColor="lightBackground">
      <Box>
        <Navbar showBack title="add.new.activity" />
        <TextView
          mt="xxl"
          mx="xl"
          variant="normalText"
          text="add.new.activity.subtitle"
        />
      </Box>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        enableOnAndroid>
        <Box
          mx="xl"
          mt={deviceHeight < 780 ? 'xxl' : 'xl'}
          justifyContent="flex-end">
          <Text variant="text_Base" mb="s" localeId="select.group" />
          <AccountActivityAddForm
            initialValues={initialValues}
            onSubmit={handleSubmit}
            loading={addAccountActivityLoading}
            list={accountActivitiesGroupList}
          />
        </Box>
      </KeyboardAwareScrollView>
    </Box>
  );
};
