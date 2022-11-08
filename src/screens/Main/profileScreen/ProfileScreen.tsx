import React, {useEffect} from 'react';
import {Box} from 'atoms/Box';
import {TextView} from 'atoms/TextView';
import {ProfileScreenForm} from './organisms/ProfileScreenForm';
import {Navbar} from 'molecules/Navbar';
import {useSetting} from 'context/SettingsAPI';
import {capitalizeTitle} from 'utils/capitalization';
import {deviceHeight} from 'utils/device';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Spinner} from 'atoms/Spinner';

export const ProfileScreen = () => {
  const {
    actions: {getPersonalDetailItem, updatePersonalDetail},
    state: {
      personalDetailItem,
      getPersonalDetailLoading,
      updatePersonalDetailLoading,
    },
  } = useSetting();

  useEffect(() => {
    getPersonalDetailItem();
  }, [getPersonalDetailItem]);

  const handleSubmit = values => {
    updatePersonalDetail(values);
  };

  const initialValues = {
    profileFirstName: capitalizeTitle(`${personalDetailItem.first_name}`) || '',
    profileLastName: capitalizeTitle(`${personalDetailItem.last_name}`) || '',
  };

  return (
    <Box height="100%" pt={'m'} flex={1} backgroundColor="lightBackground">
      <Box>
        <Navbar showBack title="user.profile" />
        <TextView
          mt="xxl"
          ml="xl"
          variant="normalText"
          color="black"
          text="profile.text"
        />
      </Box>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        enableOnAndroid>
        <Box
          mx="xl"
          mt={deviceHeight < 780 ? 'ml' : 'xs'}
          justifyContent="flex-end">
          {getPersonalDetailLoading ? (
            // eslint-disable-next-line react-native/no-inline-styles
            <Box style={{height: '100%', justifyContent: 'center'}}>
              <Spinner size={'large'} color={'primary'} />
            </Box>
          ) : (
            <ProfileScreenForm
              initialValues={initialValues}
              onSubmit={handleSubmit}
              loading={updatePersonalDetailLoading}
            />
          )}
        </Box>
      </KeyboardAwareScrollView>
    </Box>
  );
};
