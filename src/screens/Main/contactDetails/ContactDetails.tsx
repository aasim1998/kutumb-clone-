/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {Box} from 'atoms/Box';
import {TextView} from 'atoms/TextView';
import {Icon} from 'atoms/Icon';
import {Touch} from 'atoms/Touch';
import {Navbar} from 'molecules/Navbar';
import {useRoute} from '@react-navigation/native';
import {navigate} from 'services/NavigationService';
import {formatDate} from 'utils/DateFormatter/formatDate';
import {DATE_FORMATS} from 'utils/DateFormatter/dateTime';
import capitalizeName from 'utils/capitalization';
import useContact from 'context/ContactAPI';
import {Spinner} from 'atoms/Spinner';
import {deviceHeight} from 'utils/device';
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {en, LocaleString} from 'locales/en';
import {Row} from 'atoms/Row';
import {Image} from 'atoms/Image';
import theme from 'styles/theme';
import {Text} from 'atoms/Text';
import {FlatList} from 'react-native';
import {Routes} from 'typings/types/navigation.types';

export const ContactDetails = () => {
  const {contactItemId} = useRoute<any>().params;

  const {
    actions: {getContactItem, setFavorite},
    state: {contactItem, relativeList, contactItemLoading, favoriteContactItem},
  } = useContact();

  useEffect(() => {
    getContactItem(contactItemId);
  }, [contactItemId, getContactItem]);

  const {id, first_name, last_name, updated_at, phone} = contactItem;
  const fullName = capitalizeName(`${first_name} ${last_name}`);

  const renderRelativeIcon = () => {
    const slicedList = relativeList.length > 5 && relativeList.slice(1, 6);

    return relativeList.length !== 0 ? (
      <Touch
        mb={'xs'}
        onPress={() =>
          navigate('Relatives', {
            contactId: id,
            fullName: fullName,
          })
        }>
        <Row ml="sx" mt="xs" alignItems="center">
          {relativeList.length <= 5 ? (
            relativeList.map(relativeItem => (
              <Image
                key={relativeItem.id}
                source={require('../../../assets/images/user.jpg')}
                width={theme.spacing.l}
                height={theme.spacing.l}
                borderRadius={theme.spacing.mll}
                ml="-s"
                borderWidth={theme.spacing.xxs}
                borderColor="whiteShade"
              />
            ))
          ) : (
            <>
              {slicedList.map(slicedItem => (
                <Image
                  key={slicedItem.id}
                  source={require('../../../assets/images/user.jpg')}
                  width={theme.spacing.l}
                  height={theme.spacing.l}
                  borderRadius={theme.spacing.mll}
                  ml="-s"
                  borderWidth={theme.spacing.xxs}
                  borderColor="whiteShade"
                />
              ))}
              <Text
                ml="xs"
                localeId={`+${relativeList.length - slicedList.length}`}
              />
            </>
          )}
        </Row>
      </Touch>
    ) : null;
  };

  const renderFavoriteIcon = () => {
    return (
      <GestureHandlerRootView>
        <TouchableOpacity onPress={() => setFavorite(contactItemId)}>
          <Icon
            onPress={() => setFavorite(contactItemId)}
            icon={
              contactItem.favorite || favoriteContactItem?.contact?.favorite
                ? 'star-filled'
                : 'star-outline'
            }
            size={24}
            color={theme.colors.favoriteIconColor}
          />
        </TouchableOpacity>
      </GestureHandlerRootView>
    );
  };

  const renderItem = (item: contactDetailListItemProps) => {
    return (
      <Box>
        <Touch
          py="sl"
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
          onPress={() =>
            item.navigateScreen
              ? navigate(`${item.navigateScreen}`, {
                  contactId: id,
                  fullName: fullName,
                })
              : null
          }>
          <TextView pb="s" pt="s" variant="text_Base" text={`${item.text}`} />
          <Icon
            icon="chevron-right"
            color="#A0AEC0"
            size={24}
            onPress={() =>
              item.navigateScreen
                ? navigate(`${item.navigateScreen}`, {
                    contactId: id,
                    fullName: fullName,
                  })
                : null
            }
          />
        </Touch>
      </Box>
    );
  };

  type contactDetailListItemProps = {
    navigateScreen?: Routes;
    text: LocaleString;
  };

  const contactDetailListItem: Array<contactDetailListItemProps> = [
    {text: 'about.title'},
    {navigateScreen: 'ContactTimeline', text: 'timeline.title'},
    {navigateScreen: 'Notes', text: 'notes.title'},
    {navigateScreen: 'PhoneCall', text: 'phone.calls.title'},
    {navigateScreen: 'ContactTasks', text: 'tasks.title'},
    {navigateScreen: 'Relatives', text: 'relatives.title'},
    {navigateScreen: 'Conversations', text: 'conversations.title'},
    {text: 'reminders.title'},
    {navigateScreen: 'Gifts', text: 'gifts.title'},
    {navigateScreen: 'Debts', text: 'debts.title'},
    {navigateScreen: 'Documents', text: 'documents.title'},
    {navigateScreen: 'Events', text: 'events.title'},
    {navigateScreen: 'ContactActivities', text: 'account.activities.title'},
  ];

  return (
    <Box height="100%" pt={'m'} flex={1} backgroundColor="lightBackground">
      {contactItemLoading ? (
        <Box height="100%" justifyContent="center">
          <Spinner size={'large'} color={'primary'} />
        </Box>
      ) : (
        <>
          <Navbar showBack title={fullName} />
          <Box alignSelf="flex-end" mr="xl">
            {renderFavoriteIcon()}
          </Box>
          <Box m="xl" mt={deviceHeight < 780 ? '-xs' : '-ml'}>
            <TextView pt="s" variant="normalText" text={`${phone}`} />
            <TextView
              variant="normalText"
              text={`${en['contact.details.activity']} ${formatDate(
                updated_at,
                DATE_FORMATS.DATE_NEW_TIME_FORMAT,
              )}`}
            />
            {renderRelativeIcon()}
            <FlatList
              data={contactDetailListItem}
              showsVerticalScrollIndicator={false}
              renderItem={item => renderItem(item.item)}
              keyExtractor={(item, index) => index.toString()}
              ListHeaderComponent={() => <Box height={theme.spacing.sl} />}
              ListFooterComponent={() => (
                <Box
                  height={
                    deviceHeight < 780 ? theme.spacing.CXXV : theme.spacing.CL
                  }
                />
              )}
            />
          </Box>
        </>
      )}
    </Box>
  );
};
