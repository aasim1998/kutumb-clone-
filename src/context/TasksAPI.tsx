import {useCallback, useReducer} from 'react';
import {
  createContainer,
  createReducer,
  createAsyncActions,
} from 'utils/context';
import {api} from 'utils/api/api';
import {AUTH_KEYS, hydrate} from 'utils/storage';
import {showErrorMessage, showSuccessMessage} from 'utils/toast';
import {goBack} from 'services/NavigationService';
import {TaskProps} from 'typings/tasks.type';

export type TasksStateProps = {
  tasksListLoading: boolean;
  pageData: any;
  tasksList: Array<TaskProps>;
  taskItemLoading: boolean;
  taskItem: any;
  addTasksLoading: boolean;
  editTasksLoading: boolean;
  deleteTasksLoading: boolean;
  changeTaskStatusLoading: boolean;
  taskStatus: boolean;
};

const initialState: TasksStateProps = {
  tasksListLoading: false,
  pageData: null,
  tasksList: [],
  taskItemLoading: false,
  taskItem: {},
  addTasksLoading: false,
  editTasksLoading: false,
  deleteTasksLoading: false,
  changeTaskStatusLoading: false,
  taskStatus: false,
};

const actions = {
  getTasksList: createAsyncActions('GET_TASKS_LIST'),
  getTaskItem: createAsyncActions('GET_TASK_ITEM'),
  addTasks: createAsyncActions('ADD_TASKS'),
  editTasks: createAsyncActions('EDIT_TASKS'),
  deleteTasks: createAsyncActions('DELETE_TASKS'),
  changeTaskStatus: createAsyncActions('GET_TASK_STATUS'),
  clearTasksList: createAsyncActions('CLEAR_TASKS_LIST'),
};

const tasksReducer = createReducer<TasksStateProps>({
  [`${actions.getTasksList.loading}`]: state => ({
    ...state,
    tasksListLoading: true,
  }),
  [`${actions.getTasksList.success}`]: (state, {payload}) => ({
    ...state,
    tasksListLoading: false,
    tasksList: [...state?.tasksList, ...payload?.payload.data],
    pageData: payload?.payload.pagy,
  }),
  [`${actions.getTasksList.failure}`]: state => ({
    ...state,
    tasksListLoading: false,
  }),
  [`${actions.getTaskItem.loading}`]: state => ({
    ...state,
    taskItemLoading: true,
  }),
  [`${actions.getTaskItem.success}`]: (state, {payload}) => ({
    ...state,
    taskItemLoading: false,
    taskItem: payload?.taskItem,
  }),
  [`${actions.getTaskItem.failure}`]: state => ({
    ...state,
    taskItemLoading: false,
  }),
  [`${actions.addTasks.loading}`]: state => ({
    ...state,
    addTasksLoading: true,
  }),
  [`${actions.addTasks.success}`]: state => ({
    ...state,
    addTasksLoading: false,
  }),
  [`${actions.addTasks.failure}`]: state => ({
    ...state,
    addTasksLoading: false,
  }),
  [`${actions.editTasks.loading}`]: state => ({
    ...state,
    editTasksLoading: true,
  }),
  [`${actions.editTasks.success}`]: state => ({
    ...state,
    editTasksLoading: false,
  }),
  [`${actions.editTasks.failure}`]: state => ({
    ...state,
    editTasksLoading: false,
  }),
  [`${actions.deleteTasks.loading}`]: state => ({
    ...state,
    deleteTasksLoading: true,
  }),
  [`${actions.deleteTasks.success}`]: state => ({
    ...state,
    deleteTasksLoading: false,
  }),
  [`${actions.deleteTasks.failure}`]: state => ({
    ...state,
    deleteTasksLoading: false,
  }),
  [`${actions.changeTaskStatus.loading}`]: state => ({
    ...state,
    changeTaskStatusLoading: true,
  }),
  [`${actions.changeTaskStatus.success}`]: (state, {payload}) => ({
    ...state,
    changeTaskStatusLoading: false,
    taskStatus: payload.taskStatus,
  }),
  [`${actions.changeTaskStatus.loading}`]: state => ({
    ...state,
    changeTaskStatusLoading: true,
  }),
  [`${actions.clearTasksList.success}`]: state => ({
    ...state,
    tasksListLoading: false,
    tasksList: [],
    pageData: null,
  }),
});

