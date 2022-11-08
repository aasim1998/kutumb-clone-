import React, {useState, useCallback} from 'react';
import {Box} from 'atoms/Box';
import {useAuth} from 'context/Authentication';
import {SelectableCard} from 'atoms/SelectableCard';
import {ActivityListItem} from 'molecules/ActivityListItem';
import {FlatList, Platform, RefreshControl} from 'react-native';
import {activityData} from '../../../constants/activityData';
import theme from 'styles/theme';

export const Activities = () => {
  const {
    actions: {changeLanguage},
  } = useAuth();

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const wait = (timeout: number | undefined) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <Box
      pt="m"
      bg="mainBackground"
      flex={1}
      pb={Platform.OS == 'ios' ? 'XXL' : 'xxxl'}>
      <FlatList
        data={activityData}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <SelectableCard
            minHeight={theme.spacing.xxll}
            borderRadius={theme.spacing.none}
            mb="none"
            bg="mainBackground"
            flexDirection="row"
            alignItems="flex-start"
            justifyContent="space-between"
            p="xxs"
            pb="none">
            <ActivityListItem
              image={item.image}
              assignee={item.assignee}
              desc1={item.desc1}
              assignTo={item.assignTo}
              desc2={item.desc2}
              assignedIn={item.assignedIn}
              date={item.date}
            />
          </SelectableCard>
        )}
        keyExtractor={item => item.id}
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
  );
};
