import React from 'react';
import {TextView} from 'atoms/TextView';
import {Box} from 'atoms/Box';
import {Button} from 'molecules/Button';
import {PressEvent} from 'typings/utils';
import {navigate} from 'services/NavigationService';
import {Touch} from 'atoms/Touch';
import {Icon} from 'atoms/Icon';
import theme from 'styles/theme';
import {isIOS} from 'utils/device';

export const ResendConfirmationSent = () => {
  const handleSubmit = async () => {
    navigate('Login');
  };
  return (
    <Box height="100%" pt={'m'} flex={1} backgroundColor="lightBackground">
      <Box mx="bm" mt={isIOS ? 'sx' : 'ml'}>
        <Touch
          position="absolute"
          left={15}
          onPress={() => navigate('Login')}
          backgroundColor="mainBackground">
          <Icon
            icon="arrow-left"
            size={24}
            color={theme.colors.iconColor}
            onPress={() => navigate('Login')}
          />
        </Touch>
        <TextView
          variant="text_2xl"
          mx="bm"
          mt="xl"
          color="zBlack"
          text="emailSent.title"
        />
      </Box>
      <Box ml="xl" mr="xl" mb="xl" mt="xs">
        <TextView
          color="zBlack"
          variant="normalText"
          mt="sl"
          mb="mll"
          text="resend.confirmation.email.Desc"
        />
        <Button
          title="login.btn.title"
          loading={false}
          variant="primary"
          onPress={handleSubmit as PressEvent}
        />
      </Box>
    </Box>
  );
};
