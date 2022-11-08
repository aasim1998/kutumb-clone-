import React, {useCallback, useEffect, useState} from 'react';
import {Box} from 'atoms/Box';
import {Text} from 'atoms/Text';
import {FlatList, RefreshControl} from 'react-native';
import {RelationListItem} from 'molecules/RelationListItem';
import {navigate} from 'services/NavigationService';
import {useSetting} from 'context/SettingsAPI';
import {Navbar} from 'molecules/Navbar';
import {Touch} from 'atoms/Touch';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {DeleteModal} from 'molecules/DeleteModal';
import {Spinner} from 'atoms/Spinner';
import {RelationProps} from 'typings/relation.type';
import {TextView} from 'atoms/TextView';
import {deviceHeight} from 'utils/device';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

export const RelationScreen = () => {
  const {
    actions: {getRelations, deleteRelations},
    state: {relationList, getRelationsLoading, deleteRelationLoading},
  } = useSetting();

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalItem, setModalItem] = useState<RelationProps>();
  let row: Array<any> = [];
  let prevOpenedRow: {close: () => void};

  useEffect(() => {
    getRelations();
  }, []);

  const wait = (timeout: number | undefined) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getRelations();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const openModal = (item: RelationProps) => {
    setIsModalVisible(true);
    setModalItem(item);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleDelete = () => {
    deleteRelations(modalItem);
    closeModal();
  };

  const renderItems = ({item, index}) => {
    const closeRow = (index: string | number) => {
      if (prevOpenedRow && prevOpenedRow !== row[index]) {
        prevOpenedRow.close();
      }
      prevOpenedRow = row[index];
    };

    const rightActions = item => {
      return (
        <Box
          flexDirection="row-reverse"
          alignSelf="center"
          alignItems="center"
          justifyContent="flex-start"
          height="100%">
          <Touch onPress={() => openModal(item)}>
            <Box bg="deleteBtnBackground" pt="bm" pb="bm" pl="sl" pr="sl">
              <Text
                variant="normalText"
                color="whiteText"
                localeId="delete.text"
              />
            </Box>
          </Touch>
          <Touch
            onPress={() => navigate('EditRelation', {relationItemId: item.id})}>
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
          <RelationListItem relationname={item.name} />
        </Swipeable>
      </GestureHandlerRootView>
    );
  };

  return (
    <Box height="100%" pt={'m'} flex={1} backgroundColor="lightBackground">
      <Navbar
        showBack
        title="relations.title"
        renderRight={
          <Touch
            onPress={() => {
              navigate('AddRelation');
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
      <Box flex={1} m="xl" mt={deviceHeight < 780 ? 'xxl' : 'l'}>
        <Text variant="normalText" color="black" localeId="relation.sub.text" />
        <Box flex={1} mt="m">
          {getRelationsLoading && !refreshing ? (
            <Box flex={1} justifyContent="center">
              <Spinner color="primary" size="large" />
            </Box>
          ) : relationList.length != 0 ? (
            <FlatList
              data={relationList}
              showsVerticalScrollIndicator={false}
              renderItem={v => renderItems(v)}
              onEndReached={() => {
                setLoading(true);
              }}
              onEndReachedThreshold={0}
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
      </Box>
      <DeleteModal
        isModalVisible={isModalVisible}
        onCloseModal={closeModal}
        onDelete={handleDelete}
        localeID="relation.delete.desc.text"
        deleteLoading={deleteRelationLoading}
      />
    </Box>
  );
};
