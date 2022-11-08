import React from 'react';
import {TextView} from 'atoms/TextView';
import {Box} from 'atoms/Box';
import {Navbar} from 'molecules/Navbar';
import useAuth from 'context/Authentication';
import {deviceHeight} from 'utils/device';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {FormValues, ResendConfirmationForm} from './organism';

export const ResendConfirmation = () => {
  const {
    state: {resendConfirmationLoading},
    actions: {resendConfirmation},
  } = useAuth();

  const handleSubmit = async (values: FormValues) => {
    const data = {
      api_user: {
        email: values.email,
      },
    };
    resendConfirmation(data);
  };

  const initialValues = {
    email: '',
  };

  return (
    <Box height="100%" pt={'m'} flex={1} backgroundColor="lightBackground">
      <Box>
        <Navbar showBack title="resend.confirmation.title" />
        <TextView
          mt="xxl"
          ml="xl"
          variant="normalText"
          color="black"
          text="resend.confirmation.subtitle"
        />
      </Box>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        enableOnAndroid>
        <Box
          mx="xl"
          mt={deviceHeight < 780 ? 'ml' : 'xs'}
          justifyContent="flex-end">
          <ResendConfirmationForm
            initialValues={initialValues}
            onSubmit={handleSubmit}
            loading={resendConfirmationLoading}
          />
        </Box>
      </KeyboardAwareScrollView>
    </Box>
  );
};
