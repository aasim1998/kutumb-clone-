import React, {useEffect} from 'react';
import {Box} from 'atoms/Box';
import {TextView} from 'atoms/TextView';
import {EditContactTasksForm} from './organisms/EditContactTasksForm';
import {Navbar} from 'molecules/Navbar';
import {useRoute} from '@react-navigation/native';
import {Spinner} from 'atoms/Spinner';
import {editContactTasks} from 'typings/editcontacttasks.type';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {deviceHeight} from 'utils/device';
import useTasks from 'context/TasksAPI';
import {en} from 'locales/en';

export const EditContactTasks = () => {
  const {listItemId, contactId, fullName} = useRoute<any>().params;

  const {
    actions: {getTaskItem, editTasks},
    state: {taskItem, taskItemLoading, editTasksLoading},
  } = useTasks();

  useEffect(() => {
    getTaskItem(listItemId, contactId);
  }, [contactId, getTaskItem, listItemId]);

  const handleSubmit = async (values: editContactTasks) => {
    const data = {
      api_task: {
        title: values.title,
        body: values.editTask,
        due_date: values.dueDate,
      },
    };

    await editTasks(listItemId, contactId, data);
  };

  const initialValues = {
    title: taskItem.title,
    editTask: taskItem.body,
    dueDate: taskItem.due_date,
  };

  return (
    <Box height="100%" pt={'m'} flex={1} backgroundColor="lightBackground">
      <Box>
        <Navbar showBack title="edit.tasks.title" />
        <TextView
          mt="xxl"
          ml="xl"
          variant="normalText"
          color="black"
          text={`${en['edit.task.subtitle']} ${fullName}`}
        />
      </Box>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        enableOnAndroid>
        <Box
          mx="xl"
          mt={deviceHeight < 780 ? 'ml' : 'xs'}
          justifyContent="flex-end">
          {taskItemLoading ? (
            // eslint-disable-next-line react-native/no-inline-styles
            <Box style={{height: '100%', justifyContent: 'center'}}>
              <Spinner size={'large'} color={'primary'} />
            </Box>
          ) : (
            <EditContactTasksForm
              initialValues={initialValues}
              onSubmit={handleSubmit}
              loading={editTasksLoading}
            />
          )}
        </Box>
      </KeyboardAwareScrollView>
    </Box>
  );
};
