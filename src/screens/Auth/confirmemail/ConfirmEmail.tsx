import React from 'react';
import {Box} from 'atoms/Box';
import {Button} from 'molecules/Button';
import {PressEvent} from 'typings/utils';
import {navigate} from 'services/NavigationService';
import {Touch} from 'atoms/Touch';
import {Icon} from 'atoms/Icon';
import theme from 'styles/theme';
import {isIOS} from 'utils/device';
import {Text} from 'atoms/Text';

export const ConfirmEmail = () => {
  const handleSubmit = async () => {
    navigate('Login');
  };
  return (
    <Box height="100%" flex={1} backgroundColor="lightBackground">
      <Box mx="bm" mt={isIOS ? 'XL' : 'ml'}>
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
        <Text
          variant="text_2xl"
          mx="bm"
          mt="xl"
          color="zBlack"
          localeId="confirmEmail.title"
        />
      </Box>

      <Box ml="xl" mr="xl" mb="xl" mt="sx">
        <Text
          color="zBlack"
          variant="normalText"
          mt="sl"
          mb="mll"
          localeId="confirm.Desc"
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
