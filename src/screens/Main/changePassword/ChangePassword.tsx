import React from 'react';
import {Box} from 'atoms/Box';
import {useAuth} from 'context/Authentication';
import {ChangePasswordForm} from './organism';
import {Navbar} from 'molecules/Navbar';
import {addChangePasswordType} from 'typings/changepassword.type';
import {TextView} from 'atoms/TextView';
import {deviceHeight} from 'utils/device';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export const ChangePassword = () => {
  const {
    actions: {changePassword},
    state:{changePasswordLoading}
  } = useAuth();

  const handleSubmit = async (values: addChangePasswordType) => {
    changePassword(values);
  };
  const initialValues = {
    profileOldPassword: '',
    profileNewPassword: '',
    profileConfirmPassword: '',
  };
  return (
    <Box height="100%" pt={'m'} flex={1} backgroundColor="lightBackground">
      <Box>
        <Navbar showBack title="changePassword.title" />
        <TextView
          mt="xxl"
          ml="xl"
          variant="normalText"
          color="black"
          text="change.your.password"
        />
      </Box>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false} enableOnAndroid>
          <Box
            mx="xl"
            mt={deviceHeight < 780 ? 'ml' : 'xs'}
            justifyContent="flex-end">
            <ChangePasswordForm
              initialValues={initialValues}
              onSubmit={handleSubmit}
              loading={changePasswordLoading}
            />
          </Box>
        </KeyboardAwareScrollView>
    </Box>
  );
};
