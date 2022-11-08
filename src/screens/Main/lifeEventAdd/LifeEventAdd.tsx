import React, {useEffect} from 'react';
import {Box} from 'atoms/Box';
import {TextView} from 'atoms/TextView';
import {Navbar} from 'molecules/Navbar';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {deviceHeight} from 'utils/device';
import useSetting from 'context/SettingsAPI';
import {Text} from 'atoms/Text';
import {LifeEventAddForm} from './organisms';
import {addLifeEventType} from 'typings/addLifeEvent.type';

export const LifeEventAdd = () => {
  const {
    actions: {getLifeEventGroupList, addLifeEvent},
    state: {lifeEventGroupList, addLifeEventLoading},
  } = useSetting();

  useEffect(() => {
    getLifeEventGroupList();
  }, [getLifeEventGroupList]);

  const handleSubmit = async (value: addLifeEventType) => {
    const data = {
      api_life_event: {
        name: value.name,
        group_id: value.group_id,
      },
    };
    await addLifeEvent(data);
  };

  const initialValues = {
    name: '',
    group_id: '',
  };

  return (
    <Box height="100%" pt={'m'} flex={1} backgroundColor="lightBackground">
      <Box>
        <Navbar showBack title="add.life.event.title" />
        <TextView
          mt="xxl"
          mx="xl"
          variant="normalText"
          text="add.life.event.subtitle"
        />
      </Box>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        enableOnAndroid>
        <Box
          mx="xl"
          mt={deviceHeight < 780 ? 'xxl' : 'xl'}
          justifyContent="flex-end">
          <Text variant="text_Base" mb="s" localeId="select.group" />
          <LifeEventAddForm
            initialValues={initialValues}
            onSubmit={handleSubmit}
            loading={addLifeEventLoading}
            list={lifeEventGroupList}
          />
        </Box>
      </KeyboardAwareScrollView>
    </Box>
  );
};
