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
import {DebtProps} from 'typings/debts.type';

export type DebtsStateProps = {
  pageData: any;
  debtsList: Array<DebtProps>;
  debtsListLoading: boolean;
  addDebtsLoading: boolean;
  deleteDebtsLoading: boolean;
  debtItem: any;
  debtItemLoading: boolean;
  editDebtsLoading: boolean;
};

const initialState: DebtsStateProps = {
  pageData: null,
  debtsList: [],
  debtsListLoading: false,
  addDebtsLoading: false,
  deleteDebtsLoading: false,
  debtItem: {},
  debtItemLoading: false,
  editDebtsLoading: false,
};

const actions = {
  clearDebtsList: createAsyncActions('CLEAR_DEBTS_LIST'),
  getDebtsList: createAsyncActions('GET_DEBTS_LIST'),
  addDebts: createAsyncActions('ADD_DEBTS'),
  deleteDebts: createAsyncActions('DELETE_DEBTS'),
  getDebtItem: createAsyncActions('GET_DEBT_ITEM'),
  editDebts: createAsyncActions('EDIT_DEBTS'),
};

const debtsReducer = createReducer<DebtsStateProps>({
  [`${actions.getDebtsList.loading}`]: state => ({
    ...state,
    debtsListLoading: true,
  }),
  [`${actions.getDebtsList.success}`]: (state, {payload}) => ({
    ...state,
    debtsListLoading: false,
    debtsList: [...state?.debtsList, ...payload?.payload.data],
    pageData: payload?.payload.pagy,
  }),
  [`${actions.getDebtsList.failure}`]: state => ({
    ...state,
    debtsListLoading: false,
  }),
  [`${actions.addDebts.loading}`]: state => ({
    ...state,
    addDebtsLoading: true,
  }),
  [`${actions.addDebts.success}`]: state => ({
    ...state,
    addDebtsLoading: false,
  }),
  [`${actions.addDebts.failure}`]: state => ({
    ...state,
    addDebtsLoading: false,
  }),
  [`${actions.deleteDebts.loading}`]: state => ({
    ...state,
    deleteDebtsLoading: true,
  }),
  [`${actions.deleteDebts.success}`]: state => ({
    ...state,
    deleteDebtsLoading: false,
  }),
  [`${actions.deleteDebts.failure}`]: state => ({
    ...state,
    deleteDebtsLoading: false,
  }),
  [`${actions.getDebtItem.loading}`]: state => ({
    ...state,
    debtItemLoading: true,
  }),
  [`${actions.getDebtItem.success}`]: (state, {payload}) => ({
    ...state,
    debtItemLoading: false,
    debtItem: payload?.debtItem,
  }),
  [`${actions.getDebtItem.failure}`]: state => ({
    ...state,
    debtItemLoading: false,
  }),
  [`${actions.editDebts.loading}`]: state => ({
    ...state,
    editDebtsLoading: true,
  }),
  [`${actions.editDebts.success}`]: state => ({
    ...state,
    editDebtsLoading: false,
  }),
  [`${actions.editDebts.failure}`]: state => ({
    ...state,
    editDebtsLoading: false,
  }),
  [`${actions.clearDebtsList.success}`]: state => ({
    ...state,
    debtsListLoading: false,
    debtsList: [],
    pageData: null,
  }),
});

