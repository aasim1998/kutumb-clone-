import React, {useEffect, useState} from 'react';
import {Box} from 'atoms/Box';
import {Navbar} from 'molecules/Navbar';
import {Touch} from 'atoms/Touch';
import {Text} from 'atoms/Text';
import {deviceHeight} from 'utils/device';
import {RefreshControl, SectionList} from 'react-native';
import useSetting from 'context/SettingsAPI';
import {Spinner} from 'atoms/Spinner';
import {GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler';
import {DeleteModal} from 'molecules/DeleteModal';
import {CommonListItem} from 'molecules/CommonListItem';
import {ListEmptyComponent} from 'molecules/ListEmptyComponent';
import {AccountActivitiesProps} from 'typings/accountActivities.type';
import {navigate} from 'services/NavigationService';

export const AccountActivities = () => {
  const {
    actions: {
      getAccountActivitiesList,
      getAccountActivitiesGroupList,
      deleteAccountActivity,
    },
    state: {
      accountActivitiesList,
      accountActivitiesListLoading,
      accountActivitiesGroupList,
      accountActivitiesGroupListLoading,
      deleteAccountActivityLoading,
    },
  } = useSetting();

  useEffect(() => {
    getAccountActivitiesList();
    getAccountActivitiesGroupList();
  }, [getAccountActivitiesList, getAccountActivitiesGroupList]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalItem, setModalItem] = useState<AccountActivitiesProps>();
  const [refreshing, setRefreshing] = useState(false);

  let row: Array<any> = [];
  let prevOpenedRow: {close: () => void};

  const onRefresh = async () => {
    setRefreshing(true);
    await getAccountActivitiesList();
    setRefreshing(false);
  };

  const openModal = (item: AccountActivitiesProps) => {
    setIsModalVisible(true);
    setModalItem(item);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleDelete = () => {
    deleteAccountActivity(modalItem);
    closeModal();
  };

  const handleActivities = () => {
    navigate('AccountActivityAdd');
  };

  const renderItems = ({
    item,
    index,
  }: {
    item: AccountActivitiesProps;
    index: number;
  }) => {
    const closeRow = (Index: number) => {
      if (prevOpenedRow && prevOpenedRow !== row[Index]) {
        prevOpenedRow.close();
      }
      prevOpenedRow = row[Index];
    };

    const rightActions = (Item: AccountActivitiesProps) => {
      return (
        <Box
          flexDirection="row-reverse"
          alignSelf="center"
          alignItems="center"
          justifyContent="flex-start"
          height="100%">
          <Touch onPress={() => openModal(Item)}>
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
            onPress={() =>
              navigate('AccountActivityEdit', {
                activityId: Item.id,
              })
            }>
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
          renderRightActions={() => rightActions(item)}
          onSwipeableOpen={() => closeRow(index)}
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
        title="account.activities.title"
        renderRight={
          <Touch onPress={() => handleActivities()}>
            <Text
              variant={'mediumText'}
              color="navbarBlue"
              localeId={'menu.add'}
            />
          </Touch>
        }
      />
      <Box mb="s" mt={deviceHeight < 780 ? 'mll' : 's'} mx="xl" flex={1}>
        {(accountActivitiesListLoading || accountActivitiesGroupListLoading) &&
        !refreshing ? (
          <Box justifyContent="center" flex={1}>
            <Spinner size={'large'} color={'primary'} />
          </Box>
        ) : (
          <Box mt="xm" flex={1}>
            <SectionList
              showsVerticalScrollIndicator={false}
              sections={accountActivitiesGroupList.map(groupItem => {
                return {
                  title: groupItem.name,
                  data: accountActivitiesList.filter(
                    activityItem => activityItem.group_id === groupItem.id,
                  ),
                };
              })}
              renderItem={item => {
                return item.item !== undefined ? renderItems(item) : null;
              }}
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
        localeID="account.activity.delete.desc.text"
        deleteLoading={deleteAccountActivityLoading}
      />
    </Box>
  );
};
