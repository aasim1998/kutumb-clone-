import React, {useState, useEffect} from 'react';
import {Box} from 'atoms/Box';
import {FlatList, RefreshControl} from 'react-native';
import {Touch} from 'atoms/Touch';
import {navigate} from 'services/NavigationService';
import {Text} from 'atoms/Text';
import {Navbar} from 'molecules/Navbar';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {TextView} from 'atoms/TextView';
import {Spinner} from 'atoms/Spinner';
import {deviceHeight} from 'utils/device';
import useSetting from 'context/SettingsAPI';
import {ContactFieldTypesListItem} from 'molecules/ContactFieldTypesListItem';
import {DeleteModal} from 'molecules/DeleteModal';
import {ContactFieldTypesProps} from 'typings/contactFieldTypes.type';
import {ListEmptyComponent} from 'molecules/ListEmptyComponent';

export const ContactFieldTypes = () => {
  const {
    actions: {getContactFieldTypesList, deleteContactFieldType},
    state: {
      contactFieldTypesList,
      contactFieldTypesListLoading,
      deleteContactFieldTypeLoading,
    },
  } = useSetting();

  useEffect(() => {
    getContactFieldTypesList();
  }, [getContactFieldTypesList]);

  const [data, setData] = useState<any>({});
  const [refreshing, setRefreshing] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalData, setModalData] = useState<ContactFieldTypesProps>();

  let row: Array<any> = [];
  let prevOpenedRow: {close: () => void};

  useEffect(() => {
    if (contactFieldTypesList.length !== 0) {
      setData(contactFieldTypesList);
    }
  }, [contactFieldTypesList]);

  const handleFields = () => {
    navigate('ContactFieldTypeAdd');
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await getContactFieldTypesList();
    setRefreshing(false);
  };

  const openModal = (item: ContactFieldTypesProps) => {
    setIsModalVisible(true);
    setModalData(item);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleDelete = () => {
    deleteContactFieldType(modalData);
    closeModal();
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
            <Box bg="deleteBtnBackground" pt="sx" pb="sx" pl="s" pr="s">
              <TextView
                variant="normalText"
                color="whiteText"
                text="delete.text"
              />
            </Box>
          </Touch>
          <Touch
            onPress={() =>
              navigate('ContactFieldTypeEdit', {
                contactFieldTypeItemId: item.id,
              })
            }>
            <Box bg="editBtnBackground" pt="sx" pb="sx" pl="m" pr="m">
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
          <ContactFieldTypesListItem
            name={item.name}
            protocol={item.protocol}
            icon={item.icon}
          />
        </Swipeable>
      </GestureHandlerRootView>
    );
  };

  return (
    <Box height="100%" bg="mainBackground" pt={'m'} flex={1}>
      <Navbar
        showBack
        title="contact.field.types.title"
        renderRight={
          <Touch onPress={() => handleFields()}>
            <Text
              variant={'mediumText'}
              fontWeight={'500'}
              color="navbarBlue"
              localeId={'menu.add'}
            />
          </Touch>
        }
      />
      <Box mx="xl" flex={1} mt={deviceHeight < 780 ? 'mll' : 's'}>
        {contactFieldTypesListLoading && !refreshing ? (
          <Box flex={1} justifyContent="center">
            <Spinner color="primary" size="large" />
          </Box>
        ) : (
          <Box mt="ml" flex={1}>
            <FlatList
              ListEmptyComponent={<ListEmptyComponent />}
              data={data}
              showsVerticalScrollIndicator={false}
              renderItem={v => renderItems(v)}
              keyExtractor={item => item.id.toString()}
              refreshing={refreshing}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            />
          </Box>
        )}
      </Box>
      <DeleteModal
        isModalVisible={isModalVisible}
        onCloseModal={closeModal}
        onDelete={handleDelete}
        localeID="contact.field.type.delete.desc.text"
        deleteLoading={deleteContactFieldTypeLoading}
      />
    </Box>
  );
};