export const {
  useContext: useTasks,
  Context: TasksContext,
  Provider: TasksProvider,
  TestProvider: TestTasksProvider,
} = createContainer(() => {
  const [{...state}, dispatch] = useReducer(tasksReducer, initialState);

  const getTasksList = useCallback(
    async (contactId: number, pageNumber?: number) => {
      dispatch(actions.getTasksList.loading());
      const user: any = await hydrate(AUTH_KEYS.user);
      await api
        .get<Array<TaskProps>>(
          `${user.account_id}/api/contacts/${contactId}/tasks?page=${
            pageNumber ? pageNumber : 1
          }.json`,
        )
        .then(res => {
          const data = res.data;
          if (data.success === true) {
            dispatch(actions.getTasksList.success({payload: data}));
          } else {
            showErrorMessage(`${data.message}`);
            dispatch(actions.getTasksList.failure());
          }
        })
        .catch(e => {
          showErrorMessage(`${e}`);
          dispatch(actions.getTasksList.failure());
        });
    },
    [],
  );

  const getTaskItem = useCallback(async (itemId: number, contactId: number) => {
    dispatch(actions.getTaskItem.loading());
    const user: any = await hydrate(AUTH_KEYS.user);
    await api
      .get(
        `${user.account_id}/api/contacts/${contactId}/tasks/${itemId}/edit.json`,
      )
      .then(res => {
        const {data} = res.data;
        if (res.data.success) {
          dispatch(actions.getTaskItem.success({taskItem: data}));
        } else {
          showErrorMessage(`${res.data.message}`);
          dispatch(actions.getTaskItem.failure());
        }
      })
      .catch(e => {
        showErrorMessage(`${e}`);
        dispatch(actions.getTaskItem.failure());
      });
  }, []);

  const addTasks = useCallback(
    async (
      contactId: number,
      values: {api_task: {title: string; body: string; due_date: string}},
    ) => {
      dispatch(actions.addTasks.loading());
      const user: any = await hydrate(AUTH_KEYS.user);
      await api
        .post(`${user.account_id}/api/contacts/${contactId}/tasks.json`, values)
        .then(res => {
          if (res.data.success === true) {
            showSuccessMessage(`${res.data.message}`);
            clearTasksList();
            getTasksList(contactId);
            dispatch(actions.addTasks.success());
            goBack();
          } else {
            showErrorMessage(`${res.data.message}`);
            dispatch(actions.addTasks.failure());
          }
        })
        .catch(error => {
          showErrorMessage(`${error}`);
          dispatch(actions.addTasks.failure());
        });
    },
    [getTasksList],
  );

  const editTasks = useCallback(
    async (
      itemId: number,
      contactId: number,
      values: {api_task: {title: string; body: string; due_date: string}},
    ) => {
      dispatch(actions.editTasks.loading());
      const user: any = await hydrate(AUTH_KEYS.user);
      await api
        .patch(
          `${user.account_id}/api/contacts/${contactId}/tasks/${itemId}.json`,
          values,
        )
        .then(res => {
          if (res.data.success) {
            showSuccessMessage(`${res.data.message}`);
            clearTasksList();
            getTasksList(contactId);
            dispatch(actions.editTasks.success());
            goBack();
          } else {
            showErrorMessage(`${res.data.message}`);
            dispatch(actions.editTasks.failure());
          }
        })
        .catch(error => {
          showErrorMessage(`${error}`);
          dispatch(actions.editTasks.failure());
        });
    },
    [getTasksList],
  );

  const deleteTasks = useCallback(
    async (item, contactId: number) => {
      dispatch(actions.deleteTasks.loading());
      const user: any = await hydrate(AUTH_KEYS.user);
      await api
        .delete(
          `${user.account_id}/api/contacts/${contactId}/tasks/${item.id}.json`,
        )
        .then(res => {
          if (res.data.success) {
            showSuccessMessage(`${res.data.message}`);
            clearTasksList();
            getTasksList(contactId);
            dispatch(actions.deleteTasks.success());
          } else {
            showErrorMessage(`${res.data.message}`);
            dispatch(actions.deleteTasks.failure());
          }
        })
        .catch(error => {
          showErrorMessage(`${error}`);
          dispatch(actions.deleteTasks.failure());
        });
    },
    [getTasksList],
  );

  const changeTaskStatus = useCallback(
    async (itemId: number, contactId: number) => {
      const user: any = await hydrate(AUTH_KEYS.user);
      dispatch(actions.changeTaskStatus.loading());
      await api
        .get(
          `${user.account_id}/api/contacts/${contactId}/tasks/${itemId}/status`,
        )
        .then(res => {
          const {data} = res.data;
          showSuccessMessage(`${res.data.message}`);
          clearTasksList();
          getTasksList(contactId);
          dispatch(actions.deleteTasks.success({taskStatus: data}));
        })
        .catch(error => {
          showErrorMessage(`${error}`);
          dispatch(actions.deleteTasks.failure());
        });
    },
    [getTasksList],
  );

  const clearTasksList = () => {
    dispatch(actions.clearTasksList.success());
  };

  return {
    state: {
      ...state,
    },
    actions: {
      getTasksList,
      getTaskItem,
      addTasks,
      editTasks,
      deleteTasks,
      changeTaskStatus,
      clearTasksList,
    },
  };
});

export default useTasks;
