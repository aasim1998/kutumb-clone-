import React from 'react';
import {Platform} from 'react-native';
import {Image} from 'atoms/Image';
import {Box} from 'atoms/Box';
import theme from 'styles/theme';
import {en} from 'locales/en';
import capitalizeName from 'utils/capitalization';
import {Text} from 'atoms/Text';
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {TextView} from 'atoms/TextView';
import {navigate} from 'services/NavigationService';
import {isAndroid} from 'utils/device';
import {ITEM_ACTION_FOR_CONTEXT, ITEM_TRACKABLE_TYPE} from 'utils/constants';

export const ActivityListItem = ({
  image,
  assignee,
  desc1,
  assignTo,
  date,
  item,
}) => {
  return (
    <Box mb="m" flexDirection="row" flex={1} justifyContent="space-between">
      <Image
        source={image}
        style={{
          width: theme.spacing.xl,
          height: theme.spacing.xl,
          borderRadius: theme.spacing.XXXL,
          marginRight: theme.spacing.bm,
        }}
      />
      <Box
        bg="chipBackground"
        height="100%"
        width={theme.spacing.xss}
        position="absolute"
        ml="bm"
        mt="xll"
      />
      <Box
        flexDirection={'row'}
        marginTop="xs"
        mr="bm"
        flexWrap="wrap"
        flex={1}>
        <Text
          variant={Platform.OS === 'ios' ? 'normalText' : 'text_sm'}
          color={assignee ? 'darkText' : 'greyText'}
          fontWeight={assignee ? '700' : '400'}
          localeId={`${
            assignee ? capitalizeName(assignee) : en['assignee.text']
          } ${desc1} `}
        />
        {assignTo ? (
          <GestureHandlerRootView>
            <TouchableOpacity
              onPress={() => {
                switch (item.trackable_type) {
                  case ITEM_TRACKABLE_TYPE.CONTACT:
                    if (
                      item.action_for_context ===
                        ITEM_ACTION_FOR_CONTEXT.ADDED_NEW_CONTACT ||
                      item.action_for_context ===
                        ITEM_ACTION_FOR_CONTEXT.UNARCHIVED_CONTACT
                    ) {
                      navigate('Contacts', {
                        screen: 'ContactDetails',
                        params: {contactItemId: item.eventable.id},
                      });
                    } else {
                      navigate('Settings', {screen: 'ArchivedContact'});
                    }
                    break;
                  case ITEM_TRACKABLE_TYPE.NOTE:
                    if (
                      item.action_for_context ===
                      ITEM_ACTION_FOR_CONTEXT.ADDED_NOTE
                    ) {
                      navigate('Contacts', {
                        screen: 'Notes',
                        params: {
                          contactId: item.eventable.id,
                          fullName: capitalizeName(assignTo),
                        },
                      });
                    }
                    break;
                  case ITEM_TRACKABLE_TYPE.TASK:
                    if (
                      item.action_for_context ===
                      ITEM_ACTION_FOR_CONTEXT.ADDED_TASK
                    ) {
                      navigate('Contacts', {
                        screen: 'ContactTasks',
                        params: {
                          contactId: item.eventable.id,
                          fullName: capitalizeName(assignTo),
                        },
                      });
                    }
                    break;
                  case ITEM_TRACKABLE_TYPE.JOURNAL:
                    if (
                      item.action_for_context ===
                      ITEM_ACTION_FOR_CONTEXT.ADDED_JOURNAL
                    ) {
                      navigate('Journals', {
                        screen: 'JournalDetails',
                        params: {
                          id: item.trackable.id,
                        },
                      });
                    }
                    break;
                  case ITEM_TRACKABLE_TYPE.PHONE_CALL:
                    if (
                      item.action_for_context ===
                      ITEM_ACTION_FOR_CONTEXT.ADDED_PHONE_CALL
                    ) {
                      navigate('Contacts', {
                        screen: 'PhoneCall',
                        params: {
                          contactId: item.eventable.id,
                          fullName: capitalizeName(assignTo),
                        },
                      });
                    }
                    break;
                  case ITEM_TRACKABLE_TYPE.RELATIVE:
                    if (
                      item.action_for_context ===
                      ITEM_ACTION_FOR_CONTEXT.ADDED_RELATIVE
                    ) {
                      navigate('Contacts', {
                        screen: 'Relatives',
                        params: {
                          contactId: item.eventable.id,
                          fullName: capitalizeName(assignTo),
                        },
                      });
                    }
                    break;
                  case ITEM_TRACKABLE_TYPE.GIFT:
                    if (
                      item.action_for_context ===
                      ITEM_ACTION_FOR_CONTEXT.ADDED_GIFT
                    ) {
                      navigate('Contacts', {
                        screen: 'Gifts',
                        params: {
                          contactId: item.eventable.id,
                          fullName: capitalizeName(assignTo),
                        },
                      });
                    }
                    break;
                  case ITEM_TRACKABLE_TYPE.DEBT:
                    if (
                      item.action_for_context ===
                      ITEM_ACTION_FOR_CONTEXT.ADDED_DEBT
                    ) {
                      navigate('Contacts', {
                        screen: 'Debts',
                        params: {
                          contactId: item.eventable.id,
                          fullName: capitalizeName(assignTo),
                        },
                      });
                    }
                    break;
                }
              }}>
              <TextView
                variant={Platform.OS === 'ios' ? 'normalText' : 'text_sm'}
                color="darkText"
                // eslint-disable-next-line react-native/no-inline-styles
                style={{marginTop: isAndroid ? 1 : 0}}
                fontWeight="700">
                {capitalizeName(assignTo)}
              </TextView>
            </TouchableOpacity>
          </GestureHandlerRootView>
        ) : (
          item?.trackable_id && (
            <TextView
              fontWeight="400"
              variant={Platform.OS === 'ios' ? 'normalText' : 'text_sm'}
              color="greyText"
              text="assignee.text.dlt"
            />
          )
        )}
      </Box>
      <Box flexDirection="row-reverse" marginTop="xs" justifyContent="flex-end">
        <Text
          variant={Platform.OS === 'ios' ? 'normalText' : 'text_sm'}
          color="greyText"
          fontWeight="700"
          localeId={date}
        />
      </Box>
    </Box>
  );
};
