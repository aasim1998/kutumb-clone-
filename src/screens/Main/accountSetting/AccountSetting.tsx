import React from 'react';
import {Box} from 'atoms/Box';
import {Text} from 'atoms/Text';
import {Touch} from 'atoms/Touch';
import {Icon} from 'atoms/Icon';
import theme from 'styles/theme';
import {navigate} from 'services/NavigationService';
import {Navbar} from 'molecules/Navbar';
import {deviceHeight, isIOS} from 'utils/device';
import {style} from 'styles/style';

export const AccountSetting = () => {
  return (
    <Box height="100%" pt={'m'} flex={1} backgroundColor="lightBackground">
      <Navbar showBack title="accountsetting.title" />
      <Box m="xl" mt={isIOS ? (deviceHeight < 780 ? 'xxl' : 'l') : 'l'}>
        <Text
          variant="normalText"
          color="zBlack"
          localeId="accountsetting.sub.text"
        />
        <Box mt="l">
          <Touch
            style={style.buttonItem}
            onPress={() => navigate('LabelScreen')}>
            <Text
              pb="s"
              pt="s"
              color="zBlack"
              variant="text_Base"
              localeId="labels.title"
            />
            <Icon
              icon="chevron-right"
              color={theme.colors.iconColorRight}
              size={24}
              onPress={() => navigate('LabelScreen')}
            />
          </Touch>
        </Box>
        <Box mt="mll">
          <Touch
            style={style.buttonItem}
            onPress={() => navigate('RelationScreen')}>
            <Text
              pb="s"
              pt="s"
              color="zBlack"
              variant="text_Base"
              localeId="relations.title"
            />
            <Icon
              icon="chevron-right"
              color={theme.colors.iconColorRight}
              size={24}
              onPress={() => navigate('RelationScreen')}
            />
          </Touch>
        </Box>
        <Box mt="mll">
          <Touch
            style={style.buttonItem}
            onPress={() => navigate('ArchivedContact')}>
            <Text
              pb="s"
              pt="s"
              color="zBlack"
              variant="text_Base"
              localeId="archived.contact.title"
            />
            <Icon
              icon="chevron-right"
              color={theme.colors.iconColorRight}
              size={24}
              onPress={() => navigate('ArchivedContact')}
            />
          </Touch>
        </Box>
        <Box mt="mll">
          <Touch
            style={style.buttonItem}
            onPress={() => navigate('ContactFieldTypes')}>
            <Text
              pb="s"
              pt="s"
              color="zBlack"
              variant="text_Base"
              localeId="contact.field.types.title"
            />
            <Icon
              icon="chevron-right"
              color={theme.colors.iconColorRight}
              size={24}
              onPress={() => navigate('ContactFieldTypes')}
            />
          </Touch>
        </Box>
        <Box mt="mll">
          <Touch
            style={style.buttonItem}
            onPress={() => navigate('AccountActivities')}>
            <Text
              pb="s"
              pt="s"
              color="zBlack"
              variant="text_Base"
              localeId="account.activities.title"
            />
            <Icon
              icon="chevron-right"
              color={theme.colors.iconColorRight}
              size={24}
              onPress={() => navigate('AccountActivities')}
            />
          </Touch>
        </Box>
        <Box mt="mll">
          <Touch
            style={style.buttonItem}
            onPress={() => navigate('LifeEvents')}>
            <Text
              pb="s"
              pt="s"
              color="zBlack"
              variant="text_Base"
              localeId="life.events.title"
            />
            <Icon
              icon="chevron-right"
              color={theme.colors.iconColorRight}
              size={24}
              onPress={() => navigate('LifeEvents')}
            />
          </Touch>
        </Box>
      </Box>
    </Box>
  );
};
