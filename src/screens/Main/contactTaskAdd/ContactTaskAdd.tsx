import React from 'react';
import {Box} from 'atoms/Box';
import {TextView} from 'atoms/TextView';
import {ContactTaskAddForm} from './organism';
import {Navbar} from 'molecules/Navbar';
import {addContactAddTaskType} from 'typings/addcontacttask.type';
import {useRoute} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {deviceHeight} from 'utils/device';
import useTasks from 'context/TasksAPI';
import {en} from 'locales/en';

export const ContactAddTask = () => {
  const {
    actions: {addTasks},
    state: {addTasksLoading},
  } = useTasks();

  const {contactId, fullName} = useRoute<any>().params;

  const handleSubmit = async (values: addContactAddTaskType) => {
    const data = {
      api_task: {
        title: values.title,
        body: values.addTask,
        due_date: values.dueDate,
      },
    };
    await addTasks(contactId, data);
  };
  const initialValues = {
    title: '',
    addTask: '',
    dueDate: '',
  };
  return (
    <Box height="100%" pt={'m'} flex={1} backgroundColor="lightBackground">
      <Box>
        <Navbar showBack title="add.new.task" />
        <TextView
          mt="xxl"
          ml="xl"
          variant="normalText"
          color="black"
          text={`${en['add.new.task.subtitle']} ${fullName}`}
        />
      </Box>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        enableOnAndroid>
        <Box
          mx="xl"
          mt={deviceHeight < 780 ? 'ml' : 'xs'}
          justifyContent="flex-end">
          <ContactTaskAddForm
            initialValues={initialValues}
            onSubmit={handleSubmit}
            loading={addTasksLoading}
          />
        </Box>
      </KeyboardAwareScrollView>
    </Box>
  );
};
