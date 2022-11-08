import React, {useState, useEffect, useCallback} from 'react';
import {Box} from 'atoms/Box';
import {Navbar} from 'molecules/Navbar';
import {FlatList, Platform, RefreshControl} from 'react-native';
import {Text} from 'atoms/Text/Text';
import {Touch} from 'atoms/Touch';
import {navigate} from 'services/NavigationService';
import {Button} from 'molecules/Button';
import {DeleteModal} from 'molecules/DeleteModal';
import {useRoute} from '@react-navigation/native';
import {useJournal} from 'context/JournalAPI';
import {Spinner} from 'atoms/Spinner';
import {formatDate} from 'utils/DateFormatter/formatDate';
import {DATE_FORMATS} from 'utils/DateFormatter/dateTime';
import {JournalCommentProps} from 'typings/journal.types';
import {capitalizeTitle} from 'utils/capitalization';
import {deviceHeight, isIOS} from 'utils/device';

export const JournalDetails = () => {
  const {
    actions: {getJournalItem, deleteJournal, deleteJournalComment},
    state: {journalItem, journalItemLoading},
  } = useJournal();

  const {id} = useRoute<any>().params;

  useEffect(() => {
    getJournalItem(id);
  }, [getJournalItem, id]);

  const [refreshing, setRefreshing] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isJournalModalVisible, setJournalModalVisible] = useState(false);
  const [commentModalData, setCommentModalData] =
    useState<JournalCommentProps>();

  const wait = (timeout: number | undefined) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getJournalItem(id);
    wait(2000).then(() => setRefreshing(false));
  }, [getJournalItem, id]);

  const openModal = () => {
    setIsModalVisible(true);
  };

  const openJournalModal = item => {
    setJournalModalVisible(true);
    setCommentModalData(item);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const closeJournalModal = () => {
    setJournalModalVisible(false);
  };

  const handleDelete = () => {
    setIsModalVisible(false);
    deleteJournal(id);
  };

  const handleDeleteJournalComment = () => {
    setJournalModalVisible(false);
    deleteJournalComment(id, commentModalData);
  };

  const renderItem = item => {
    return (
      <Box mb="-xs" mt="m" flexDirection="row" justifyContent="space-between">
        <Box flex={3} flexDirection="column">
          <Text color="zBlack" variant="normalText">
            {capitalizeTitle(item.title)}
          </Text>
          <Text
            color="greyText"
            mb="xxs"
            ml="none"
            variant={Platform.OS === 'ios' ? 'normalText' : 'text_sm'}>
            {formatDate(item.created_at)}
          </Text>
        </Box>
        <Box
          flex={1}
          flexDirection="row"
          ml={deviceHeight < 780 ? 'sx' : '-xxs'}
          alignItems="flex-start"
          justifyContent="flex-end">
          <Touch
            onPress={() => {
              navigate('JournalEditComment', {
                item: item,
              });
            }}>
            <Text
              variant="mediumText"
              color="editBtnBackground"
              localeId="edit.text"
              fontWeight="500"
            />
          </Touch>
          <Touch ml="sx" onPress={() => openJournalModal(item)}>
            <Text
              variant="mediumText"
              color="redColor"
              localeId="delete.text"
              fontWeight="500"
            />
          </Touch>
        </Box>
      </Box>
    );
  };

  return (
    <Box height="100%" pt={'m'} flex={1} backgroundColor="mainBackground">
      <Navbar
        showBack
        title={capitalizeTitle(journalItem.title)}
        renderRight={
          <Touch
            onPress={() => {
              navigate('Journal');
            }}>
            <Text
              variant={'mediumText'}
              fontWeight={'500'}
              color="redColor"
              localeId={'delete.text'}
              onPress={openModal}
            />
          </Touch>
        }
      />
      <Box flex={1}>
        <Box mr="xl" ml="xl" mt={deviceHeight < 780 ? 'l' : 's'} flex={1}>
          {journalItemLoading && !refreshing ? (
            <Box height="90%" justifyContent="center">
              <Spinner color="primary" size="large" />
            </Box>
          ) : (
            <>
              <Text
                pt={'bm'}
                variant="normalText"
                color="black"
                textAlign="justify">
                {capitalizeTitle(journalItem.body)}
              </Text>
              <Box pb={'m'} flex={1} height="100%">
                <Text
                  pt={isIOS ? 'l' : 'mll'}
                  mb="-xxs"
                  variant="mediumText"
                  color="black"
                  localeId={'heading.comment'}
                />
                {journalItem.comments !== 0 ? (
                  <FlatList
                    data={journalItem.comments}
                    scrollEnabled={true}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item}) => renderItem(item)}
                    keyExtractor={(item, index) => 'new_' + index}
                    refreshing={refreshing}
                    refreshControl={
                      <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                      />
                    }
                  />
                ) : (
                  <Text
                    mt="m"
                    variant="normalText"
                    localeId="text.emptyjcomments"
                  />
                )}
              </Box>
            </>
          )}
        </Box>
        <DeleteModal
          isModalVisible={isModalVisible}
          onCloseModal={closeModal}
          onDelete={handleDelete}
          localeID="journal.delete.desc.text"
        />
        <DeleteModal
          isModalVisible={isJournalModalVisible}
          onCloseModal={closeJournalModal}
          onDelete={handleDeleteJournalComment}
          localeID="journalcomment.delete.desc.text"
        />
      </Box>
      <Box alignSelf={'center'} width="80%" my="mll">
        <Button
          variant="primary"
          onPress={() => {
            navigate('JournalAddNewComment', {journal_id: id});
          }}
          title="bt.add.new.comment"
        />
      </Box>
    </Box>
  );
};
