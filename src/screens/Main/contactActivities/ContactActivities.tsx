import React, {useState, useCallback, useEffect} from 'react';
import {Box} from 'atoms/Box';
import {FlatList, RefreshControl} from 'react-native';
import {Text} from 'atoms/Text';
import {Touch} from 'atoms/Touch';
import {Navbar} from 'molecules/Navbar';
import {navigate} from 'services/NavigationService';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {TextView} from 'atoms/TextView';
import {DeleteModal} from 'molecules/DeleteModal';
import {ContactActivityProps} from 'typings/ContactActivity.type';
import {Spinner} from 'atoms/Spinner';
import {formatDate} from 'utils/DateFormatter/formatDate';
import {useRoute} from '@react-navigation/native';
import {deviceHeight} from 'utils/device';
import {CommonListItem} from 'molecules/CommonListItem';
import useContactActivity from 'context/ContactActivitiesAPI';
import {en} from 'locales/en';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {ListEmptyComponent} from 'molecules/ListEmptyComponent';

export const ContactActivities = () => {
  const {
    actions: {
      getContactActivityList,
      deleteContactActivity,
      clearContactActivityList,
      updateContactActivityList,
    },
    state: {
      contactActivityList,
      contactActivityListLoading,
      deleteContactActivityLoading,
      refreshListLoading,
      pageData,
    },
  } = useContactActivity();

  const {contactId, fullName} = useRoute<any>().params;

  useEffect(() => {
    getContactActivityList(contactId);

    return () => clearContactActivityList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contactId, getContactActivityList]);

  const [moreDataLoading, setMoreDataLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalItem, setModalItem] = useState<ContactActivityProps>();
  const [listItemHeight, setListItemHeight] = useState(0);

  let row: Array<any> = [];
  let prevOpenedRow: {close: () => void};

  const wait = (timeout: number | undefined) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const loadMoreData = () => {
    setMoreDataLoading(true);
    if (
      contactActivityList?.length < pageData?.total_count &&
      pageData?.next_page !== null
    ) {
      getContactActivityList(contactId, pageData?.next_page);
    }
    wait(1500).then(() => setMoreDataLoading(false));
  };

  const onRefresh = () => {
    updateContactActivityList(contactId);
  };
  const openModal = (item: ContactActivityProps) => {
    setIsModalVisible(true);
    setModalItem(item);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleDelete = (contactID: number) => {
    deleteContactActivity(modalItem, contactID);
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
    item: ContactActivityProps;
    index: number;
  }) => {
    const closeRow = (currentItem: boolean = false) => {
      if (prevOpenedRow && prevOpenedRow !== row[index]) {
        prevOpenedRow.close();
      }
      if (currentItem) {
        row[index].close();
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
                navigate('ContactActivitiesEdit', {
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
            title={item?.title}
            time={`${formatDate(item.updated_at)}`}
            body={item.body}
            subtitle={item.activity.name}
          />
        </Swipeable>
      </GestureHandlerRootView>
    );
  };

  return (
    <Box height="100%" pt={'m'} flex={1} backgroundColor="lightBackground">
      <Navbar
        showBack
        title={`${fullName} ${en['account.activities.title']}`}
        counting={pageData?.total_count.toString()}
        renderRight={
          <Touch
            onPress={() => {
              navigate('ContactActivitiesAdd', {
                contactId: contactId,
                fullName: fullName,
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
        {contactActivityListLoading && pageData === null ? (
          <Box justifyContent="center" flex={1}>
            <Spinner size={'large'} color={'primary'} />
          </Box>
        ) : (
          <Box mt="ml" flex={1}>
            <FlatList
              ListEmptyComponent={<ListEmptyComponent />}
              data={contactActivityList}
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
        )}
      </Box>
      <DeleteModal
        isModalVisible={isModalVisible}
        onCloseModal={closeModal}
        onDelete={() => handleDelete(contactId)}
        localeID="contactActivity.delete.desc.text"
        deleteLoading={deleteContactActivityLoading}
      />
    </Box>
  );
};
