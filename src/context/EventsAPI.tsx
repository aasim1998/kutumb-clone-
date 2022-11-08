import {useCallback, useReducer} from 'react';
import {
  createContainer,
  createReducer,
  createAsyncActions,
} from 'utils/context';
import {api} from 'utils/api/api';
import {AUTH_KEYS, hydrate} from 'utils/storage';
import {showErrorMessage, showSuccessMessage} from 'utils/toast';
import {ContactEventProps} from 'typings/events.type';
import {goBack} from 'services/NavigationService';

export type ContactEventStateProps = {
  eventsListLoading: boolean;
  pageData: any;
  eventsList: Array<ContactEventProps>;
  addEventsLoading: boolean;
  deleteEventsLoading: boolean;
  eventItem: any;
  eventItemLoading: boolean;
  editEventsLoading: boolean;
  refreshListLoading: boolean;
};

const initialState: ContactEventStateProps = {
  eventsListLoading: false,
  pageData: null,
  eventsList: [],
  addEventsLoading: false,
  deleteEventsLoading: false,
  eventItem: {},
  eventItemLoading: false,
  editEventsLoading: false,
  refreshListLoading: false,
};

const actions = {
  getEventsList: createAsyncActions('GET_EVENTS_LIST'),
  clearEventsList: createAsyncActions('CLEAR_EVENTS_LIST'),
  addEvents: createAsyncActions('ADD_EVENTS'),
  deleteEvents: createAsyncActions('DELETE_EVENTS'),
  getEventItem: createAsyncActions('GET_EVENT_ITEM'),
  editEvents: createAsyncActions('EDIT_EVENTS'),
  updateContactEventList: createAsyncActions('UPDATE_CONTACT_EVENT_LIST'),
};

const eventsReducer = createReducer<ContactEventStateProps>({
  [`${actions.getEventsList.loading}`]: state => ({
    ...state,
    eventsListLoading: true,
  }),
  [`${actions.getEventsList.success}`]: (state, {payload}) => ({
    ...state,
    eventsListLoading: false,
    eventsList: [...state?.eventsList, ...payload?.payload.data],
    pageData: payload?.payload.pagy,
  }),
  [`${actions.getEventsList.failure}`]: state => ({
    ...state,
    eventsListLoading: false,
  }),
  [`${actions.addEvents.loading}`]: state => ({
    ...state,
    addEventsLoading: true,
  }),
  [`${actions.addEvents.success}`]: state => ({
    ...state,
    addEventsLoading: false,
  }),
  [`${actions.addEvents.failure}`]: state => ({
    ...state,
    addEventsLoading: false,
  }),
  [`${actions.deleteEvents.loading}`]: state => ({
    ...state,
    deleteEventsLoading: true,
  }),
  [`${actions.deleteEvents.success}`]: state => ({
    ...state,
    deleteEventsLoading: false,
  }),
  [`${actions.deleteEvents.failure}`]: state => ({
    ...state,
    deleteEventsLoading: false,
  }),
  [`${actions.getEventItem.loading}`]: state => ({
    ...state,
    eventItemLoading: true,
  }),
  [`${actions.getEventItem.success}`]: (state, {payload}) => ({
    ...state,
    eventItemLoading: false,
    eventItem: payload?.eventItem,
  }),
  [`${actions.getEventItem.failure}`]: state => ({
    ...state,
    eventItemLoading: false,
  }),
  [`${actions.editEvents.loading}`]: state => ({
    ...state,
    editEventsLoading: true,
  }),
  [`${actions.editEvents.success}`]: state => ({
    ...state,
    editEventsLoading: false,
  }),
  [`${actions.editEvents.failure}`]: state => ({
    ...state,
    editEventsLoading: false,
  }),
  [`${actions.updateContactEventList.loading}`]: state => ({
    ...state,
    refreshListLoading: true,
  }),
  [`${actions.updateContactEventList.success}`]: (state, {payload}) => ({
    ...state,
    refreshListLoading: false,
    eventsList: payload?.updatedEventsList,
    pageData: payload?.pageData,
  }),
  [`${actions.updateContactEventList.failure}`]: state => ({
    ...state,
    refreshListLoading: false,
  }),
  [`${actions.clearEventsList.success}`]: state => ({
    ...state,
    eventsListLoading: false,
    eventsList: [],
    pageData: null,
  }),
});

