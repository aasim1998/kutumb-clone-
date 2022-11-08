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
import {ConversationProps} from 'typings/Conversation.type';
import {StatusListItem} from 'molecules/StatusListItem';
import useSetting from 'context/SettingsAPI';
import capitalizeName from 'utils/capitalization';
import {en} from 'locales/en';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {ListEmptyComponent} from 'molecules/ListEmptyComponent';
import useConversation from 'context/ConversationAPI';
import {style} from 'styles/style';

export const Conversations = () => {
  const {contactId, fullName} = useRoute<any>().params;

  const {
    actions: {
      getConversationList,
      deleteConversation,
      clearConversationList,
      updateConversationList,
    },
    state: {
      conversationList,
      pageData,
      conversationListLoading,
      deleteConversationLoading,
      refreshListLoading,
    },
  } = useConversation();

  const {
    actions: {getPersonalDetailItem},
    state: {personalDetailItem},
  } = useSetting();

  const [moreDataLoading, setMoreDataLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalItem, setModalItem] = useState<ConversationProps>();
  const [listItemHeight, setListItemHeight] = useState(0);

  useEffect(() => {
    getPersonalDetailItem();
    getConversationList(contactId);

    return () => clearConversationList();
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
      conversationList?.length < pageData?.total_count &&
      pageData?.next_page !== null
    ) {
      getConversationList(contactId, pageData?.next_page);
    }
    wait(1500).then(() => setMoreDataLoading(false));
  };

  const onRefresh = () => {
    updateConversationList(contactId);
  };

  let row: Array<any> = [];
  let prevOpenedRow: {close: () => void};

  const handleConversation = (contactID: number) => {
    navigate('ConversationsAdd', {
      contactId: contactID,
      fullName: fullName,
    });
  };

  const openModal = (item: ConversationProps) => {
    setIsModalVisible(true);
    setModalItem(item);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleDelete = (contactID: number) => {
    deleteConversation(modalItem, contactID);
    closeModal();
  };

  const onLayout = useCallback(
    e => {
      setListItemHeight(e.nativeEvent.layout.height);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [listItemHeight],
  );

  const renderItems = ({
    item,
    index,
  }: {
    item: ConversationProps;
    index: number;
  }) => {
    const closeRow = (currentItem: boolean = false) => {
      if (prevOpenedRow && prevOpenedRow !== row[index]) {
        prevOpenedRow.close();
      }
      if (currentItem) {
        row[index].close();
      }
      prevOpenedRow = row[index];
    };

    const rightActions = () => {
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
              onPress={() => {
                closeRow(true);
                navigate('ConversationsEdit', {
                  conversationId: item.id,
                  contactId: contactId,
                  fullName: fullName,
                });
              }}>
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
          renderRightActions={() => rightActions()}
          onSwipeableOpen={() => closeRow()}
          ref={ref => (row[index] = ref)}>
          <StatusListItem
            body={item.body}
            time={`${formatDate(item.date)}`}
            status={item.field.name}
            userName={userName}
            protocol={item.field.protocol}
          />
        </Swipeable>
      </GestureHandlerRootView>
    );
  };

  return (
    <Box height="100%" pt={'m'} flex={1} backgroundColor="lightBackground">
      <Navbar
        showBack
        title={`${fullName} ${en['conversations.title']}`}
        counting={pageData?.total_count.toString()}
        renderRight={
          <Touch onPress={() => handleConversation(contactId)}>
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
        {conversationListLoading && pageData === null && !refreshListLoading ? (
          <Box style={style.loaderStyles}>
            <Spinner size={'large'} color={'primary'} />
          </Box>
        ) : (
          <Box mt="ml" flex={1}>
            <FlatList
              ListEmptyComponent={<ListEmptyComponent />}
              data={conversationList}
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
        localeID="conversation.delete.desc.text"
        deleteLoading={deleteConversationLoading}
      />
    </Box>
  );
};
