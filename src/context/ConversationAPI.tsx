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
import {ConversationProps} from 'typings/Conversation.type';

export type ConversationStateProps = {
  conversationListLoading: boolean;
  refreshListLoading: boolean;
  conversationList: Array<ConversationProps>;
  pageData: any;
  conversationItemLoading: boolean;
  conversationItem: any;
  addConversationLoading: boolean;
  editConversationLoading: boolean;
  deleteConversationLoading: boolean;
};

const initialState: ConversationStateProps = {
  conversationListLoading: false,
  refreshListLoading: false,
  conversationList: [],
  pageData: null,
  conversationItemLoading: false,
  conversationItem: {},
  addConversationLoading: false,
  editConversationLoading: false,
  deleteConversationLoading: false,
};

const actions = {
  getConversationList: createAsyncActions('GET_CONVERSATION_LIST'),
  clearConversationList: createAsyncActions('CLEAR_CONVERSATION_LIST'),
  updateConversationList: createAsyncActions('UPDATE_CONVERSATION_LIST'),
  getConversationItem: createAsyncActions('GET_CONVERSATION_ITEM'),
  addConversation: createAsyncActions('ADD_CONVERSATION'),
  editConversation: createAsyncActions('EDIT_CONVERSATION'),
  deleteConversation: createAsyncActions('DELETE_CONVERSATION'),
};

const ConversationReducer = createReducer<ConversationStateProps>({
  [`${actions.getConversationList.loading}`]: state => ({
    ...state,
    conversationListLoading: true,
  }),
  [`${actions.getConversationList.success}`]: (state, {payload}) => ({
    ...state,
    conversationListLoading: false,
    conversationList: [...state.conversationList, ...payload?.payload.data],
    pageData: payload?.payload.pagy,
  }),
  [`${actions.getConversationList.failure}`]: state => ({
    ...state,
    conversationListLoading: false,
  }),
  [`${actions.clearConversationList.success}`]: state => ({
    ...state,
    conversationListLoading: false,
    conversationList: [],
    pageData: null,
  }),
  [`${actions.updateConversationList.loading}`]: state => ({
    ...state,
    refreshListLoading: true,
  }),
  [`${actions.updateConversationList.success}`]: (state, {payload}) => ({
    ...state,
    refreshListLoading: false,
    conversationList: payload?.updatedConversationList,
    pageData: payload?.pageData,
  }),
  [`${actions.updateConversationList.failure}`]: state => ({
    ...state,
    refreshListLoading: false,
  }),
  [`${actions.getConversationItem.loading}`]: state => ({
    ...state,
    conversationItemLoading: true,
  }),
  [`${actions.getConversationItem.success}`]: (state, {payload}) => ({
    ...state,
    conversationItemLoading: false,
    conversationItem: payload?.conversationItem,
  }),
  [`${actions.getConversationItem.failure}`]: state => ({
    ...state,
    conversationItemLoading: false,
  }),
  [`${actions.addConversation.loading}`]: state => ({
    ...state,
    addConversationLoading: true,
  }),
  [`${actions.addConversation.success}`]: state => ({
    ...state,
    addConversationLoading: false,
  }),
  [`${actions.addConversation.failure}`]: state => ({
    ...state,
    addConversationLoading: false,
  }),
  [`${actions.editConversation.loading}`]: state => ({
    ...state,
    editConversationLoading: true,
  }),
  [`${actions.editConversation.success}`]: (state, {payload}) => ({
    ...state,
    editConversationLoading: false,
    conversationList: payload?.updatedConversationList,
  }),
  [`${actions.editConversation.failure}`]: state => ({
    ...state,
    editConversationLoading: false,
  }),
  [`${actions.deleteConversation.loading}`]: state => ({
    ...state,
    deleteConversationLoading: true,
  }),
  [`${actions.deleteConversation.success}`]: (state, {payload}) => ({
    ...state,
    deleteConversationLoading: false,
    conversationList: payload?.updatedConversationList,
  }),
  [`${actions.deleteConversation.failure}`]: state => ({
    ...state,
    deleteConversationLoading: false,
  }),
});