export const {
  useContext: useEvents,
  Context: EventsContext,
  Provider: EventsProvider,
  TestProvider: TestEventsProvider,
} = createContainer(() => {
  const [{...state}, dispatch] = useReducer(eventsReducer, initialState);

  const getEventsList = useCallback(
    async (contactId: number, pageNumber?: number) => {
      dispatch(actions.getEventsList.loading());
      const user: any = await hydrate(AUTH_KEYS.user);
      await api
        .get<Array<ContactEventProps>>(
          `${user.account_id}/api/contacts/${contactId}/contact_events?page=${
            pageNumber ? pageNumber : 1
          }.json`,
        )
        .then(res => {
          const data = res.data;
          if (data.success === true) {
            dispatch(actions.getEventsList.success({payload: data}));
          } else {
            showErrorMessage(`${data.message}`);
            dispatch(actions.getEventsList.failure());
          }
        })
        .catch(e => {
          showErrorMessage(`${e}`);
          dispatch(actions.getEventsList.failure());
        });
    },
    [],
  );

  const addEvents = useCallback(
    async (
      contactId: number,
      values: {
        api_contact_event: {
          title: string;
          body: string;
          date: string;
          life_event_id: number;
        };
      },
    ) => {
      dispatch(actions.addEvents.loading());
      const user: any = await hydrate(AUTH_KEYS.user);
      await api
        .post(
          `${user.account_id}/api/contacts/${contactId}/contact_events.json`,
          values,
        )
        .then(res => {
          if (res.data.success === true) {
            showSuccessMessage(`${res.data.message}`);
            clearEventsList();
            getEventsList(contactId);
            dispatch(actions.addEvents.success());
            goBack();
          } else {
            showErrorMessage(`${res.data.message}`);
            dispatch(actions.addEvents.failure());
          }
        })
        .catch(error => {
          showErrorMessage(`${error}`);
          dispatch(actions.addEvents.failure());
        });
    },
    [getEventsList],
  );

  const deleteEvents = useCallback(
    async (item, contactId: number) => {
      dispatch(actions.deleteEvents.loading());
      const user: any = await hydrate(AUTH_KEYS.user);
      await api
        .delete(
          `${user.account_id}/api/contacts/${contactId}/contact_events/${item.id}.json`,
        )
        .then(res => {
          if (res.data.success) {
            showSuccessMessage(`${res.data.message}`);
            clearEventsList();
            getEventsList(contactId);
            dispatch(actions.deleteEvents.success());
          } else {
            showErrorMessage(`${res.data.message}`);
            dispatch(actions.deleteEvents.failure());
          }
        })
        .catch(error => {
          showErrorMessage(`${error}`);
          dispatch(actions.deleteEvents.failure());
        });
    },
    [getEventsList],
  );

  const getEventItem = useCallback(
    async (itemId: number, contactId: number) => {
      dispatch(actions.getEventItem.loading());
      const user: any = await hydrate(AUTH_KEYS.user);
      await api
        .get(
          `${user.account_id}/api/contacts/${contactId}/contact_events/${itemId}/edit.json`,
        )
        .then(res => {
          if (res.data.success) {
            const {data} = res.data;
            dispatch(actions.getEventItem.success({eventItem: data}));
          } else {
            showErrorMessage(`${res.data.message}`);
            dispatch(actions.getEventItem.failure());
          }
        })
        .catch(e => {
          showErrorMessage(`${e}`);
          dispatch(actions.getEventItem.failure());
        });
    },
    [],
  );

  const editEvents = useCallback(
    async (
      itemId: number,
      contactId: number,
      values: {
        api_contact_event: {
          title: string;
          body: string;
          date: string;
        };
      },
    ) => {
      dispatch(actions.editEvents.loading());
      const user: any = await hydrate(AUTH_KEYS.user);
      await api
        .patch(
          `${user.account_id}/api/contacts/${contactId}/contact_events/${itemId}.json`,
          values,
        )
        .then(res => {
          if (res.data.success) {
            showSuccessMessage(`${res.data.message}`);
            clearEventsList();
            getEventsList(contactId);
            dispatch(actions.editEvents.success());
            goBack();
          } else {
            showErrorMessage(`${res.data.message}`);
            dispatch(actions.editEvents.failure());
          }
        })
        .catch(error => {
          showErrorMessage(`${error}`);
          dispatch(actions.editEvents.failure());
        });
    },
    [getEventsList],
  );

  const updateContactEventList = useCallback(
    async (contactId: number, pageNumber?: number) => {
      dispatch(actions.updateContactEventList.loading());
      const user: any = await hydrate(AUTH_KEYS.user);
      await api
        .get<Array<ContactEventProps>>(
          `${user.account_id}/api/contacts/${contactId}/contact_events?page=${
            pageNumber ? pageNumber : 1
          }.json`,
        )
        .then(res => {
          const data = res.data;
          if (data.success) {
            dispatch(
              actions.updateContactEventList.success({
                updatedEventsList: data.data,
                pageData: data.pagy,
              }),
            );
          } else {
            showErrorMessage(`${data.message}`);
            dispatch(actions.updateContactEventList.failure());
          }
        })
        .catch(e => {
          showErrorMessage(`${e}`);
          dispatch(actions.updateContactEventList.failure());
        });
    },
    [],
  );

  const clearEventsList = () => {
    dispatch(actions.clearEventsList.success());
  };

  return {
    state: {
      ...state,
    },
    actions: {
      getEventsList,
      addEvents,
      deleteEvents,
      getEventItem,
      editEvents,
      clearEventsList,
      updateContactEventList,
    },
  };
});

export default useEvents;
