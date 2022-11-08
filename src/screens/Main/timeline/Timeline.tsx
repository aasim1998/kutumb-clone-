import React, {useState, useEffect} from 'react';
import {Box} from 'atoms/Box';
import {SelectableCard} from 'atoms/SelectableCard';
import {ActivityListItem} from 'molecules/ActivityListItem';
import {FlatList, RefreshControl} from 'react-native';
import theme from 'styles/theme';
import {useHome} from 'context/HomeAPI';
import {Spinner} from 'atoms/Spinner';
import {TextView} from 'atoms/TextView';
import {HomeTimelineProps} from 'typings/homeTimeline.type';
import {formatDate} from 'utils/DateFormatter/formatDate';

export const Timeline = () => {
  const {
    actions: {getTimelineList, clearTimelineList},
    state: {timelineList, timelineListLoading, timelinePageData},
  } = useHome();

  const [moreDataLoading, setMoreDataLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getTimelineList();

    return () => clearTimelineList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getTimelineList]);

  const wait = (timeout: number | undefined) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const loadMoreData = () => {
    setMoreDataLoading(true);
    if (
      timelineList?.length < timelinePageData?.total_count &&
      timelinePageData?.next_page !== null
    ) {
      getTimelineList(timelinePageData?.next_page);
    }
    wait(1500).then(() => setMoreDataLoading(false));
  };

  const onRefresh = () => {
    setRefreshing(true);
    if (
      timelineList?.length < timelinePageData?.total_count &&
      timelinePageData?.next_page !== null
    ) {
      getTimelineList(timelinePageData?.next_page);
    }
    wait(1500).then(() => setRefreshing(false));
  };

  const renderItem = (item: HomeTimelineProps) => {
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
        <ActivityListItem
          image={require('../../../assets/images/user.jpg')}
          assignee={null}
          desc1={item.action_for_context}
          assignTo={
            item.trackable
              ? item.eventable
                ? item.eventable?.first_name + ' ' + item.eventable?.last_name
                : item.trackable.title
              : item.action === 'deleted'
              ? item.eventable
                ? item.eventable?.first_name + ' ' + item.eventable?.last_name
                : null
              : null
          }
          date={formatDate(item.created_at)}
          item={item}
        />
      </SelectableCard>
    );
  };

  return (
    <Box pt="m" bg="mainBackground" flex={1} mb="none" pb="XL">
      {timelineListLoading && timelinePageData === null ? (
        <Box flex={1} justifyContent="center">
          <Spinner color="primary" size="large" />
        </Box>
      ) : timelineList.length !== 0 ? (
        <FlatList
          data={timelineList}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => renderItem(item)}
          onEndReachedThreshold={0.5}
          onEndReached={loadMoreData}
          refreshing={refreshing}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      ) : (
        <Box flex={1} justifyContent="center">
          <TextView
            textAlign="center"
            variant="text_lg"
            color="black"
            fontWeight="700"
            text="no.record.found"
          />
        </Box>
      )}
    </Box>
  );
};
