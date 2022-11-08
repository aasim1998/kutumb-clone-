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
import {ContactActivityProps} from 'typings/ContactActivity.type';
import {AccountActivitiesGroupProps} from 'typings/accountActivitiesGroup.type';
import {AccountActivitiesProps} from 'typings/accountActivities.type';

export type ContactActivityStateProps = {
  contactActivityListLoading: boolean;
  refreshListLoading: boolean;
  contactActivityList: Array<ContactActivityProps>;
  pageData: any;
  contactActivityItemLoading: boolean;
  contactActivityItem: any;
  activityGroupList: Array<AccountActivitiesGroupProps>;
  activityItemList: Array<AccountActivitiesProps>;
  activityDataLoading: boolean;
  addContactActivityLoading: boolean;
  editContactActivityLoading: boolean;
  deleteContactActivityLoading: boolean;
};

const initialState: ContactActivityStateProps = {
  contactActivityListLoading: false,
  refreshListLoading: false,
  contactActivityList: [],
  pageData: null,
  contactActivityItemLoading: false,
  contactActivityItem: {},
  activityGroupList: [],
  activityItemList: [],
  activityDataLoading: false,
  addContactActivityLoading: false,
  editContactActivityLoading: false,
  deleteContactActivityLoading: false,
};

const actions = {
  getContactActivityList: createAsyncActions('GET_CONTACT_ACTIVITY_LIST'),
  clearContactActivityList: createAsyncActions('CLEAR_CONTACT_ACTIVITY_LIST'),
  updateContactActivityList: createAsyncActions('UPDATE_CONTACT_ACTIVITY_LIST'),
  getContactActivityItem: createAsyncActions('GET_CONTACT_ACTIVITY_ITEM'),
  getActivityData: createAsyncActions('GET_ACTIVITY_DATA'),
  addContactActivity: createAsyncActions('ADD_CONTACT_ACTIVITY'),
  editContactActivity: createAsyncActions('EDIT_CONTACT_ACTIVITY'),
  deleteContactActivity: createAsyncActions('DELETE_CONTACT_ACTIVITY'),
};

const ContactActivityReducer = createReducer<ContactActivityStateProps>({
  [`${actions.getContactActivityList.loading}`]: state => ({
    ...state,
    contactActivityListLoading: true,
  }),
  [`${actions.getContactActivityList.success}`]: (state, {payload}) => ({
    ...state,
    contactActivityListLoading: false,
    contactActivityList: [
      ...state.contactActivityList,
      ...payload?.payload.data,
    ],
    pageData: payload?.payload.pagy,
  }),
  [`${actions.getContactActivityList.failure}`]: state => ({
    ...state,
    contactActivityListLoading: false,
  }),
  [`${actions.clearContactActivityList.success}`]: state => ({
    ...state,
    contactActivityListLoading: false,
    contactActivityList: [],
    pageData: null,
  }),
  [`${actions.updateContactActivityList.loading}`]: state => ({
    ...state,
    refreshListLoading: true,
  }),
  [`${actions.updateContactActivityList.success}`]: (state, {payload}) => ({
    ...state,
    refreshListLoading: false,
    contactActivityList: payload?.updatedContactActivityList,
    pageData: payload?.pageData,
  }),
  [`${actions.updateContactActivityList.failure}`]: state => ({
    ...state,
    refreshListLoading: false,
  }),
  [`${actions.getContactActivityItem.loading}`]: state => ({
    ...state,
    contactActivityItemLoading: true,
  }),
  [`${actions.getContactActivityItem.success}`]: (state, {payload}) => ({
    ...state,
    contactActivityItemLoading: false,
    contactActivityItem: payload?.contactActivityItem,
  }),
  [`${actions.getContactActivityItem.failure}`]: state => ({
    ...state,
    contactActivityItemLoading: false,
  }),
  [`${actions.getActivityData.loading}`]: state => ({
    ...state,
    activityDataLoading: true,
  }),
  [`${actions.getActivityData.success}`]: (state, {payload}) => ({
    ...state,
    activityDataLoading: false,
    activityGroupList: payload?.activityGroupList,
    activityItemList: payload?.activityItemList,
  }),
  [`${actions.getActivityData.failure}`]: state => ({
    ...state,
    activityDataLoading: false,
  }),
  [`${actions.addContactActivity.loading}`]: state => ({
    ...state,
    addContactActivityLoading: true,
  }),
  [`${actions.addContactActivity.success}`]: state => ({
    ...state,
    addContactActivityLoading: false,
  }),
  [`${actions.addContactActivity.failure}`]: state => ({
    ...state,
    addContactActivityLoading: false,
  }),
  [`${actions.editContactActivity.loading}`]: state => ({
    ...state,
    editContactActivityLoading: true,
  }),
  [`${actions.editContactActivity.success}`]: (state, {payload}) => ({
    ...state,
    editContactActivityLoading: false,
    contactActivityList: payload?.updatedContactActivityList,
  }),
  [`${actions.editContactActivity.failure}`]: state => ({
    ...state,
    editContactActivityLoading: false,
  }),
  [`${actions.deleteContactActivity.loading}`]: state => ({
    ...state,
    deleteContactActivityLoading: true,
  }),
  [`${actions.deleteContactActivity.success}`]: (state, {payload}) => ({
    ...state,
    deleteContactActivityLoading: false,
    contactActivityList: payload?.updatedContactActivityList,
  }),
  [`${actions.deleteContactActivity.failure}`]: state => ({
    ...state,
    deleteContactActivityLoading: false,
  }),
});

