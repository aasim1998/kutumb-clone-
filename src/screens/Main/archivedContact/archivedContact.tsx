import React, {useState, useEffect} from 'react';
import {Box} from 'atoms/Box';
import {FlatList, RefreshControl} from 'react-native';
import {Touch} from 'atoms/Touch';
import {Navbar} from 'molecules/Navbar';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {TextView} from 'atoms/TextView';
import {useContact} from 'context/ContactAPI';
import {Spinner} from 'atoms/Spinner';
import {ArchivedContactListItem} from 'molecules/ArchivedContactListItem';
import {formatDate} from 'utils/DateFormatter/formatDate';
import {DATE_TIME_FORMAT} from 'utils/DateFormatter/dateTime';
import {
  ArchivedContactProps,
  RestoreContactProps,
} from 'typings/archivedContact.type';
import {DeleteModal} from 'molecules/DeleteModal';
import {RestoreModal} from 'molecules/RestoreModal';
import {deviceHeight, isIOS} from 'utils/device';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

export const ArchivedContact = () => {
  const {
    actions: {
      getArchivedContactsList,
      deleteContact,
      restoreContact,
      clearArchivedContactsList,
    },
    state: {
      archivedContactList,
      archivedContactsListLoading,
      deleteContactLoading,
      restoreContactLoading,
      archivedPageData,
    },
  } = useContact();

  useEffect(() => {
    getArchivedContactsList();

    return () => clearArchivedContactsList();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getArchivedContactsList]);

  const [moreDataLoading, setMoreDataLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isRestoreModalVisible, setIsRestoreModalVisible] = useState(false);
  const [deleteModalData, setDeleteModalData] =
    useState<ArchivedContactProps>();
  const [restoreModalData, setRestoreModalData] =
    useState<RestoreContactProps>();

  let row: Array<any> = [];
  let prevOpenedRow: {close: () => void};

  const wait = (timeout: number | undefined) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const loadMoreData = () => {
    setMoreDataLoading(true);
    if (
      archivedContactList?.length < archivedPageData?.total_count &&
      archivedPageData?.next_page !== null
    ) {
      getArchivedContactsList(archivedPageData?.next_page);
    }
    wait(1500).then(() => setMoreDataLoading(false));
  };

  const onRefresh = () => {
    setRefreshing(true);
    if (
      archivedContactList?.length < archivedPageData?.total_count &&
      archivedPageData?.next_page !== null
    ) {
      getArchivedContactsList(archivedPageData?.next_page);
    }
    wait(1500).then(() => setRefreshing(false));
  };

  const openDeleteModal = (item: ArchivedContactProps) => {
    setIsDeleteModalVisible(true);
    setDeleteModalData(item);
  };

  const openRestoreModal = (item: RestoreContactProps) => {
    setIsRestoreModalVisible(true);
    setRestoreModalData(item);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalVisible(false);
  };

  const closeRestoreModal = () => {
    setIsRestoreModalVisible(false);
  };

  const handleDelete = (contactId: number | any) => {
    deleteContact(contactId);
    closeDeleteModal();
  };

  const handleRestore = (contactId: number | any) => {
    restoreContact(contactId);
    closeRestoreModal();
  };

  const renderItems = ({item, index}) => {
    const closeRow = (Index: string | number) => {
      if (prevOpenedRow && prevOpenedRow !== row[Index]) {
        prevOpenedRow.close();
      }
      prevOpenedRow = row[Index];
    };

    const renderRightActions = () => {
      return (
        <Box
          flexDirection="row-reverse"
          alignSelf="center"
          alignItems="center"
          justifyContent="flex-start"
          height="100%">
          <Touch onPress={() => openDeleteModal(item)}>
            <Box bg="deleteBtnBackground" pt="bm" pb="bm" pl="sl" pr="sl">
              <TextView
                variant="normalText"
                color="whiteText"
                text="delete.text"
              />
            </Box>
          </Touch>
          <Touch onPress={() => openRestoreModal(item)}>
            <Box bg="editBtnBackground" pt="bm" pb="bm" pl="sl" pr="sl">
              <TextView
                variant="normalText"
                color="whiteText"
                text="restore.text"
              />
            </Box>
          </Touch>
        </Box>
      );
    };

    return (
      <GestureHandlerRootView>
        <Swipeable
          renderRightActions={() => renderRightActions()}
          onSwipeableOpen={() => closeRow(index)}
          ref={ref => (row[index] = ref)}>
          <ArchivedContactListItem
            firstName={item.first_name}
            lastName={item.last_name}
            date={`Archived on ${formatDate(
              item.archived_on,
              DATE_TIME_FORMAT,
            )}`}
          />
        </Swipeable>
      </GestureHandlerRootView>
    );
  };

  return (
    <Box height="100%" bg="mainBackground" pt={'m'} flex={1}>
      <Box>
        <Navbar
          showBack
          title="archived.contact.title"
          counting={archivedPageData?.total_count.toString()}
        />
        <TextView
          mt="xxl"
          ml="xl"
          variant="normalText"
          color="black"
          text="archived.contact.sub.title"
        />
      </Box>
      <Box
        marginHorizontal="xl"
        flex={1}
        mt={isIOS ? (deviceHeight < 780 ? 's' : '-s') : 'xss'}>
        {archivedContactsListLoading && !refreshing && !moreDataLoading ? (
          <Box flex={1} justifyContent="center">
            <Spinner color="primary" size="large" />
          </Box>
        ) : archivedContactList.length !== 0 ? (
          <FlatList
            data={archivedContactList}
            showsVerticalScrollIndicator={false}
            renderItem={v => renderItems(v)}
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
      <DeleteModal
        isModalVisible={isDeleteModalVisible}
        onCloseModal={closeDeleteModal}
        onDelete={() => handleDelete(deleteModalData?.id)}
        localeID="contact.delete.desc.text"
        deleteLoading={deleteContactLoading}
      />
      <RestoreModal
        isModalVisible={isRestoreModalVisible}
        onCloseModal={closeRestoreModal}
        onRestore={() => handleRestore(restoreModalData?.id)}
        localeID="contact.restore.desc.text"
        restoreLoading={restoreContactLoading}
      />
    </Box>
  );
};
