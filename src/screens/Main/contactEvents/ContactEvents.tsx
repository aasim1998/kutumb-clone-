import React, {useState, useCallback, useEffect} from 'react';
import {Box} from 'atoms/Box';
import {FlatList, RefreshControl} from 'react-native';
import {Text} from 'atoms/Text';
import {Touch} from 'atoms/Touch';
import {Navbar} from 'molecules/Navbar';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {TextView} from 'atoms/TextView';
import {Spinner} from 'atoms/Spinner';
import {useRoute} from '@react-navigation/native';
import {deviceHeight} from 'utils/device';
import {CommonListItem} from 'molecules/CommonListItem';
import {en} from 'locales/en';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import useEvents from 'context/EventsAPI';
import {ContactEventProps} from 'typings/events.type';
import {formatDate} from 'utils/DateFormatter/formatDate';
import {navigate} from 'services/NavigationService';
import {DeleteModal} from 'molecules/DeleteModal';

export const ContactEvents = () => {
  const {
    actions: {
      getEventsList,
      deleteEvents,
      clearEventsList,
      updateContactEventList,
    },
    state: {
      eventsList,
      eventsListLoading,
      deleteEventsLoading,
      pageData,
      refreshListLoading,
    },
  } = useEvents();

  const {contactId, fullName} = useRoute<any>().params;

  useEffect(() => {
    getEventsList(contactId);
    return () => clearEventsList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contactId, getEventsList]);

  const [moreDataLoading, setMoreDataLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalItem, setModalItem] = useState<ContactEventProps>();
  const [listItemHeight, setListItemHeight] = useState(0);

  let row: Array<any> = [];
  let prevOpenedRow: {close: () => void};

  const wait = (timeout: number | undefined) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const loadMoreData = () => {
    setMoreDataLoading(true);
    if (
      eventsList?.length < pageData?.total_count &&
      pageData?.next_page !== null
    ) {
      getEventsList(contactId, pageData?.next_page);
    }
    wait(1500).then(() => setMoreDataLoading(false));
  };

  const onRefresh = () => {
    updateContactEventList(contactId);
  };

  const openModal = (item: ContactEventProps) => {
    setIsModalVisible(true);
    setModalItem(item);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleDelete = (contactID: number) => {
    deleteEvents(modalItem, contactID);
    closeModal();
  };

  const onLayout = useCallback(
    e => {
      setListItemHeight(e.nativeEvent.layout.height);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [listItemHeight],
  );

  const renderItems = ({
    item,
    index,
  }: {
    item: ContactEventProps;
    index: number;
  }) => {
    const closeRow = () => {
      if (prevOpenedRow && prevOpenedRow !== row[index]) {
        prevOpenedRow.close();
      }
      prevOpenedRow = row[index];
    };

    const rightActions = () => {
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
            <Touch onPress={() => openModal(item)}>
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
                navigate('EventEdit', {
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
          renderRightActions={() => rightActions()}
          onSwipeableOpen={() => closeRow()}
          ref={ref => (row[index] = ref)}>
          <CommonListItem
            title={item.title}
            subtitle={item.life_event.name}
            body={item.body}
            time={formatDate(item.created_at)}
          />
        </Swipeable>
      </GestureHandlerRootView>
    );
  };

  return (
    <Box height="100%" pt={'m'} flex={1} backgroundColor="lightBackground">
      <Navbar
        showBack
        title={`${fullName} ${en['events.title']}`}
        counting={pageData?.total_count.toString()}
        renderRight={
          <Touch
            onPress={() => {
              navigate('EventAdd', {
                contactId: contactId,
              });
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
      <Box mt={deviceHeight < 780 ? 'mll' : 's'} mx="xl" flex={1}>
        {eventsListLoading && pageData === null && !refreshListLoading ? (
          <Box justifyContent="center" flex={1}>
            <Spinner size={'large'} color={'primary'} />
          </Box>
        ) : eventsList.length !== 0 ? (
          <Box mt="ml" flex={1}>
            <FlatList
              data={eventsList}
              showsVerticalScrollIndicator={false}
              renderItem={v => renderItems(v)}
              keyExtractor={item => item.id.toString()}
              onEndReachedThreshold={0.5}
              onEndReached={loadMoreData}
              refreshing={refreshListLoading}
              refreshControl={
                <RefreshControl
                  refreshing={refreshListLoading}
                  onRefresh={onRefresh}
                />
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
        localeID="events.delete.desc.text"
        deleteLoading={deleteEventsLoading}
      />
    </Box>
  );
};
