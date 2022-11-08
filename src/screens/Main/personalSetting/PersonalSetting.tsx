import React, {useState} from 'react';
import {Box} from 'atoms/Box';
import {TextView} from 'atoms/TextView';
import {useAuth} from 'context/Authentication';
import {Icon} from 'atoms/Icon';
import theme from 'styles/theme';
import {Touch} from 'atoms/Touch';
import {Navbar} from 'molecules/Navbar';
import {deviceHeight} from 'utils/device';
import {Modal} from 'molecules/Modal';
import {navigate} from 'services/NavigationService';
import {style} from 'styles/style';

export const PersonalSetting = () => {
  const {
    actions: {resetAccount, deleteAccount},
    state: {resetAccountLoading, deleteAccountLoading},
  } = useAuth();

  const [isResetModalVisible, setIsResetModalVisible] =
    useState<boolean>(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] =
    useState<boolean>(false);

  const closeResetModal = () => {
    setIsResetModalVisible(false);
  };

  const openResetModal = () => {
    setIsResetModalVisible(true);
  };

  const handleReset = async () => {
    closeResetModal();
    await resetAccount();
  };
  const closeDeleteModal = () => {
    setIsDeleteModalVisible(false);
  };

  const openDeleteModal = () => {
    setIsDeleteModalVisible(true);
  };

  const handleDelete = async () => {
    closeDeleteModal();
    await deleteAccount();
  };

  return (
    <Box height="100%" pt={'m'} flex={1} backgroundColor="lightBackground">
      <Box>
        <Navbar showBack title="personal.setting.title" />
        <TextView
          mt="xxl"
          ml="xl"
          variant="normalText"
          color="zBlack"
          text="change.your.personal"
        />
      </Box>
      <Box mt={deviceHeight < 780 ? 'l' : 'sx'} mx="xl" flex={1}>
        <Box>
          <Touch
            style={style.buttonItem}
            onPress={() => navigate('ProfileScreen')}>
            <TextView
              py="s"
              color="zBlack"
              variant="text_Base"
              text="user.profile"
            />
            <Icon
              icon="chevron-right"
              color={theme.colors.iconColorRight}
              size={20}
              onPress={() => navigate('ProfileScreen')}
            />
          </Touch>
        </Box>
        <Box mt="m">
          <Touch
            style={style.buttonItem}
            onPress={() => navigate('ChangePassword')}>
            <TextView
              py="s"
              color="zBlack"
              variant="text_Base"
              text="changePassword.title"
            />
            <Icon
              icon="chevron-right"
              color={theme.colors.iconColorRight}
              size={20}
              onPress={() => navigate('ChangePassword')}
            />
          </Touch>
        </Box>
        <Box mt="m">
          <Touch style={style.buttonItem} onPress={openResetModal}>
            <TextView
              py="s"
              color="zBlack"
              variant="text_Base"
              text="resetAccount.title"
            />
          </Touch>
        </Box>
        <Box mt="m">
          <Touch style={style.buttonItem} onPress={openDeleteModal}>
            <TextView
              py="s"
              color="zBlack"
              variant="text_Base"
              text="deleteAccount.title"
            />
          </Touch>
        </Box>
      </Box>
      <Modal
        isModalVisible={isResetModalVisible}
        onCloseModal={closeResetModal}
        onPress={handleReset}
        loading={resetAccountLoading}
        title="resetAccount.title"
        subtitle="resetAccount.subtitle"
      />
      <Modal
        isModalVisible={isDeleteModalVisible}
        onCloseModal={closeDeleteModal}
        onPress={handleDelete}
        loading={deleteAccountLoading}
        title="deleteAccount.title"
        subtitle="deleteAccount.subtitle"
      />
    </Box>
  );
};
