import React, {useState} from 'react';
import {Box} from 'atoms/Box';
import {TextView} from 'atoms/TextView';
import {useAuth} from 'context/Authentication';
import {Icon} from 'atoms/Icon';
import theme from 'styles/theme';
import {Text} from 'atoms/Text';
import {Touch} from 'atoms/Touch';
import {Navbar} from 'molecules/Navbar';
import {navigate} from 'services/NavigationService';
import {LogoutModal} from 'molecules/LogoutModel';
import Config from 'react-native-config';
import {deviceHeight, isIOS} from 'utils/device';

export const Setting = ({navigation}: {navigation: any}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const {
    state: {logoutLoading},
    actions: {logout},
  } = useAuth();

  const handleSubmit = async () => {
    logout();
    navigate('Login');
  };

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };
  const handleLogout = async () => {
    closeModal();
    await logout();
  };

  return (
    <Box height="100%" pt={'m'} flex={1} backgroundColor="lightBackground">
      <Box >
        <Box mb={isIOS?'-ll':'-xl'}>
        <Navbar
        renderLeft={
          <Text  variant="text_2xl" color="black" localeId="user.settings" />
        }
      />
        </Box>
      <TextView mx='xl' variant="normalText" color="zBlack" text="settings.txt1" mt='xxl'/>
      </Box>
      <Box mt={deviceHeight < 780 ? 'xxxl' : 'xxl'} m="xl" >
        <Box >
          <Touch
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
            onPress={() => navigation.navigate('PersonalSetting')}>
            <TextView
              pb="s"
              pt="s"
              variant="text_Base"
              color="zBlack"
              text="personal.setting.title"
            />
            <Icon
              icon="chevron-right"
              color={theme.colors.iconColorRight}
              size={24}
              onPress={() => navigation.navigate('PersonalSetting')}
            />
          </Touch>
        </Box>
        <Box mt="mll">
          <Touch
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
            onPress={() => navigation.navigate('AccountSetting')}>
            <TextView
              pb="s"
              pt="s"
              variant="text_Base"
              color="zBlack"
              text="account.setting.title"
            />
            <Icon
              icon="chevron-right"
              color={theme.colors.iconColorRight}
              size={24}
              onPress={() => navigation.navigate('AccountSetting')}
            />
          </Touch>
        </Box>
        <Box mt="mll">
          <Touch
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TextView
              pb="s"
              pt="s"
              variant="text_Base"
              color="zBlack"
              text="notification.title"
            />
            <Icon
              icon="chevron-right"
              color={theme.colors.iconColorRight}
              size={24}
            />
          </Touch>
        </Box>
        <Box mt="mll">
          <Touch style={{flexDirection: 'row', alignItems: 'center'}}>
            <TextView
              pb="s"
              pt="s"
              variant="text_Base"
              text="terms.condition.title"
              color="zBlack"
            />
          </Touch>
        </Box>
        <Box mt="mll">
          <Touch style={{flexDirection: 'row', alignItems: 'center'}}>
            <TextView
              pb="s"
              pt="s"
              variant="text_Base"
              text="privacy.policy.title"
              color="zBlack"
            />
          </Touch>
        </Box>
        <Box mt="mll">
          <Touch
            style={{flexDirection: 'row', alignItems: 'center'}}
            onPress={openModal}>
            <TextView
              pb="s"
              pt="s"
              color="zBlack"
              variant="text_Base"
              text="sign.out.title"
            />
            <LogoutModal
              isModalVisible={isModalVisible}
              onCloseModal={closeModal}
              onLogout={handleLogout}
              localeID="are.you.sure.logout"
            />
          </Touch>
        </Box>
      </Box>
      <Box style={{position: 'absolute', bottom: 10, alignSelf: 'center'}}>
        <TextView
          color="zBlack"
          variant="normalIconText"
          text={`Version ${Config.APP_VERSION_NAME}`}
        />
      </Box>
    </Box>
  );
};
