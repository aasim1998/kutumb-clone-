import React from 'react';
import {TextView} from 'atoms/TextView';
import {Box} from 'atoms/Box';
import {SignUpScreenForm, FormValues} from './organisms/SignUpScreenForm';
import {Touch} from 'atoms/Touch';
import {navigate} from 'services/NavigationService';
import useAuth from 'context/Authentication';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Image} from 'atoms/Image';
import {deviceHeight, isIOS} from 'utils/device';

export const SignUpScreen = () => {
  const {
    actions: {signUp},
    state: {signUpLoading},
  } = useAuth();

  const handleSubmit = async (values: FormValues) => {
    const {first_name, last_name, email, password_confirmation, password} =
      values;

    const inputs = {
      api_user: {first_name, last_name, email, password_confirmation, password},
    };
    signUp(inputs);
  };
  const initialValues = {
    first_name: '',
    last_name: '',
    password: '',
    password_confirmation: '',
    email: '',
  };
  return (
    <Box bg="mainBackground" flex={1}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        enableOnAndroid>
        <Box
          height={isIOS ? deviceHeight * 0.95 : deviceHeight * 0.97}
          mx="xxl"
          bg="mainBackground"
          justifyContent="center"
          alignItems="center">
          <Image
            source={require('../../../assets/images/logo.jpeg')}
            height={80}
            width={80}
            mb={isIOS ? 'm' : 's'}
          />
          <TextView
            color="zBlack"
            variant="text_2xl"
            text="signUp.title"
            testID="SignUpTitle"
          />
          <Box width="100%" mt="mll">
            <SignUpScreenForm
              onSubmit={handleSubmit}
              loading={signUpLoading}
              initialValues={initialValues}
            />
          </Box>
          <Touch
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              position: 'absolute',
              bottom: isIOS ? (deviceHeight < 780 ? -30 : 0) : 0,
            }}
            onPress={() => navigate('Login')}>
            <TextView
              color="black"
              textDecorationLine="underline"
              pb="xxl"
              text="log.in"
            />
          </Touch>
        </Box>
      </KeyboardAwareScrollView>
    </Box>
  );
};
