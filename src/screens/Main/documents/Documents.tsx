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
import {useRoute} from '@react-navigation/native';
import {deviceHeight} from 'utils/device';
import {en} from 'locales/en';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import useDocument from 'context/DocumentAPI';
import {DocumentProps} from 'typings/document.type';
import {CommonListItem} from 'molecules/CommonListItem';
import {formatDate} from 'utils/DateFormatter/formatDate';
import {style} from 'styles/style';
import {ListEmptyComponent} from 'molecules/ListEmptyComponent';

export const Documents = () => {
  const {contactId, fullName} = useRoute<any>().params;

  const {
    actions: {
      getDocumentList,
      deleteDocument,
      clearDocumentList,
      updateDocumentList,
    },
    state: {
      documentList,
      pageData,
      documentListLoading,
      deleteDocumentLoading,
      refreshListLoading,
    },
  } = useDocument();

  const [moreDataLoading, setMoreDataLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalItem, setModalItem] = useState<DocumentProps>();
  const [listItemHeight, setListItemHeight] = useState(0);

  useEffect(() => {
    getDocumentList(contactId);

    return () => clearDocumentList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const wait = (timeout: number | undefined) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const loadMoreData = () => {
    setMoreDataLoading(true);
    if (
      documentList?.length < pageData?.total_count &&
      pageData?.next_page !== null
    ) {
      getDocumentList(contactId, pageData?.next_page);
    }
    wait(1500).then(() => setMoreDataLoading(false));
  };

  const onRefresh = () => {
    updateDocumentList(contactId);
  };

  let row: Array<any> = [];
  let prevOpenedRow: {close: () => void};

  const handleDocument = (contactID: number) => {
    navigate('DocumentsAdd', {
      contactId: contactID,
      fullName: fullName,
    });
  };

  const openModal = (item: DocumentProps) => {
    setIsModalVisible(true);
    setModalItem(item);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleDelete = (contactID: number) => {
    deleteDocument(modalItem, contactID);
    closeModal();
  };

  const onLayout = useCallback(
    e => {
      setListItemHeight(e.nativeEvent.layout.height);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [listItemHeight],
  );

  const renderItems = ({item, index}: {item: DocumentProps; index: number}) => {
    const closeRow = (Index: number) => {
      if (prevOpenedRow && prevOpenedRow !== row[Index]) {
        prevOpenedRow.close();
      }
      prevOpenedRow = row[Index];
    };

    const rightActions = (Item: DocumentProps) => {
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
                navigate('DocumentsEdit', {
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
          <CommonListItem
            title={item.filename}
            body={item.comments}
            time={`${formatDate(item.updated_at)}`}
          />
        </Swipeable>
      </GestureHandlerRootView>
    );
  };

  return (
    <Box height="100%" pt={'m'} flex={1} backgroundColor="lightBackground">
      <Navbar
        showBack
        title={`${fullName} ${en['documents.title']}`}
        counting={pageData?.total_count.toString()}
        renderRight={
          <Touch onPress={() => handleDocument(contactId)}>
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
        {documentListLoading && pageData === null && !refreshListLoading ? (
          <Box style={style.loaderStyles}>
            <Spinner size={'large'} color={'primary'} />
          </Box>
        ) : (
          <Box mt="ml" flex={1}>
            <FlatList
              ListEmptyComponent={<ListEmptyComponent />}
              data={documentList}
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
        localeID="documents.delete.desc.text"
        deleteLoading={deleteDocumentLoading}
      />
    </Box>
  );
};
