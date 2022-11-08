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
import {useRoute} from '@react-navigation/native';
import {deviceHeight} from 'utils/device';
import {RelativesProps} from 'typings/relatives.type';
import {RelativesListItem} from 'molecules/RelativesListItem';
import {navigate} from 'services/NavigationService';
import useRelatives from 'context/RelativesAPI';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

export const Relatives = () => {
  const {
    actions: {getRelativesList, deleteRelatives},
    state: {
      relativesList,
      relativesListLoading,
      deleteRelativesLoading,
      pageData,
    },
  } = useRelatives();

  const {contactId, fullName} = useRoute<any>().params;

  useEffect(() => {
    getRelativesList(contactId);
  }, [getRelativesList, contactId]);

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalItem, setModalItem] = useState<RelativesProps>();

  let row: Array<any> = [];
  let prevOpenedRow: {close: () => void};

  const wait = (timeout: number | undefined) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getRelativesList(contactId);
    wait(2000).then(() => setRefreshing(false));
  }, [getRelativesList, contactId]);

  const handleRelatives = () => {
    navigate('RelativesAdd', {contactId: contactId});
  };

  const openModal = (item: RelativesProps) => {
    setIsModalVisible(true);
    setModalItem(item);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleDelete = () => {
    deleteRelatives(modalItem, contactId);
    closeModal();
  };

  const renderItems = ({
    item,
    index,
  }: {
    item: RelativesProps;
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
          flexDirection="row-reverse"
          alignItems="center"
          justifyContent="flex-start"
          height="100%">
          <Box flexDirection="row-reverse" mt="none">
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
                navigate('RelativesEdit', {
                  listItemId: item.id,
                  contactId: contactId,
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
          renderRightActions={rightActions}
          onSwipeableOpen={closeRow}
          ref={ref => (row[index] = ref)}>
          <RelativesListItem
            contactId={
              item.first_contact_id === contactId
                ? item.contact.id
                : item.first_contact.id
            }
            firstName={
              item.first_contact_id === contactId
                ? item.contact.first_name
                : item.first_contact.first_name
            }
            lastName={
              item.first_contact_id === contactId
                ? item.contact.last_name
                : item.first_contact.last_name
            }
            image={require('../../../assets/images/user.jpg')}
            relationName={item.relation.name}
          />
        </Swipeable>
      </GestureHandlerRootView>
    );
  };

  return (
    <Box height="100%" pt={'m'} flex={1} backgroundColor="lightBackground">
      <Navbar
        showBack
        title={`${fullName} Relatives`}
        counting={pageData?.total_count.toString()}
        renderRight={
          <Touch onPress={handleRelatives}>
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
        {relativesListLoading && !refreshing ? (
          <Box justifyContent="center" flex={1}>
            <Spinner size={'large'} color={'primary'} />
          </Box>
        ) : relativesList.length !== 0 ? (
          <Box mt="ml" flex={1}>
            <FlatList
              data={relativesList}
              showsVerticalScrollIndicator={false}
              renderItem={v => renderItems(v)}
              keyExtractor={item => item.id.toString()}
              onEndReached={() => {
                setLoading(true);
              }}
              onEndReachedThreshold={0}
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
        onDelete={handleDelete}
        localeID="relatives.delete.desc.text"
        deleteLoading={deleteRelativesLoading}
      />
    </Box>
  );
};
