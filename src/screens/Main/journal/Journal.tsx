import React, {useState, useEffect} from 'react';
import {Box} from 'atoms/Box';
import {Navbar} from 'molecules/Navbar';
import {FlatList, RefreshControl} from 'react-native';
import {Text} from 'atoms/Text/Text';
import {Touch} from 'atoms/Touch';
import {navigate} from 'services/NavigationService';
import {useJournal} from 'context/JournalAPI';
import {Spinner} from 'atoms/Spinner';
import {formatDate} from 'utils/DateFormatter/formatDate';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {TextView} from 'atoms/TextView';
import {JournalListItem} from 'molecules/JournalListItem';
import {capitalizeTitle} from 'utils/capitalization';
import {deviceHeight} from 'utils/device';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Row} from 'atoms/Row';

export const Journal = () => {
  const {
    actions: {getJournalList, clearJournalList},
    state: {journalList, journalListLoading, pageData},
  } = useJournal();

  useEffect(() => {
    getJournalList(1);

    return () => clearJournalList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getJournalList]);

  const [moreDataLoading, setMoreDataLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  let row: Array<any> = [];
  let prevOpenedRow: {close: () => void};

  const wait = (timeout: number | undefined) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const loadMoreData = () => {
    setMoreDataLoading(true);
    if (
      journalList?.length < pageData?.total_count &&
      pageData?.next_page !== null
    ) {
      getJournalList(pageData?.next_page);
    }
    wait(1500).then(() => setMoreDataLoading(false));
  };

  const onRefresh = () => {
    setRefreshing(true);
    if (
      journalList?.length < pageData?.total_count &&
      pageData?.next_page !== null
    ) {
      getJournalList(pageData?.next_page);
    }
    wait(1500).then(() => setRefreshing(false));
  };

  const renderItem = ({item, index}) => {
    const closeRow = (Index: string | number) => {
      if (prevOpenedRow && prevOpenedRow !== row[Index]) {
        prevOpenedRow.close();
      }
      prevOpenedRow = row[Index];
    };

    const rightActions = Item => {
      return (
        <Box
          flexDirection="row-reverse"
          alignSelf="center"
          alignItems="center"
          justifyContent="flex-start"
          height="100%"
          ml="s">
          <Touch onPress={() => navigate('EditJournal', {itemId: Item.id})}>
            <Box bg="editBtnBackground" pt="bm" pb="bm" pl="ml" pr="ml">
              <Text
                variant="normalText"
                color="whiteText"
                localeId="edit.text"
              />
            </Box>
          </Touch>
        </Box>
      );
    };

    return (
      <GestureHandlerRootView>
        <Swipeable
          renderRightActions={() => rightActions(item)}
          onSwipeableOpen={() => closeRow(index)}
          ref={ref => (row[index] = ref)}>
          <Touch
            onPress={() => {
              navigate('JournalDetails', {id: item.id});
            }}>
            <JournalListItem
              title={capitalizeTitle(item.title)}
              body={capitalizeTitle(item.body)}
              time={formatDate(item.created_at)}
            />
          </Touch>
        </Swipeable>
      </GestureHandlerRootView>
    );
  };

  return (
    <Box height="100%" pt={'m'} flex={1} backgroundColor="lightBackground">
      <Navbar
        renderLeft={
          <Row alignItems="baseline">
            <Text variant="text_2xl" color="black" localeId="journal.title" />
            <Text
              textAlign="center"
              variant="text_sm"
              color="black"
              localeId={` (${
                pageData?.total_count ? pageData?.total_count : 0
              })`}
            />
          </Row>
        }
        renderRight={
          <Touch
            onPress={() => {
              navigate('AddJournal');
            }}>
            <Text
              variant={'mediumText'}
              fontWeight={'500'}
              color="navbarBlue"
              localeId={'menu.add'}
            />
          </Touch>
        }
      />
      <Box flex={1} ml="m" mr="m" mt={deviceHeight < 780 ? 'xxs' : '-xs'}>
        {journalListLoading && !refreshing && !moreDataLoading ? (
          <Box flex={1} justifyContent="center">
            <Spinner color="primary" size="large" />
          </Box>
        ) : journalList.length === 0 ? (
          <Box flex={1} justifyContent="center">
            <TextView
              textAlign="center"
              variant="text_lg"
              color="black"
              fontWeight="700"
              text="no.record.found"
            />
          </Box>
        ) : (
          <FlatList
            data={journalList}
            showsVerticalScrollIndicator={false}
            renderItem={item => renderItem(item)}
            keyExtractor={(item, index) => 'new_' + index}
            onEndReachedThreshold={0.5}
            onEndReached={loadMoreData}
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
