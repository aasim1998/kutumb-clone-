import React, {useState, useCallback, useEffect} from 'react';
import {Box} from 'atoms/Box';
import {FlatList, RefreshControl} from 'react-native';
import {Text} from 'atoms/Text';
import {Touch} from 'atoms/Touch';
import {Navbar} from 'molecules/Navbar';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {TextView} from 'atoms/TextView';
import {DeleteModal} from 'molecules/DeleteModal';
import {Spinner} from 'atoms/Spinner';
import {formatDate} from 'utils/DateFormatter/formatDate';
import {DATE_FORMATS} from 'utils/DateFormatter/dateTime';
import {useRoute} from '@react-navigation/native';
import {deviceHeight} from 'utils/device';
import {GiftProps} from 'typings/gifts.type';
import {GiftListItem} from 'molecules/GiftListItem';
import {navigate} from 'services/NavigationService';
import useGifts from 'context/GiftsAPI';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

export const Gifts = () => {
  const {
    actions: {getGiftsList, deleteGifts, clearGiftsList},
    state: {giftsList, giftsListLoading, deleteGiftsLoading, pageData},
  } = useGifts();

  const {contactId, fullName} = useRoute<any>().params;

  useEffect(() => {
    getGiftsList(contactId);

    return () => clearGiftsList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contactId, getGiftsList]);

  const [moreDataLoading, setMoreDataLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalItem, setModalItem] = useState<GiftProps>();
  const [listItemHeight, setListItemHeight] = useState(0);

  let row: Array<any> = [];
  let prevOpenedRow: {close: () => void};

  const wait = (timeout: number | undefined) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const loadMoreData = () => {
    setMoreDataLoading(true);
    if (
      giftsList?.length < pageData?.total_count &&
      pageData?.next_page !== null
    ) {
      getGiftsList(contactId, pageData?.next_page);
    }
    wait(1500).then(() => setMoreDataLoading(false));
  };

  const onRefresh = () => {
    setRefreshing(true);
    if (
      giftsList?.length < pageData?.total_count &&
      pageData?.next_page !== null
    ) {
      getGiftsList(contactId, pageData?.next_page);
    }
    wait(1500).then(() => setRefreshing(false));
  };

  const handleGifts = (contactID: number) => {
    navigate('GiftsAdd', {contactId: contactID});
  };

  const openModal = (item: GiftProps) => {
    setIsModalVisible(true);
    setModalItem(item);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleDelete = (contactID: number) => {
    deleteGifts(modalItem, contactID);
    closeModal();
  };

  const onLayout = useCallback(
    e => {
      setListItemHeight(e.nativeEvent.layout.height);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [listItemHeight],
  );

  const renderItems = ({item, index}: {item: GiftProps; index: number}) => {
    const closeRow = (Index: number) => {
      if (prevOpenedRow && prevOpenedRow !== row[Index]) {
        prevOpenedRow.close();
      }
      prevOpenedRow = row[Index];
    };

    const rightActions = (Item: GiftProps) => {
      return (
        <Box
          onLayout={onLayout}
          flexDirection="row-reverse"
          alignItems={
            listItemHeight > deviceHeight / 3 ? 'flex-start' : 'center'
          }
          justifyContent="flex-start"
          height="100%">
          <Box
            flexDirection="row-reverse"
            mt={listItemHeight > deviceHeight / 3 ? 'bm' : 'none'}>
            <Touch onPress={() => openModal(Item)}>
              <Box bg="deleteBtnBackground" pt="bm" pb="bm" pl="sl" pr="sl">
                <TextView
                  variant="normalText"
                  color="whiteText"
                  text="delete.text"
                />
              </Box>
            </Touch>
            <Touch
              onPress={() =>
                navigate('GiftsEdit', {
                  listItemId: item.id,
                  contactId: contactId,
                  fullName: fullName,
                })
              }>
              <Box bg="editBtnBackground" pt="bm" pb="bm" pl="ml" pr="ml">
                <TextView
                  variant="normalText"
                  color="whiteText"
                  text="edit.text"
                />
              </Box>
            </Touch>
          </Box>
        </Box>
      );
    };

    return (
      <GestureHandlerRootView>
        <Swipeable
          renderRightActions={() => rightActions(item)}
          onSwipeableOpen={() => closeRow(index)}
          ref={ref => (row[index] = ref)}>
          <GiftListItem
            giftName={item.name}
            giftDate={`Added On: ${formatDate(item.date)}`}
            giftStatus={`Status: ${item.status}`}
            giftDescription={item.body}
          />
        </Swipeable>
      </GestureHandlerRootView>
    );
  };

  return (
    <Box height="100%" pt={'m'} flex={1} backgroundColor="lightBackground">
      <Navbar
        showBack
        title={`${fullName} Gifts`}
        counting={pageData?.total_count.toString()}
        renderRight={
          <Touch onPress={() => handleGifts(contactId)}>
            <Text
              variant={'mediumText'}
              fontWeight={'500'}
              color="navbarBlue"
              localeId={'menu.add'}
            />
          </Touch>
        }
      />
      <Box mt={deviceHeight < 780 ? 'mll' : 's'} mx="xl" flex={1}>
        {giftsListLoading && pageData === null ? (
          <Box justifyContent="center" flex={1}>
            <Spinner size={'large'} color={'primary'} />
          </Box>
        ) : giftsList.length !== 0 ? (
          <Box mt="ml" flex={1}>
            <FlatList
              data={giftsList}
              showsVerticalScrollIndicator={false}
              renderItem={v => renderItems(v)}
              keyExtractor={item => item.id.toString()}
              onEndReachedThreshold={0.5}
              onEndReached={loadMoreData}
              refreshing={refreshing}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            />
          </Box>
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
      <DeleteModal
        isModalVisible={isModalVisible}
        onCloseModal={closeModal}
        onDelete={() => handleDelete(contactId)}
        localeID="gifts.delete.desc.text"
        deleteLoading={deleteGiftsLoading}
      />
    </Box>
  );
};
