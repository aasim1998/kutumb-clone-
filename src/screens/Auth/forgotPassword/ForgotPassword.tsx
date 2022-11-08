import React from 'react';
import {TextView} from 'atoms/TextView';
import {Box} from 'atoms/Box';
import {ForgotPasswordForm, FormValues} from './organisms/ForgotPasswordForm';
import {Navbar} from 'molecules/Navbar';
import useAuth from 'context/Authentication';
import {deviceHeight} from 'utils/device';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export const ForgotPassword = () => {
  const {
    state: {forgotPasswordLoading},
    actions: {forgotPassword},
  } = useAuth();

  const handleSubmit = async (values: FormValues) => {
    const data = {
      api_user: {
        email: values.email,
      },
    };
    forgotPassword(data);
  };

  const initialValues = {
    email: '',
  };
  return (
    <Box height="100%" pt={'m'} flex={1} backgroundColor="lightBackground">
      <Box>
        <Navbar showBack title="forgetPassword.title" />
        <TextView
          mt="xxl"
          ml="xl"
          variant="normalText"
          color="black"
          text="forgot.text"
        />
      </Box>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        enableOnAndroid>
        <Box
          mx="xl"
          mt={deviceHeight < 780 ? 'ml' : 'xs'}
          justifyContent="flex-end">
          <ForgotPasswordForm
            initialValues={initialValues}
            onSubmit={handleSubmit}
            loading={forgotPasswordLoading}
          />
        </Box>
      </KeyboardAwareScrollView>
    </Box>
  );
};
