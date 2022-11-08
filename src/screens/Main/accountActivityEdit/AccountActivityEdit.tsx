import React, {useEffect} from 'react';
import {Box} from 'atoms/Box';
import {Navbar} from 'molecules/Navbar';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {deviceHeight} from 'utils/device';
import {AccountActivityEditForm} from './organism';
import useSetting from 'context/SettingsAPI';
import {useRoute} from '@react-navigation/native';
import {editAccountActivityType} from 'typings/editAccountActivity';
import {Spinner} from 'atoms/Spinner';
import {Text} from 'atoms/Text';
import {style} from 'styles/style';

export const AccountActivityEdit = () => {
  const {activityId} = useRoute<any>().params;

  const {
    actions: {getAccountActivityItem, editAccountActivity},
    state: {
      accountActivityItem,
      accountActivityItemLoading,
      editAccountActivityLoading,
    },
  } = useSetting();

  useEffect(() => {
    getAccountActivityItem(activityId);
  }, [getAccountActivityItem, activityId]);

  const handleSubmit = async (value: editAccountActivityType) => {
    const data = {
      api_activity: {
        name: value.name,
      },
    };
    await editAccountActivity(activityId, data);
  };

  const initialValues = {
    name: accountActivityItem.name,
  };

  return (
    <Box height="100%" pt={'m'} flex={1} backgroundColor="lightBackground">
      <Box>
        <Navbar showBack title="edit.activity" />
        <Box mt="xl" />
      </Box>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        enableOnAndroid>
        <Box
          mx="xl"
          mt={deviceHeight < 780 ? 'xl' : 'l'}
          justifyContent="flex-end">
          {accountActivityItemLoading ? (
            <Box style={style.loaderStyles}>
              <Spinner size={'large'} color={'primary'} />
            </Box>
          ) : (
            <>
              <Text variant="text_Base" mb="s" localeId="activity.title" />
              <AccountActivityEditForm
                initialValues={initialValues}
                onSubmit={handleSubmit}
                loading={editAccountActivityLoading}
              />
            </>
          )}
        </Box>
      </KeyboardAwareScrollView>
    </Box>
  );
};
