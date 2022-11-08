import React, {useEffect} from 'react';
import {Box} from 'atoms/Box';
import {Navbar} from 'molecules/Navbar';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {deviceHeight} from 'utils/device';
import useSetting from 'context/SettingsAPI';
import {useRoute} from '@react-navigation/native';
import {Spinner} from 'atoms/Spinner';
import {LifeEventEditForm} from './organisms';
import {editLifeEventType} from 'typings/editLifeEvent.type';
import {style} from 'styles/style';

export const LifeEventEdit = () => {
  const {lifeEventId} = useRoute<any>().params;

  const {
    actions: {getLifeEventItem, editLifeEvent},
    state: {editLifeEventItem, editLifeEventItemLoading, editLifeEventLoading},
  } = useSetting();

  useEffect(() => {
    getLifeEventItem(lifeEventId);
  }, [getLifeEventItem, lifeEventId]);

  const handleSubmit = async (value: editLifeEventType) => {
    const data = {
      api_life_event: {
        name: value.name,
      },
    };
    await editLifeEvent(lifeEventId, data);
  };

  const initialValues = {
    name: editLifeEventItem.name,
  };

  return (
    <Box height="100%" pt={'m'} flex={1} backgroundColor="lightBackground">
      <Box mb="ml">
        <Navbar showBack title="edit.life.event" />
      </Box>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        enableOnAndroid>
        <Box
          mx="xl"
          mt={deviceHeight < 780 ? 'ml' : 'xs'}
          justifyContent="flex-end">
          {editLifeEventItemLoading ? (
            <Box style={style.loaderStyles}>
              <Spinner size={'large'} color={'primary'} />
            </Box>
          ) : (
            <LifeEventEditForm
              initialValues={initialValues}
              onSubmit={handleSubmit}
              loading={editLifeEventLoading}
            />
          )}
        </Box>
      </KeyboardAwareScrollView>
    </Box>
  );
};