export const {
  useContext: useConversation,
  Context: ConversationContext,
  Provider: ConversationProvider,
  TestProvider: TestConversationProvider,
} = createContainer(() => {
  const [{...state}, dispatch] = useReducer(ConversationReducer, initialState);

  const clearConversationList = () => {
    dispatch(actions.clearConversationList.success());
  };

  const updateConversationList = useCallback(
    async (contactId: number, pageNumber?: number) => {
      dispatch(actions.updateConversationList.loading());
      const user: any = await hydrate(AUTH_KEYS.user);
      await api
        .get<Array<ConversationProps>>(
          `${user.account_id}/api/contacts/${contactId}/conversations?page=${
            pageNumber ? pageNumber : 1
          }.json`,
        )
        .then(res => {
          const data = res.data;
          if (data.success) {
            dispatch(
              actions.updateConversationList.success({
                updatedConversationList: data.data,
                pageData: data.pagy,
              }),
            );
          } else {
            showErrorMessage(`${data.message}`);
            dispatch(actions.updateConversationList.failure());
          }
        })
        .catch(e => {
          showErrorMessage(`${e}`);
          dispatch(actions.updateConversationList.failure());
        });
    },
    [],
  );

  const getConversationList = useCallback(
    async (contactId: number, pageNumber?: number) => {
      dispatch(actions.getConversationList.loading());
      const user: any = await hydrate(AUTH_KEYS.user);
      await api
        .get<Array<ConversationProps>>(
          `${user.account_id}/api/contacts/${contactId}/conversations?page=${
            pageNumber ? pageNumber : 1
          }.json`,
        )
        .then(res => {
          const data = res.data;
          if (data.success === true) {
            dispatch(
              actions.getConversationList.success({
                payload: data,
              }),
            );
          } else {
            showErrorMessage(`${data.message}`);
            dispatch(actions.getConversationList.failure());
          }
        })
        .catch(e => {
          showErrorMessage(`${e}`);
          dispatch(actions.getConversationList.failure());
        });
    },
    [],
  );

  const getConversationItem = useCallback(
    async (itemId: number, contactId: number) => {
      dispatch(actions.getConversationItem.loading());
      const user: any = await hydrate(AUTH_KEYS.user);
      await api
        .get<ConversationProps>(
          `${user.account_id}/api/contacts/${contactId}/conversations/${itemId}/edit.json`,
        )
        .then(res => {
          const {data} = res.data;
          if (res.data.success) {
            dispatch(
              actions.getConversationItem.success({conversationItem: data}),
            );
          } else {
            showErrorMessage(`${res.data.message}`);
            dispatch(actions.getConversationItem.failure());
          }
        })
        .catch(e => {
          showErrorMessage(`${e}`);
          dispatch(actions.getConversationItem.failure());
        });
    },
    [],
  );

  const addConversation = useCallback(
    async (
      contactId: number,
      values: {
        api_conversation: {field_id: string; date: string; body: string};
      },
    ) => {
      dispatch(actions.addConversation.loading());
      const user: any = await hydrate(AUTH_KEYS.user);
      await api
        .post<ConversationProps>(
          `${user.account_id}/api/contacts/${contactId}/conversations.json`,
          values,
        )
        .then(res => {
          const data = res.data;
          if (data.success) {
            showSuccessMessage(`${data.message}`);
            clearConversationList();
            getConversationList(contactId);
            dispatch(actions.addConversation.success());
            goBack();
          } else {
            showErrorMessage(`${data.message}`);
            dispatch(actions.addConversation.failure());
          }
        })
        .catch(e => {
          showErrorMessage(`${e}`);
          dispatch(actions.addConversation.failure());
        });
    },
    [getConversationList],
  );

  const editConversation = useCallback(
    async (
      itemId: number,
      contactId: number,
      values: {
        api_conversation: {field_id: string; date: string; body: string};
      },
    ) => {
      dispatch(actions.editConversation.loading());
      const user: any = await hydrate(AUTH_KEYS.user);
      await api
        .patch<ConversationProps>(
          `${user.account_id}/api/contacts/${contactId}/conversations/${itemId}.json`,
          values,
        )
        .then(res => {
          const data = res.data;
          if (data.success) {
            showSuccessMessage(`${data.message}`);
            const {id, body, updated_at, date, field_id} = data.data;
            const updatedConversationList = state.conversationList.map(
              (obj: ConversationProps) => {
                if (obj.id === id) {
                  return {...obj, body, updated_at, date, field_id};
                }
                return obj;
              },
            );
            dispatch(
              actions.editConversation.success({
                updatedConversationList: updatedConversationList,
              }),
            );
            goBack();
          } else {
            showErrorMessage(`${data.message}`);
            dispatch(actions.editConversation.failure());
          }
        })
        .catch(e => {
          showErrorMessage(`${e}`);
          dispatch(actions.editConversation.failure());
        });
    },
    [state.conversationList],
  );

  const deleteConversation = useCallback(
    async (item, contactId: number) => {
      dispatch(actions.deleteConversation.loading());
      const user: any = await hydrate(AUTH_KEYS.user);
      await api
        .delete(
          `${user.account_id}/api/contacts/${contactId}/conversations/${item.id}.json`,
        )
        .then(res => {
          const data = res.data;
          if (data.success) {
            showSuccessMessage(`${data.message}`);
            const updatedConversationList = state.conversationList.filter(
              obj => obj.id !== item.id,
            );
            dispatch(
              actions.deleteConversation.success({
                updatedConversationList: updatedConversationList,
              }),
            );
          } else {
            showErrorMessage(`${data.message}`);
            dispatch(actions.deleteConversation.failure());
          }
        })
        .catch(e => {
          showErrorMessage(`${e}`);
          dispatch(actions.deleteConversation.failure());
        });
    },
    [state.conversationList],
  );

  return {
    state: {
      ...state,
    },
    actions: {
      getConversationList,
      getConversationItem,
      addConversation,
      editConversation,
      deleteConversation,
      clearConversationList,
      updateConversationList,
    },
  };
});

export default useConversation;
