import React, {useEffect, useState} from 'react';
import {Box} from 'atoms/Box';
import {SelectableCard} from 'atoms/SelectableCard';
import {FlatList, RefreshControl} from 'react-native';
import useContact from 'context/ContactAPI';
import {formatDate} from 'utils/DateFormatter/formatDate';
import theme from 'styles/theme';
import {Spinner} from 'atoms/Spinner';
import {Navbar} from 'molecules/Navbar';
import {useRoute} from '@react-navigation/native';
import {ActivityListItemContact} from 'molecules/ActivityListItemContact';
import {deviceHeight} from 'utils/device';
import {ContactTimelineProps} from 'typings/contactTimeline.type';

export const ContactTimeline = () => {
  const {
    actions: {getContactTimeline, clearContactTimeline},
    state: {
      contactTimelineList,
      contactTimelineLoading,
      contactTimelinePageData,
    },
  } = useContact();

  const {contactId, fullName} = useRoute<any>().params;

  const [moreDataLoading, setMoreDataLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getContactTimeline(contactId);

    return () => clearContactTimeline();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contactId, getContactTimeline]);

  const wait = (timeout: number | undefined) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const loadMoreData = () => {
    setMoreDataLoading(true);
    if (
      contactTimelineList?.length < contactTimelinePageData?.total_count &&
      contactTimelinePageData?.next_page !== null
    ) {
      getContactTimeline(contactId, contactTimelinePageData?.next_page);
      setMoreDataLoading(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    if (
      contactTimelineList?.length < contactTimelinePageData?.total_count &&
      contactTimelinePageData?.next_page !== null
    ) {
      getContactTimeline(contactId, contactTimelinePageData?.next_page);
    }
    wait(1500).then(() => setRefreshing(false));
  };

  const renderItem = (item: ContactTimelineProps) => {
    return (
      <SelectableCard
        minHeight={theme.spacing.xxll}
        borderRadius={theme.spacing.none}
        mb="none"
        bg="mainBackground"
        flexDirection="row"
        alignItems="flex-start"
        justifyContent="space-between"
        p="xxs"
        pb="none">
        <ActivityListItemContact
          image={require('../../../assets/images/user.jpg')}
          desc1={item.action_context}
          item={item}
          title={
            item.trackable
              ? item.trackable_type !== 'Contact'
                ? item.trackable_type !== 'PhoneCall'
                  ? item.trackable_type !== 'Gift'
                    ? item.trackable_type !== 'Relative'
                      ? item.trackable.title
                      : item.trackable?.contact?.first_name +
                        ' ' +
                        item.trackable?.contact?.last_name
                    : item.trackable.name
                  : 'Phone Call'
                : ''
              : ''
          }
          date={formatDate(item.created_at)}
        />
      </SelectableCard>
    );
  };

  return (
    <Box height="100%" pt="m" bg="mainBackground" flex={1}>
      <Navbar showBack title={`${fullName} Timeline`} />
      <Box
        flex={1}
        mt={deviceHeight < 780 ? 'xxxl' : 'xxl'}
        ml="l"
        mr="l"
        bg="mainBackground">
        {contactTimelineLoading && contactTimelinePageData === null ? (
          <Box flex={1} justifyContent="center">
            <Spinner color="primary" size="large" />
          </Box>
        ) : (
          <FlatList
            data={contactTimelineList}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => renderItem(item)}
            onEndReached={loadMoreData}
            onEndReachedThreshold={0.5}
            refreshing={refreshing}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        )}
      </Box>
    </Box>
  );
};