export const {
  useContext: useContactActivity,
  Context: ContactActivityContext,
  Provider: ContactActivityProvider,
  TestProvider: TestContactActivityProvider,
} = createContainer(() => {
  const [{...state}, dispatch] = useReducer(
    ContactActivityReducer,
    initialState,
  );

  const clearContactActivityList = () => {
    dispatch(actions.clearContactActivityList.success());
  };

  const updateContactActivityList = useCallback(
    async (contactId: number, pageNumber?: number) => {
      dispatch(actions.updateContactActivityList.loading());
      const user: any = await hydrate(AUTH_KEYS.user);
      await api
        .get<Array<ContactActivityProps>>(
          `${
            user.account_id
          }/api/contacts/${contactId}/contact_activities?page=${
            pageNumber ? pageNumber : 1
          }.json`,
        )
        .then(res => {
          const data = res.data;
          if (data.success) {
            dispatch(
              actions.updateContactActivityList.success({
                updatedContactActivityList: data.data,
                pageData: data.pagy,
              }),
            );
          } else {
            showErrorMessage(`${data.message}`);
            dispatch(actions.updateContactActivityList.failure());
          }
        })
        .catch(e => {
          showErrorMessage(`${e}`);
          dispatch(actions.updateContactActivityList.failure());
        });
    },
    [],
  );

  const getContactActivityList = useCallback(
    async (contactId: number, pageNumber?: number) => {
      dispatch(actions.getContactActivityList.loading());
      const user: any = await hydrate(AUTH_KEYS.user);
      await api
        .get<Array<ContactActivityProps>>(
          `${
            user.account_id
          }/api/contacts/${contactId}/contact_activities?page=${
            pageNumber ? pageNumber : 1
          }.json`,
        )
        .then(res => {
          const data = res.data;
          if (data.success === true) {
            dispatch(
              actions.getContactActivityList.success({
                payload: data,
              }),
            );
          } else {
            showErrorMessage(`${data.message}`);
            dispatch(actions.getContactActivityList.failure());
          }
        })
        .catch(e => {
          showErrorMessage(`${e}`);
          dispatch(actions.getContactActivityList.failure());
        });
    },
    [],
  );

  const getContactActivityItem = useCallback(
    async (itemId: number, contactId: number) => {
      dispatch(actions.getContactActivityItem.loading());
      const user: any = await hydrate(AUTH_KEYS.user);
      await api
        .get<ContactActivityProps>(
          `${user.account_id}/api/contacts/${contactId}/contact_activities/${itemId}/edit.json`,
        )
        .then(res => {
          const {data} = res.data;
          if (res.data.success) {
            dispatch(
              actions.getContactActivityItem.success({
                contactActivityItem: data,
              }),
            );
          } else {
            showErrorMessage(`${res.data.message}`);
            dispatch(actions.getContactActivityItem.failure());
          }
        })
        .catch(e => {
          showErrorMessage(`${e}`);
          dispatch(actions.getContactActivityItem.failure());
        });
    },
    [],
  );

  const getActivityData = useCallback(async (contactId: number) => {
    dispatch(actions.getActivityData.loading());
    const user: any = await hydrate(AUTH_KEYS.user);
    await api
      .get(
        `${user.account_id}/api/contacts/${contactId}/contact_activities/new.json`,
      )
      .then(res => {
        const data = res.data;
        if (data.success) {
          dispatch(
            actions.getActivityData.success({
              activityGroupList: data.group,
              activityItemList: data.data,
            }),
          );
        } else {
          showErrorMessage(`${data.message}`);
          dispatch(actions.addContactActivity.failure());
        }
      })
      .catch(e => {
        showErrorMessage(`${e}`);
        dispatch(actions.addContactActivity.failure());
      });
  }, []);

  const addContactActivity = useCallback(
    async (
      contactId: number,
      values: {
        api_contact_activity: {
          title: string;
          body: string;
          date: string;
          activity_id: string;
        };
      },
    ) => {
      dispatch(actions.addContactActivity.loading());
      const user: any = await hydrate(AUTH_KEYS.user);
      await api
        .post<ContactActivityProps>(
          `${user.account_id}/api/contacts/${contactId}/contact_activities.json`,
          values,
        )
        .then(res => {
          const data = res.data;
          if (data.success) {
            showSuccessMessage(`${data.message}`);
            clearContactActivityList();
            getContactActivityList(contactId);
            dispatch(actions.addContactActivity.success());
            goBack();
          } else {
            showErrorMessage(`${data.message}`);
            dispatch(actions.addContactActivity.failure());
          }
        })
        .catch(e => {
          showErrorMessage(`${e}`);
          dispatch(actions.addContactActivity.failure());
        });
    },
    [getContactActivityList],
  );

  const editContactActivity = useCallback(
    async (
      itemId: number,
      contactId: number,
      values: {
        api_contact_activity: {date: string; body: string; title: string};
      },
    ) => {
      dispatch(actions.editContactActivity.loading());
      const user: any = await hydrate(AUTH_KEYS.user);
      await api
        .patch<ContactActivityProps>(
          `${user.account_id}/api/contacts/${contactId}/contact_activities/${itemId}.json`,
          values,
        )
        .then(res => {
          const data = res.data;
          if (data.success) {
            showSuccessMessage(`${data.message}`);
            const {id, body, updated_at, date, title} = data.data;
            const updatedContactActivityList = state.contactActivityList.map(
              (obj: ContactActivityProps) => {
                if (obj.id === id) {
                  return {...obj, body, updated_at, date, title};
                }
                return obj;
              },
            );
            dispatch(
              actions.editContactActivity.success({
                updatedContactActivityList: updatedContactActivityList,
              }),
            );
            goBack();
          } else {
            showErrorMessage(`${data.message}`);
            dispatch(actions.editContactActivity.failure());
          }
        })
        .catch(e => {
          showErrorMessage(`${e}`);
          dispatch(actions.editContactActivity.failure());
        });
    },
    [state.contactActivityList],
  );

  const deleteContactActivity = useCallback(
    async (item, contactId: number) => {
      dispatch(actions.deleteContactActivity.loading());
      const user: any = await hydrate(AUTH_KEYS.user);
      await api
        .delete(
          `${user.account_id}/api/contacts/${contactId}/contact_activities/${item.id}.json`,
        )
        .then(res => {
          const data = res.data;
          if (data.success) {
            showSuccessMessage(`${data.message}`);
            const updatedContactActivityList = state.contactActivityList.filter(
              obj => obj.id !== item.id,
            );
            dispatch(
              actions.deleteContactActivity.success({
                updatedContactActivityList: updatedContactActivityList,
              }),
            );
          } else {
            showErrorMessage(`${data.message}`);
            dispatch(actions.deleteContactActivity.failure());
          }
        })
        .catch(e => {
          showErrorMessage(`${e}`);
          dispatch(actions.deleteContactActivity.failure());
        });
    },
    [state.contactActivityList],
  );

  return {
    state: {
      ...state,
    },
    actions: {
      getContactActivityList,
      getContactActivityItem,
      getActivityData,
      addContactActivity,
      editContactActivity,
      deleteContactActivity,
      clearContactActivityList,
      updateContactActivityList,
    },
  };
});

export default useContactActivity;
