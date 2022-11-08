import React, {useEffect, useState} from 'react';
import {Box} from 'atoms/Box';
import {Navbar} from 'molecules/Navbar';
import {Touch} from 'atoms/Touch';
import {Text} from 'atoms/Text';
import {deviceHeight} from 'utils/device';
import {RefreshControl, SectionList} from 'react-native';
import useSetting from 'context/SettingsAPI';
import {Spinner} from 'atoms/Spinner';
import {LifeEventProps} from 'typings/lifeEvent.type';
import {GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler';
import {DeleteModal} from 'molecules/DeleteModal';
import {CommonListItem} from 'molecules/CommonListItem';
import {ListEmptyComponent} from 'molecules/ListEmptyComponent';
import {navigate} from 'services/NavigationService';

export const LifeEvents = () => {
  const {
    actions: {getLifeEventList, getLifeEventGroupList, deleteLifeEvent},
    state: {
      lifeEventList,
      lifeEventListLoading,
      lifeEventGroupList,
      lifeEventGroupListLoading,
      deleteLifeEventLoading,
    },
  } = useSetting();

  useEffect(() => {
    getLifeEventList();
    getLifeEventGroupList();
  }, [getLifeEventList, getLifeEventGroupList]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalItem, setModalItem] = useState<LifeEventProps>();
  const [refreshing, setRefreshing] = useState(false);

  let row: Array<any> = [];
  let prevOpenedRow: {close: () => void};

  const onRefresh = async () => {
    setRefreshing(true);
    await getLifeEventList();
    setRefreshing(false);
  };

  const openModal = (item: LifeEventProps) => {
    setIsModalVisible(true);
    setModalItem(item);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleDelete = () => {
    deleteLifeEvent(modalItem);
    closeModal();
  };

  const renderItems = ({
    item,
    index,
  }: {
    item: LifeEventProps;
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
          alignSelf="center"
          alignItems="center"
          justifyContent="flex-start"
          height="100%">
          <Touch onPress={() => openModal(item)}>
            <Box
              bg="deleteBtnBackground"
              px="sl"
              flex={1}
              justifyContent="center">
              <Text
                variant="normalText"
                color="whiteText"
                localeId="delete.text"
              />
            </Box>
          </Touch>
          <Touch
            onPress={() => navigate('LifeEventEdit', {lifeEventId: item.id})}>
            <Box
              bg="editBtnBackground"
              px="ml"
              flex={1}
              justifyContent="center">
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
          renderRightActions={() => rightActions()}
          onSwipeableOpen={() => closeRow()}
          ref={ref => (row[index] = ref)}>
          <CommonListItem body={item.name} />
        </Swipeable>
      </GestureHandlerRootView>
    );
  };

  return (
    <Box pt="m" bg="mainBackground" flex={1}>
      <Navbar
        showBack
        title="life.events.title"
        renderRight={
          <Touch>
            <Text
              variant={'mediumText'}
              color="navbarBlue"
              localeId={'menu.add'}
              onPress={() => navigate('LifeEventAdd')}
            />
          </Touch>
        }
      />
      <Box mt={deviceHeight < 780 ? 'mll' : 's'} mx="xl" flex={1}>
        {(lifeEventListLoading || lifeEventGroupListLoading) && !refreshing ? (
          <Box justifyContent="center" flex={1}>
            <Spinner size={'large'} color={'primary'} />
          </Box>
        ) : (
          <Box mt="xm" flex={1}>
            <SectionList
              showsVerticalScrollIndicator={false}
              sections={lifeEventGroupList.map(groupItem => {
                return {
                  title: groupItem.name,
                  data: lifeEventList.filter(
                    eventItem => eventItem.group_id === groupItem.id,
                  ),
                };
              })}
              renderItem={item => renderItems(item)}
              renderSectionHeader={({section}) => (
                <Box bg="mainBackground" pt="ml" pb="s">
                  <Text
                    variant="text_xl"
                    color="black"
                    localeId={section.title}
                  />
                </Box>
              )}
              refreshing={refreshing}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              ListEmptyComponent={<ListEmptyComponent />}
            />
          </Box>
        )}
      </Box>
      <DeleteModal
        isModalVisible={isModalVisible}
        onCloseModal={closeModal}
        onDelete={() => handleDelete()}
        localeID="life.event.delete.desc.text"
        deleteLoading={deleteLifeEventLoading}
      />
    </Box>
  );
};
