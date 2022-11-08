import React from 'react';
import {TextView} from 'atoms/TextView';
import {Box} from 'atoms/Box';
import {FormValues, LoginScreenForm} from './organisms/LoginScreenForm';
import {Touch} from 'atoms/Touch';
import {navigate} from 'services/NavigationService';
import {useAuth} from 'context/Authentication';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {deviceHeight, isIOS} from 'utils/device';
import {Image} from 'atoms/Image';

export const Login = () => {
  const {
    actions: {login},
    state: {loginLoading},
  } = useAuth();

  const handleSubmit = async (values: FormValues) => {
    const {email, password} = values;

    const inputs = {
      api_user: {email, password},
    };
    login(inputs);
  };

  const initialValues = {
    email: '',
    password: '',
  };

  return (
    <Box bg="mainBackground" flex={1}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        enableOnAndroid>
        <Box
          height={isIOS ? deviceHeight * 0.9 : deviceHeight * 0.97}
          bg="mainBackground"
          mx="xxl"
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
            text="sign.in"
            testID="SignInTitle"
          />
          <Box width="100%" mt="mll">
            <LoginScreenForm
              onSubmit={handleSubmit}
              loading={loginLoading}
              initialValues={initialValues}
            />
          </Box>
          <Touch>
            <TextView
              color="black"
              textDecorationLine="underline"
              mt="mll"
              text="forgetPassword.text"
              onPress={() => navigate('ForgotPassword')}
            />
          </Touch>
          <Touch>
            <TextView
              color="black"
              textAlign="center"
              textDecorationLine="underline"
              mt="m"
              text="resend.confirmation.text"
              onPress={() => navigate('ResendConfirmation')}
            />
          </Touch>
        </Box>
        <Touch>
          <TextView
            color="black"
            textAlign="center"
            mb="m"
            textDecorationLine="underline"
            text="signup.text"
            onPress={() => navigate('SignUpScreen')}
          />
        </Touch>
      </KeyboardAwareScrollView>
    </Box>
  );
};
