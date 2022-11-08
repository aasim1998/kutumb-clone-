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
import {DebtProps} from 'typings/debts.type';
import {DebtListItem} from 'molecules/DebtListItem';
import {navigate} from 'services/NavigationService';
import useDebts from 'context/DebtsAPI';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

export const Debts = () => {
  const {
    actions: {getDebtsList, deleteDebts, clearDebtsList},
    state: {debtsList, debtsListLoading, deleteDebtsLoading, pageData},
  } = useDebts();

  const {contactId, fullName} = useRoute<any>().params;

  useEffect(() => {
    getDebtsList(contactId);

    return () => clearDebtsList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contactId, getDebtsList]);

  const [moreDataLoading, setMoreDataLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalItem, setModalItem] = useState<DebtProps>();
  const [listItemHeight, setListItemHeight] = useState(0);

  let row: Array<any> = [];
  let prevOpenedRow: {close: () => void};

  const wait = (timeout: number | undefined) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const loadMoreData = () => {
    setMoreDataLoading(true);
    if (
      debtsList?.length < pageData?.total_count &&
      pageData?.next_page !== null
    ) {
      getDebtsList(contactId, pageData?.next_page);
    }
    wait(1500).then(() => setMoreDataLoading(false));
  };

  const onRefresh = () => {
    setRefreshing(true);
    if (
      debtsList?.length < pageData?.total_count &&
      pageData?.next_page !== null
    ) {
      getDebtsList(contactId, pageData?.next_page);
    }
    wait(1500).then(() => setRefreshing(false));
  };

  const handleDebts = (contactID: number) => {
    navigate('DebtsAdd', {contactId: contactID, fullName: fullName});
  };

  const openModal = (item: DebtProps) => {
    setIsModalVisible(true);
    setModalItem(item);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleDelete = (contactID: number) => {
    deleteDebts(modalItem, contactID);
    closeModal();
  };

  const onLayout = useCallback(
    e => {
      setListItemHeight(e.nativeEvent.layout.height);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [listItemHeight],
  );

  const renderItems = ({item, index}: {item: DebtProps; index: number}) => {
    const closeRow = (Index: number) => {
      if (prevOpenedRow && prevOpenedRow !== row[Index]) {
        prevOpenedRow.close();
      }
      prevOpenedRow = row[Index];
    };

    const rightActions = (Item: DebtProps) => {
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
                navigate('DebtsEdit', {
                  listItemId: Item.id,
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
          <DebtListItem
            debtTitle={item.title}
            debtDate={`Due Date: ${formatDate(item.due_date)}`}
            debtOwedBy={`Owed By: ${
              item.owed_by === 'contact' ? `${fullName}` : 'You'
            }`}
            debtAmount={`Amount: ${item.amount}`}
          />
        </Swipeable>
      </GestureHandlerRootView>
    );
  };

  return (
    <Box height="100%" pt={'m'} flex={1} backgroundColor="lightBackground">
      <Navbar
        showBack
        title={`${fullName} Debts`}
        counting={pageData?.total_count.toString()}
        renderRight={
          <Touch onPress={() => handleDebts(contactId)}>
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
        {debtsListLoading && pageData === null ? (
          <Box justifyContent="center" flex={1}>
            <Spinner size={'large'} color={'primary'} />
          </Box>
        ) : debtsList.length !== 0 ? (
          <Box mt="ml" flex={1}>
            <FlatList
              data={debtsList}
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
        localeID="debts.delete.desc.text"
        deleteLoading={deleteDebtsLoading}
      />
    </Box>
  );
};
