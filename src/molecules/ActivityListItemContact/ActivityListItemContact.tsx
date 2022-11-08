import React from 'react';
import {Platform} from 'react-native';
import {Image} from 'atoms/Image';
import {Box} from 'atoms/Box';
import {TextView} from 'atoms/TextView';
import theme from 'styles/theme';
import capitalizeName from 'utils/capitalization';
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {navigate} from 'services/NavigationService';
import {useRoute} from '@react-navigation/native';
import {isAndroid} from 'utils/device';
import {ITEM_ACTION_CONTEXT, ITEM_TRACKABLE_TYPE} from 'utils/constants';

export const ActivityListItemContact = ({image, desc1, item, title, date}) => {
  const {fullName} = useRoute<any>().params;
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
      <Box flexDirection={'row'} marginTop="xs" flexWrap="wrap" flex={1}>
        <TextView
          variant={Platform.OS === 'ios' ? 'normalText' : 'text_sm'}
          color={'greyText'}
          fontWeight={'400'}
          text={`${desc1} `}
        />
        {item.eventable && item.trackable ? (
          <GestureHandlerRootView>
            <TouchableOpacity
              onPress={() => {
                switch (item.trackable_type) {
                  case ITEM_TRACKABLE_TYPE.NOTE:
                    if (
                      item.action_context === ITEM_ACTION_CONTEXT.ADDED_NOTE
                    ) {
                      navigate('Contacts', {
                        screen: 'Notes',
                        params: {
                          contactId: item.eventable.id,
                          fullName: fullName,
                        },
                      });
                    }
                    break;
                  case ITEM_TRACKABLE_TYPE.TASK:
                    if (
                      item.action_context === ITEM_ACTION_CONTEXT.ADDED_TASK
                    ) {
                      navigate('Contacts', {
                        screen: 'ContactTasks',
                        params: {
                          contactId: item.eventable.id,
                          fullName: fullName,
                        },
                      });
                    }
                    break;
                  case ITEM_TRACKABLE_TYPE.PHONE_CALL:
                    if (
                      item.action_context ===
                      ITEM_ACTION_CONTEXT.ADDED_PHONE_CALL
                    ) {
                      navigate('Contacts', {
                        screen: 'PhoneCall',
                        params: {
                          contactId: item.eventable.id,
                          fullName: fullName,
                        },
                      });
                    }
                    break;
                  case ITEM_TRACKABLE_TYPE.GIFT:
                    if (
                      item.action_context === ITEM_ACTION_CONTEXT.ADDED_GIFT
                    ) {
                      navigate('Contacts', {
                        screen: 'Gifts',
                        params: {
                          contactId: item.eventable.id,
                          fullName: fullName,
                        },
                      });
                    }
                    break;
                  case ITEM_TRACKABLE_TYPE.DEBT:
                    if (
                      item.action_context === ITEM_ACTION_CONTEXT.ADDED_DEBT
                    ) {
                      navigate('Contacts', {
                        screen: 'Debts',
                        params: {
                          contactId: item.eventable.id,
                          fullName: fullName,
                        },
                      });
                    }
                    break;
                  case ITEM_TRACKABLE_TYPE.RELATIVE:
                    if (
                      item.action_context === ITEM_ACTION_CONTEXT.ADDED_RELATIVE
                    ) {
                      navigate('Contacts', {
                        screen: 'Relatives',
                        params: {
                          contactId: item.eventable.id,
                          fullName: fullName,
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
                {capitalizeName(title)}
              </TextView>
            </TouchableOpacity>
          </GestureHandlerRootView>
        ) : (
          item.action !== 'deleted' && (
            <TextView
              text="assignee.text.dlt"
              variant={Platform.OS === 'ios' ? 'normalText' : 'text_sm'}
              color="greyText"
              fontWeight="400"
            />
          )
        )}
      </Box>
      <Box
        flexDirection="row-reverse"
        justifyContent="flex-end"
        mt="xs"
        ml="xs">
        <TextView
          variant={Platform.OS === 'ios' ? 'normalText' : 'text_sm'}
          fontWeight="700"
          color="greyText">
          {date}
        </TextView>
      </Box>
    </Box>
  );
};
