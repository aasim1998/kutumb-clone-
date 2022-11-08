import React, {useState, useEffect} from 'react';
import {Box} from 'atoms/Box';
import {FlatList, RefreshControl} from 'react-native';
import {SearchTextInput} from 'molecules/SearchTextInput';
import {ContactListItem} from 'molecules/ContactListItem';
import {Touch} from 'atoms/Touch';
import {navigate} from 'services/NavigationService';
import {Text} from 'atoms/Text';
import {Navbar} from 'molecules/Navbar';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {TextView} from 'atoms/TextView';
import {ArchiveModal} from 'molecules/ArchiveModal';
import {useContact} from 'context/ContactAPI';
import {Spinner} from 'atoms/Spinner';
import {Row} from 'atoms/Row';
import {deviceHeight, isIOS} from 'utils/device';

export const Contact = () => {
  const {
    actions: {getContactsList, archiveContact, clearContactsList},
    state: {contactList, contactsListLoading, contactPageData},
  } = useContact();

  useEffect(() => {
    getContactsList(1);

    return () => clearContactsList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getContactsList]);

  const [moreDataLoading, setMoreDataLoading] = useState(false);
  const [data, setData] = useState(contactList);
  const [searchValue, setSearchValue] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalData, setModalData] = useState();
  let row: Array<any> = [];
  let prevOpenedRow: {close: () => void};

  useEffect(() => {
    if (contactList.length !== 0) {
      setData(contactList);
    }
  }, [contactList]);

  const wait = (timeout: number | undefined) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const loadMoreData = () => {
    setMoreDataLoading(true);
    if (
      contactList?.length < contactPageData?.total_count &&
      contactPageData?.next_page !== null
    ) {
      getContactsList(contactPageData?.next_page);
    }
    wait(1500).then(() => setMoreDataLoading(false));
  };

  const onRefresh = () => {
    setRefreshing(true);
    if (
      contactList?.length < contactPageData?.total_count &&
      contactPageData?.next_page !== null
    ) {
      getContactsList(contactPageData?.next_page);
    }
    wait(1500).then(() => setRefreshing(false));
  };

  const openModal = item => {
    setIsModalVisible(true);
    setModalData(item);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleArchive = () => {
    setIsModalVisible(false);
    archiveContact(modalData);
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
          <Touch onPress={() => openModal(item)}>
            <Box bg="deleteBtnBackground" pt="bm" pb="bm" pl="sl" pr="sl">
              <TextView
                variant="normalText"
                color="whiteText"
                text="archive.text"
              />
            </Box>
          </Touch>
          <Touch
            onPress={() => navigate('EditContact', {contactItemId: item.id})}>
            <Box bg="editBtnBackground" pt="bm" pb="bm" pl="ml" pr="ml">
              <TextView
                variant="normalText"
                color="whiteText"
                text="edit.text"
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
          overshootRight={false}
          onSwipeableOpen={() => closeRow(index)}
          ref={ref => (row[index] = ref)}>
          <Touch
            onPress={() => {
              navigate('ContactDetails', {contactItemId: item.id});
            }}>
            <ContactListItem
              firstName={item.first_name}
              lastName={item.last_name}
              image={require('../../../assets/images/user.jpg')}
              phone={item.phone}
            />
          </Touch>
        </Swipeable>
      </GestureHandlerRootView>
    );
  };

  const searchFunction = (text: string) => {
    const updatedData = contactList.filter(item => {
      const item_data = `${item.first_name.toUpperCase()} ${item.last_name.toUpperCase()})`;
      const text_data = text.toUpperCase();
      return item_data.indexOf(text_data) > -1;
    });
    setData(updatedData);
    setSearchValue(text);
  };

  return (
    <Box height="100%" bg="mainBackground" pt={'m'} flex={1}>
      <Navbar
        renderLeft={
          <Row alignItems="baseline">
            <Text variant="text_2xl" color="black" localeId={'contact.title'} />
            <Text
              textAlign="center"
              variant="text_sm"
              color="black"
              localeId={` (${
                contactPageData?.total_count ? contactPageData?.total_count : 0
              })`}
            />
          </Row>
        }
        renderRight={
          <Touch
            onPress={() => {
              navigate('AddContact');
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
      <Box
        marginHorizontal="xl"
        flex={1}
        mt={isIOS ? (deviceHeight < 780 ? 's' : '-s') : '-m'}>
        <SearchTextInput
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            overflow: 'visible',
            shadowColor: '#000000',
            shadowOpacity: 0.07,
            shadowRadius: 2.5,
            shadowOffset: {width: 0, height: 1.5},
            elevation: 3,
          }}
          value={searchValue}
          autoCorrect={false}
          onRightIconPress={() => {
            setSearchValue('');
            setData(contactList);
          }}
          onChangeText={(text: string) => searchFunction(text)}
        />
        {contactsListLoading && contactPageData === null ? (
          <Box flex={1} justifyContent="center">
            <Spinner color="primary" size="large" />
          </Box>
        ) : data.length !== 0 ? (
          <Box mt="-s" flex={1}>
            <FlatList
              data={data}
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
      <ArchiveModal
        isModalVisible={isModalVisible}
        onCloseModal={closeModal}
        onArchive={handleArchive}
        localeID="contact.archive.desc.text"
      />
    </Box>
  );
};
