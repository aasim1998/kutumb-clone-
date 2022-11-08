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
import {PhoneCallProps} from 'typings/phoneCall.type';

export type PhoneCallStateProps = {
  phoneCallListLoading: boolean;
  refreshListLoading: boolean;
  phoneCallList: Array<PhoneCallProps>;
  pageData: any;
  phoneCallItemLoading: boolean;
  phoneCallItem: any;
  addPhoneCallLoading: boolean;
  editPhoneCallLoading: boolean;
  deletePhoneCallLoading: boolean;
};

const initialState: PhoneCallStateProps = {
  phoneCallListLoading: false,
  refreshListLoading: false,
  phoneCallList: [],
  pageData: null,
  phoneCallItemLoading: false,
  phoneCallItem: {},
  addPhoneCallLoading: false,
  editPhoneCallLoading: false,
  deletePhoneCallLoading: false,
};

const actions = {
  getPhoneCallList: createAsyncActions('GET_PHONE_CALL_LIST'),
  clearPhoneCallList: createAsyncActions('CLEAR_PHONE_CALL_LIST'),
  updatePhoneCallList: createAsyncActions('UPDATE_PHONE_CALL_LIST'),
  getPhoneCallItem: createAsyncActions('GET_PHONE_CALL_ITEM'),
  addPhoneCall: createAsyncActions('ADD_PHONE_CALL'),
  editPhoneCall: createAsyncActions('EDIT_PHONE_CALL'),
  deletePhoneCall: createAsyncActions('DELETE_PHONE_CALL'),
};

const phoneCallReducer = createReducer<PhoneCallStateProps>({
  [`${actions.getPhoneCallList.loading}`]: state => ({
    ...state,
    phoneCallListLoading: true,
  }),
  [`${actions.getPhoneCallList.success}`]: (state, {payload}) => ({
    ...state,
    phoneCallListLoading: false,
    phoneCallList: [...state.phoneCallList, ...payload?.payload.data],
    pageData: payload?.payload.pagy,
  }),
  [`${actions.getPhoneCallList.failure}`]: state => ({
    ...state,
    phoneCallListLoading: false,
  }),
  [`${actions.clearPhoneCallList.success}`]: state => ({
    ...state,
    phoneCallListLoading: false,
    phoneCallList: [],
    pageData: null,
  }),
  [`${actions.updatePhoneCallList.loading}`]: state => ({
    ...state,
    refreshListLoading: true,
  }),
  [`${actions.updatePhoneCallList.success}`]: (state, {payload}) => ({
    ...state,
    refreshListLoading: false,
    phoneCallList: payload?.updatedPhoneCallList,
    pageData: payload?.pageData,
  }),
  [`${actions.updatePhoneCallList.failure}`]: state => ({
    ...state,
    refreshListLoading: false,
  }),
  [`${actions.getPhoneCallItem.loading}`]: state => ({
    ...state,
    phoneCallItemLoading: true,
  }),
  [`${actions.getPhoneCallItem.success}`]: (state, {payload}) => ({
    ...state,
    phoneCallItemLoading: false,
    phoneCallItem: payload?.phoneCallItem,
  }),
  [`${actions.getPhoneCallItem.failure}`]: state => ({
    ...state,
    phoneCallItemLoading: false,
  }),
  [`${actions.addPhoneCall.loading}`]: state => ({
    ...state,
    addPhoneCallLoading: true,
  }),
  [`${actions.addPhoneCall.success}`]: state => ({
    ...state,
    addPhoneCallLoading: false,
  }),
  [`${actions.addPhoneCall.failure}`]: state => ({
    ...state,
    addPhoneCallLoading: false,
  }),
  [`${actions.editPhoneCall.loading}`]: state => ({
    ...state,
    editPhoneCallLoading: true,
  }),
  [`${actions.editPhoneCall.success}`]: (state, {payload}) => ({
    ...state,
    editPhoneCallLoading: false,
    phoneCallList: payload?.updatedPhoneCallList,
  }),
  [`${actions.editPhoneCall.failure}`]: state => ({
    ...state,
    editPhoneCallLoading: false,
  }),
  [`${actions.deletePhoneCall.loading}`]: state => ({
    ...state,
    deletePhoneCallLoading: true,
  }),
  [`${actions.deletePhoneCall.success}`]: (state, {payload}) => ({
    ...state,
    deletePhoneCallLoading: false,
    phoneCallList: payload?.updatedPhoneCallList,
  }),
  [`${actions.deletePhoneCall.failure}`]: state => ({
    ...state,
    deletePhoneCallLoading: false,
  }),
});

