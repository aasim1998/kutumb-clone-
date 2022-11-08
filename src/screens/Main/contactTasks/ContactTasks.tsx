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
import {TaskProps} from 'typings/tasks.type';
import {Spinner} from 'atoms/Spinner';
import {formatDate} from 'utils/DateFormatter/formatDate';
import {useRoute} from '@react-navigation/native';
import {deviceHeight} from 'utils/device';
import {CommonListItem} from 'molecules/CommonListItem';
import useTasks from 'context/TasksAPI';
import {en} from 'locales/en';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

export const ContactTasks = () => {
  const {
    actions: {getTasksList, deleteTasks, changeTaskStatus, clearTasksList},
    state: {tasksList, tasksListLoading, deleteTasksLoading, pageData},
  } = useTasks();

  const {contactId, fullName} = useRoute<any>().params;

  useEffect(() => {
    getTasksList(contactId);

    return () => clearTasksList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contactId, getTasksList]);

  const [moreDataLoading, setMoreDataLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalItem, setModalItem] = useState<TaskProps>();
  const [listItemHeight, setListItemHeight] = useState(0);

  let row: Array<any> = [];
  let prevOpenedRow: {close: () => void};

  const wait = (timeout: number | undefined) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const loadMoreData = () => {
    setMoreDataLoading(true);
    if (
      tasksList?.length < pageData?.total_count &&
      pageData?.next_page !== null
    ) {
      getTasksList(contactId, pageData?.next_page);
    }
    wait(1500).then(() => setMoreDataLoading(false));
  };

  const onRefresh = () => {
    setRefreshing(true);
    if (
      tasksList?.length < pageData?.total_count &&
      pageData?.next_page !== null
    ) {
      getTasksList(contactId, pageData?.next_page);
    }
    wait(1500).then(() => setRefreshing(false));
  };
  const openModal = (item: TaskProps) => {
    setIsModalVisible(true);
    setModalItem(item);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleDelete = (contactID: number) => {
    deleteTasks(modalItem, contactID);
    closeModal();
  };

  const onLayout = useCallback(
    e => {
      setListItemHeight(e.nativeEvent.layout.height);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [listItemHeight],
  );

  const renderItems = ({item, index}: {item: TaskProps; index: number}) => {
    const closeRow = (Index: number) => {
      if (prevOpenedRow && prevOpenedRow !== row[Index]) {
        prevOpenedRow.close();
      }
      prevOpenedRow = row[Index];
    };

    const rightActions = (Item: TaskProps) => {
      return (
        <Box
          onLayout={onLayout}
          flexDirection="row-reverse"
          alignItems={
            listItemHeight > deviceHeight / 3 ? 'flex-start' : 'center'
          }
          justifyContent="flex-start"
          height={50}
          width="70%"
          bg="mainBackground">
          <Box
            flexDirection="row-reverse"
            mt={listItemHeight > deviceHeight / 3 ? 'bm' : 'none'}>
            <Touch onPress={() => openModal(Item)}>
              <Box
                bg="deleteBtnBackground"
                justifyContent="center"
                height={50}
                pl="s"
                pr="s">
                <TextView
                  variant="normalText"
                  color="whiteText"
                  text="delete.text"
                />
              </Box>
            </Touch>
            <Touch
              onPress={() =>
                navigate('EditContactTasks', {
                  listItemId: Item.id,
                  contactId: contactId,
                  fullName: fullName,
                })
              }>
              <Box
                bg="editBtnBackground"
                justifyContent="center"
                height={50}
                pl="ml"
                pr="ml">
                <TextView
                  variant="normalText"
                  color="whiteText"
                  text="edit.text"
                />
              </Box>
            </Touch>
            <Touch
              onPress={() => {
                changeTaskStatus(Item.id, contactId);
              }}>
              <Box
                alignSelf="flex-end"
                bg={Item.completed ? 'greyBackground' : 'greenPrimary'}
                height={50}
                width="70%"
                justifyContent="center"
                alignItems="center"
                pl="bm"
                pr="bm">
                <TextView
                  variant="normalText"
                  color="whiteText"
                  textAlign="center"
                  text={Item.completed ? 'mark.undone.text' : 'mark.done.text'}
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
          <CommonListItem
            title={item.title}
            time={
              item.completed
                ? en['task.completed.text']
                : `${en['task.due.date.text']} ${formatDate(item.due_date)}`
            }
            body={item.body}
          />
        </Swipeable>
      </GestureHandlerRootView>
    );
  };

  return (
    <Box height="100%" pt={'m'} flex={1} backgroundColor="lightBackground">
      <Navbar
        showBack
        title={`${fullName} ${en['tasks.title']}`}
        counting={pageData?.total_count.toString()}
        renderRight={
          <Touch
            onPress={() => {
              navigate('ContactTaskAdd', {
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
        {tasksListLoading && pageData === null ? (
          <Box justifyContent="center" flex={1}>
            <Spinner size={'large'} color={'primary'} />
          </Box>
        ) : tasksList.length !== 0 ? (
          <Box mt="ml" flex={1}>
            <FlatList
              data={tasksList}
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
        localeID="tasks.delete.desc.text"
        deleteLoading={deleteTasksLoading}
      />
    </Box>
  );
};
