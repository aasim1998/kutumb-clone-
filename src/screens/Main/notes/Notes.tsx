import React, {useState, useCallback, useEffect} from 'react';
import {Box} from 'atoms/Box';
import {TextView} from 'atoms/TextView';
import {Touch} from 'atoms/Touch';
import {FlatList, RefreshControl} from 'react-native';
import {navigate} from 'services/NavigationService';
import {CommonListItem} from 'molecules/CommonListItem';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {DeleteModal} from 'molecules/DeleteModal';
import {Text} from 'atoms/Text';
import {Navbar} from 'molecules/Navbar';
import {NoteProps} from 'typings/notes.type';
import {Spinner} from 'atoms/Spinner';
import {formatDate} from 'utils/DateFormatter/formatDate';
import {useRoute} from '@react-navigation/native';
import {deviceHeight} from 'utils/device';
import useNotes from 'context/NotesAPI';
import {en} from 'locales/en';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

export const Notes = () => {
  const {
    actions: {getNotesList, deleteNotes, clearNotesList},
    state: {notesList, notesListLoading, deleteNotesLoading, pageData},
  } = useNotes();

  const {contactId, fullName} = useRoute<any>().params;

  useEffect(() => {
    getNotesList(contactId);

    return () => clearNotesList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contactId, getNotesList]);

  const [moreDataLoading, setMoreDataLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalItem, setModalItem] = useState<NoteProps>();
  const [listItemHeight, setListItemHeight] = useState(0);

  const wait = (timeout: number | undefined) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const loadMoreData = () => {
    setMoreDataLoading(true);
    if (
      notesList?.length < pageData?.total_count &&
      pageData?.next_page !== null
    ) {
      getNotesList(contactId, pageData?.next_page);
    }
    wait(1500).then(() => setMoreDataLoading(false));
  };

  const onRefresh = () => {
    setRefreshing(true);
    if (
      notesList?.length < pageData?.total_count &&
      pageData?.next_page !== null
    ) {
      getNotesList(contactId, pageData?.next_page);
    }
    wait(1500).then(() => setRefreshing(false));
  };

  let row: Array<any> = [];
  let prevOpenedRow: {close: () => void};

  const handleNotes = () => {
    navigate('NotesAdd', {contactId: contactId, fullName: fullName});
  };

  const openModal = (item: NoteProps) => {
    setIsModalVisible(true);
    setModalItem(item);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleDelete = (contactID: number) => {
    deleteNotes(modalItem, contactID);
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
      prevOpenedRow = row[index];
    };

    const rightActions = (Item: NoteProps) => {
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
                navigate('NotesEdit', {
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
          <CommonListItem
            title={item.title}
            body={item.body}
            time={`${en['task.added.on.text']} ${formatDate(item.created_at)}`}
          />
        </Swipeable>
      </GestureHandlerRootView>
    );
  };

  return (
    <Box height="100%" pt={'m'} flex={1} backgroundColor="lightBackground">
      <Navbar
        showBack
        title={`${fullName} ${en['notes.title']}`}
        counting={pageData?.total_count.toString()}
        renderRight={
          <Touch onPress={handleNotes}>
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
        {notesListLoading && pageData === null ? (
          // eslint-disable-next-line react-native/no-inline-styles
          <Box style={{height: '100%', justifyContent: 'center'}}>
            <Spinner size={'large'} color={'primary'} />
          </Box>
        ) : notesList.length !== 0 ? (
          <Box mt="ml" flex={1}>
            <FlatList
              data={notesList}
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
        localeID="notes.delete.desc.text"
        deleteLoading={deleteNotesLoading}
      />
    </Box>
  );
};