export const {
  useContext: usePhoneCall,
  Context: PhoneCallContext,
  Provider: PhoneCallProvider,
  TestProvider: TestPhoneCallProvider,
} = createContainer(() => {
  const [{...state}, dispatch] = useReducer(phoneCallReducer, initialState);

  const clearPhoneCallList = () => {
    dispatch(actions.clearPhoneCallList.success());
  };

  const updatePhoneCallList = useCallback(
    async (contactId: number, pageNumber?: number) => {
      dispatch(actions.updatePhoneCallList.loading());
      const user: any = await hydrate(AUTH_KEYS.user);
      await api
        .get<Array<PhoneCallProps>>(
          `${user.account_id}/api/contacts/${contactId}/phone_calls?page=${
            pageNumber ? pageNumber : 1
          }.json`,
        )
        .then(res => {
          const data = res.data;
          if (data.success) {
            dispatch(
              actions.updatePhoneCallList.success({
                updatedPhoneCallList: data.data,
                pageData: data.pagy,
              }),
            );
          } else {
            showErrorMessage(`${data.message}`);
            dispatch(actions.updatePhoneCallList.failure());
          }
        })
        .catch(e => {
          showErrorMessage(`${e}`);
          dispatch(actions.updatePhoneCallList.failure());
        });
    },
    [],
  );

  const getPhoneCallList = useCallback(
    async (contactId: number, pageNumber?: number) => {
      dispatch(actions.getPhoneCallList.loading());
      const user: any = await hydrate(AUTH_KEYS.user);
      await api
        .get<Array<PhoneCallProps>>(
          `${user.account_id}/api/contacts/${contactId}/phone_calls?page=${
            pageNumber ? pageNumber : 1
          }.json`,
        )
        .then(res => {
          const data = res.data;
          if (data.success === true) {
            dispatch(
              actions.getPhoneCallList.success({
                payload: data,
              }),
            );
          } else {
            showErrorMessage(`${data.message}`);
            dispatch(actions.getPhoneCallList.failure());
          }
        })
        .catch(e => {
          showErrorMessage(`${e}`);
          dispatch(actions.getPhoneCallList.failure());
        });
    },
    [],
  );

  const getPhoneCallItem = useCallback(
    async (itemId: number, contactId: number) => {
      dispatch(actions.getPhoneCallItem.loading());
      const user: any = await hydrate(AUTH_KEYS.user);
      await api
        .get<PhoneCallProps>(
          `${user.account_id}/api/contacts/${contactId}/phone_calls/${itemId}/edit.json`,
        )
        .then(res => {
          const {data} = res.data;
          if (res.data.success) {
            dispatch(actions.getPhoneCallItem.success({phoneCallItem: data}));
          } else {
            showErrorMessage(`${res.data.message}`);
            dispatch(actions.getPhoneCallItem.failure());
          }
        })
        .catch(e => {
          showErrorMessage(`${e}`);
          dispatch(actions.getPhoneCallItem.failure());
        });
    },
    [],
  );

  const addPhoneCall = useCallback(
    async (
      contactId: number,
      values: {api_phone_call: {date: string; body: string; status: string}},
    ) => {
      dispatch(actions.addPhoneCall.loading());
      const user: any = await hydrate(AUTH_KEYS.user);
      await api
        .post<PhoneCallProps>(
          `${user.account_id}/api/contacts/${contactId}/phone_calls.json`,
          values,
        )
        .then(res => {
          const data = res.data;
          if (data.success) {
            showSuccessMessage(`${data.message}`);
            clearPhoneCallList();
            getPhoneCallList(contactId);
            dispatch(actions.addPhoneCall.success());
            goBack();
          } else {
            showErrorMessage(`${data.message}`);
            dispatch(actions.addPhoneCall.failure());
          }
        })
        .catch(e => {
          showErrorMessage(`${e}`);
          dispatch(actions.addPhoneCall.failure());
        });
    },
    [getPhoneCallList],
  );

  const editPhoneCall = useCallback(
    async (
      itemId: number,
      contactId: number,
      values: {api_phone_call: {date: string; body: string; status: string}},
    ) => {
      dispatch(actions.editPhoneCall.loading());
      const user: any = await hydrate(AUTH_KEYS.user);
      await api
        .patch<PhoneCallProps>(
          `${user.account_id}/api/contacts/${contactId}/phone_calls/${itemId}.json`,
          values,
        )
        .then(res => {
          const data = res.data;
          if (data.success) {
            showSuccessMessage(`${data.message}`);
            const {id, body, updated_at, date, status} = data.data;
            const updatedPhoneCallList = state.phoneCallList.map(
              (obj: PhoneCallProps) => {
                if (obj.id === id) {
                  return {...obj, body, updated_at, date, status};
                }
                return obj;
              },
            );
            dispatch(
              actions.editPhoneCall.success({
                updatedPhoneCallList: updatedPhoneCallList,
              }),
            );
            goBack();
          } else {
            showErrorMessage(`${data.message}`);
            dispatch(actions.editPhoneCall.failure());
          }
        })
        .catch(e => {
          showErrorMessage(`${e}`);
          dispatch(actions.editPhoneCall.failure());
        });
    },
    [state.phoneCallList],
  );

  const deletePhoneCall = useCallback(
    async (item, contactId: number) => {
      dispatch(actions.deletePhoneCall.loading());
      const user: any = await hydrate(AUTH_KEYS.user);
      await api
        .delete(
          `${user.account_id}/api/contacts/${contactId}/phone_calls/${item.id}.json`,
        )
        .then(res => {
          const data = res.data;
          if (data.success) {
            showSuccessMessage(`${data.message}`);
            const updatedPhoneCallList = state.phoneCallList.filter(
              obj => obj.id !== item.id,
            );
            dispatch(
              actions.deletePhoneCall.success({
                updatedPhoneCallList: updatedPhoneCallList,
              }),
            );
          } else {
            showErrorMessage(`${data.message}`);
            dispatch(actions.deletePhoneCall.failure());
          }
        })
        .catch(e => {
          showErrorMessage(`${e}`);
          dispatch(actions.deletePhoneCall.failure());
        });
    },
    [state.phoneCallList],
  );

  return {
    state: {
      ...state,
    },
    actions: {
      getPhoneCallList,
      getPhoneCallItem,
      addPhoneCall,
      editPhoneCall,
      deletePhoneCall,
      clearPhoneCallList,
      updatePhoneCallList,
    },
  };
});

export default usePhoneCall;
