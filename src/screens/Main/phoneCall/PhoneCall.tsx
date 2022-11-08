import React, {useState, useCallback, useEffect} from 'react';
import {Box} from 'atoms/Box';
import {TextView} from 'atoms/TextView';
import {Touch} from 'atoms/Touch';
import {FlatList, RefreshControl} from 'react-native';
import {navigate} from 'services/NavigationService';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {DeleteModal} from 'molecules/DeleteModal';
import {Text} from 'atoms/Text';
import {Navbar} from 'molecules/Navbar';
import {Spinner} from 'atoms/Spinner';
import {formatDate} from 'utils/DateFormatter/formatDate';
import {useRoute} from '@react-navigation/native';
import {deviceHeight} from 'utils/device';
import {PhoneCallProps} from 'typings/phoneCall.type';
import usePhoneCall from 'context/PhoneCallAPI';
import {StatusListItem} from 'molecules/StatusListItem';
import useSetting from 'context/SettingsAPI';
import capitalizeName from 'utils/capitalization';
import {en} from 'locales/en';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {ListEmptyComponent} from 'molecules/ListEmptyComponent';
import {style} from 'styles/style';

export const PhoneCall = () => {
  const {contactId, fullName} = useRoute<any>().params;

  const {
    actions: {
      getPhoneCallList,
      deletePhoneCall,
      clearPhoneCallList,
      updatePhoneCallList,
    },
    state: {
      phoneCallList,
      pageData,
      phoneCallListLoading,
      deletePhoneCallLoading,
      refreshListLoading,
    },
  } = usePhoneCall();

  const {
    actions: {getPersonalDetailItem},
    state: {personalDetailItem},
  } = useSetting();

  const [moreDataLoading, setMoreDataLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalItem, setModalItem] = useState<PhoneCallProps>();
  const [listItemHeight, setListItemHeight] = useState(0);

  useEffect(() => {
    getPersonalDetailItem();
    getPhoneCallList(contactId);

    return () => clearPhoneCallList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const wait = (timeout: number | undefined) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const {first_name, last_name} = personalDetailItem;
  const userName = capitalizeName(`${first_name} ${last_name}`);

  const loadMoreData = () => {
    setMoreDataLoading(true);
    if (
      phoneCallList?.length < pageData?.total_count &&
      pageData?.next_page !== null
    ) {
      getPhoneCallList(contactId, pageData?.next_page);
    }
    wait(1500).then(() => setMoreDataLoading(false));
  };

  const onRefresh = () => {
    updatePhoneCallList(contactId);
  };

  let row: Array<any> = [];
  let prevOpenedRow: {close: () => void};

  const handlePhoneCall = (contactID: number) => {
    navigate('PhoneCallAdd', {
      contactId: contactID,
      fullName: fullName,
    });
  };

  const openModal = (item: PhoneCallProps) => {
    setIsModalVisible(true);
    setModalItem(item);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleDelete = (contactID: number) => {
    deletePhoneCall(modalItem, contactID);
    closeModal();
  };

  const onLayout = useCallback(
    e => {
      setListItemHeight(e.nativeEvent.layout.height);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [listItemHeight],
  );

  const renderItems = ({item, index}) => {
    const closeRow = (Index: number) => {
      if (prevOpenedRow && prevOpenedRow !== row[Index]) {
        prevOpenedRow.close();
      }
      prevOpenedRow = row[Index];
    };

    const rightActions = (Item: PhoneCallProps) => {
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
                navigate('PhoneCallEdit', {
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
          <StatusListItem
            body={item.body}
            time={`${en['last.call.date']} ${formatDate(item.date)}`}
            status={item.status}
            userName={userName}
          />
        </Swipeable>
      </GestureHandlerRootView>
    );
  };

  return (
    <Box height="100%" pt={'m'} flex={1} backgroundColor="lightBackground">
      <Navbar
        showBack
        title={`${fullName} ${en['phone.calls.title']}`}
        counting={pageData?.total_count.toString()}
        renderRight={
          <Touch onPress={() => handlePhoneCall(contactId)}>
            <Text
              variant={'mediumText'}
              fontWeight={'500'}
              color="navbarBlue"
              localeId={'menu.add'}
            />
          </Touch>
        }
      />
      <Box mx="xl" mt={deviceHeight < 780 ? 'mll' : 's'} flex={1}>
        {phoneCallListLoading && pageData === null && !refreshListLoading ? (
          <Box style={style.loaderStyles}>
            <Spinner size={'large'} color={'primary'} />
          </Box>
        ) : (
          <Box mt="ml" flex={1}>
            <FlatList
              ListEmptyComponent={<ListEmptyComponent />}
              data={phoneCallList}
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
        localeID="phoneCalls.delete.desc.text"
        deleteLoading={deletePhoneCallLoading}
      />
    </Box>
  );
};