export const {
  useContext: useDebts,
  Context: DebtsContext,
  Provider: DebtsProvider,
  TestProvider: TestDebtsProvider,
} = createContainer(() => {
  const [{...state}, dispatch] = useReducer(debtsReducer, initialState);

  const clearDebtsList = () => {
    dispatch(actions.clearDebtsList.success());
  };

  const getDebtsList = useCallback(
    async (contactId: number, pageNumber?: number) => {
      dispatch(actions.getDebtsList.loading());
      const user: any = await hydrate(AUTH_KEYS.user);
      await api
        .get<Array<DebtProps>>(
          `${user.account_id}/api/contacts/${contactId}/debts?page=${
            pageNumber ? pageNumber : 1
          }.json`,
        )
        .then(res => {
          const data = res.data;
          if (data.success) {
            dispatch(actions.getDebtsList.success({payload: data}));
          } else {
            showErrorMessage(`${data.message}`);
            dispatch(actions.getDebtsList.failure());
          }
        })
        .catch(error => {
          showErrorMessage(`${error}`);
          dispatch(actions.getDebtsList.failure());
        });
    },
    [],
  );

  const addDebts = useCallback(
    async (
      contactId: number,
      values: {
        api_debt: {
          title: string;
          amount: string;
          owed_by: string;
          due_date: string;
        };
      },
    ) => {
      dispatch(actions.addDebts.loading());
      const user: any = await hydrate(AUTH_KEYS.user);
      await api
        .post(`${user.account_id}/api/contacts/${contactId}/debts.json`, values)
        .then(res => {
          if (res.data.success) {
            showSuccessMessage(`${res.data.message}`);
            clearDebtsList();
            getDebtsList(contactId);
            dispatch(actions.addDebts.success());
            goBack();
          } else {
            showErrorMessage(`${res.data.message}`);
            dispatch(actions.addDebts.failure());
          }
        })
        .catch(error => {
          showErrorMessage(`${error}`);
          dispatch(actions.addDebts.failure());
        });
    },
    [getDebtsList],
  );

  const deleteDebts = useCallback(
    async (item, contactId: number) => {
      dispatch(actions.deleteDebts.loading());
      const user: any = await hydrate(AUTH_KEYS.user);
      await api
        .delete(
          `${user.account_id}/api/contacts/${contactId}/debts/${item.id}.json`,
        )
        .then(res => {
          if (res.data.success) {
            showSuccessMessage(`${res.data.message}`);
            clearDebtsList();
            getDebtsList(contactId);
            dispatch(actions.deleteDebts.success());
          } else {
            showErrorMessage(`${res.data.message}`);
            dispatch(actions.deleteDebts.failure());
          }
        })
        .catch(error => {
          showErrorMessage(`${error}`);
          dispatch(actions.deleteDebts.failure());
        });
    },
    [getDebtsList],
  );

  const getDebtItem = useCallback(async (itemId: number, contactId: number) => {
    dispatch(actions.getDebtItem.loading());
    const user: any = await hydrate(AUTH_KEYS.user);
    await api
      .get(
        `${user.account_id}/api/contacts/${contactId}/debts/${itemId}/edit.json`,
      )
      .then(res => {
        if (res.data.success) {
          const {data} = res.data;
          dispatch(actions.getDebtItem.success({debtItem: data}));
        } else {
          showErrorMessage(`${res.data.message}`);
          dispatch(actions.getDebtItem.failure());
        }
      })
      .catch(e => {
        showErrorMessage(`${e}`);
        dispatch(actions.getDebtItem.failure());
      });
  }, []);

  const editDebts = useCallback(
    async (
      itemId: number,
      contactId: number,
      values: {
        api_debt: {
          title: string;
          amount: string;
          owed_by: string;
          due_date: string;
        };
      },
    ) => {
      dispatch(actions.editDebts.loading());
      const user: any = await hydrate(AUTH_KEYS.user);
      await api
        .patch(
          `${user.account_id}/api/contacts/${contactId}/debts/${itemId}.json`,
          values,
        )
        .then(res => {
          if (res.data.success) {
            showSuccessMessage(`${res.data.message}`);
            clearDebtsList();
            getDebtsList(contactId);
            dispatch(actions.editDebts.success());
            goBack();
          } else {
            showErrorMessage(`${res.data.message}`);
            dispatch(actions.editDebts.failure());
          }
        })
        .catch(error => {
          showErrorMessage(`${error}`);
          dispatch(actions.editDebts.failure());
        });
    },
    [getDebtsList],
  );

  return {
    state: {
      ...state,
    },
    actions: {
      clearDebtsList,
      getDebtsList,
      addDebts,
      deleteDebts,
      getDebtItem,
      editDebts,
    },
  };
});

export default useDebts;
