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
import {RelativesProps} from 'typings/relatives.type';
import {RelativeContactProps} from 'typings/relativeContact.type';

export type RelativeStateProps = {
  relativesList: Array<RelativesProps>;
  pageData: any;
  relativesListLoading: boolean;
  addRelativesLoading: boolean;
  deleteRelativesLoading: boolean;
  relativeContactList: Array<RelativeContactProps>;
  relativeItem: any;
  relativeItemLoading: boolean;
  editRelativesLoading: boolean;
};

const initialState: RelativeStateProps = {
  relativesList: [],
  pageData: null,
  relativesListLoading: false,
  addRelativesLoading: false,
  deleteRelativesLoading: false,
  relativeContactList: [],
  relativeItem: {},
  relativeItemLoading: false,
  editRelativesLoading: false,
};

const actions = {
  getRelativesList: createAsyncActions('GET_RELATIVES_LIST'),
  addRelatives: createAsyncActions('ADD_RELATIVES'),
  deleteRelatives: createAsyncActions('DELETE_RELATIVES'),
  getRelativesContact: createAsyncActions('GET_RELATIVES_CONTACT'),
  getRelativeItem: createAsyncActions('GET_RELATIVE_ITEM'),
  editRelatives: createAsyncActions('EDIT_RELATIVES'),
};

const relativesReducer = createReducer<RelativeStateProps>({
  [`${actions.getRelativesList.loading}`]: state => ({
    ...state,
    relativesListLoading: true,
  }),
  [`${actions.getRelativesList.success}`]: (state, {payload}) => ({
    ...state,
    relativesListLoading: false,
    relativesList: payload?.payload.data,
    pageData: payload?.payload.pagy,
  }),
  [`${actions.getRelativesList.failure}`]: state => ({
    ...state,
    relativesListLoading: false,
  }),
  [`${actions.addRelatives.loading}`]: state => ({
    ...state,
    addRelativesLoading: true,
  }),
  [`${actions.addRelatives.success}`]: state => ({
    ...state,
    addRelativesLoading: false,
  }),
  [`${actions.addRelatives.failure}`]: state => ({
    ...state,
    addRelativesLoading: false,
  }),
  [`${actions.deleteRelatives.loading}`]: state => ({
    ...state,
    deleteRelativesLoading: true,
  }),
  [`${actions.deleteRelatives.success}`]: state => ({
    ...state,
    deleteRelativesLoading: false,
  }),
  [`${actions.deleteRelatives.failure}`]: state => ({
    ...state,
    deleteRelativesLoading: false,
  }),
  [`${actions.getRelativesContact.loading}`]: state => ({
    ...state,
  }),
  [`${actions.getRelativesContact.success}`]: (state, {payload}) => ({
    ...state,
    relativeContactList: payload?.relativeContactList,
  }),
  [`${actions.getRelativesContact.failure}`]: state => ({
    ...state,
  }),
  [`${actions.getRelativeItem.loading}`]: state => ({
    ...state,
    relativeItemLoading: true,
  }),
  [`${actions.getRelativeItem.success}`]: (state, {payload}) => ({
    ...state,
    relativeItemLoading: false,
    relativeItem: payload?.relativeItem,
  }),
  [`${actions.getRelativeItem.failure}`]: state => ({
    ...state,
    relativeItemLoading: false,
  }),
  [`${actions.editRelatives.loading}`]: state => ({
    ...state,
    editRelativesLoading: true,
  }),
  [`${actions.editRelatives.success}`]: state => ({
    ...state,
    editRelativesLoading: false,
  }),
  [`${actions.editRelatives.failure}`]: state => ({
    ...state,
    editRelativesLoading: false,
  }),
});

export const {
  useContext: useRelatives,
  Context: RelativesContext,
  Provider: RelativesProvider,
  TestProvider: TestRelativesProvider,
} = createContainer(() => {
  const [{...state}, dispatch] = useReducer(relativesReducer, initialState);

  const getRelativesList = useCallback(async (contactId: number) => {
    dispatch(actions.getRelativesList.loading());
    const user: any = await hydrate(AUTH_KEYS.user);
    await api
      .get<Array<RelativesProps>>(
        `${user.account_id}/api/contacts/${contactId}/relatives.json`,
      )
      .then(res => {
        const data = res.data;
        if (data.success) {
          dispatch(actions.getRelativesList.success({payload: data}));
        } else {
          showErrorMessage(`${data.message}`);
          dispatch(actions.getRelativesList.failure());
        }
      })
      .catch(error => {
        showErrorMessage(`${error}`);
        dispatch(actions.getRelativesList.failure());
      });
  }, []);

  const addRelatives = useCallback(
    async (
      contactId: number,
      values: {
        api_relative: {
          first_contact_id: number;
          contact_id: any;
          relation_id: string;
        };
      },
    ) => {
      dispatch(actions.addRelatives.loading());
      const user: any = await hydrate(AUTH_KEYS.user);
      await api
        .post(
          `${user.account_id}/api/contacts/${contactId}/relatives.json`,
          values,
        )
        .then(res => {
          if (res.data.success) {
            showSuccessMessage(`${res.data.message}`);
            getRelativesList(contactId);
            dispatch(actions.addRelatives.success());
            goBack();
          } else {
            showErrorMessage(`${res.data.message}`);
            dispatch(actions.addRelatives.failure());
          }
        })
        .catch(error => {
          showErrorMessage(`${error}`);
          dispatch(actions.addRelatives.failure());
        });
    },
    [getRelativesList],
  );

  const deleteRelatives = useCallback(
    async (item, contactId: number) => {
      dispatch(actions.deleteRelatives.loading());
      const user: any = await hydrate(AUTH_KEYS.user);
      await api
        .delete(
          `${user.account_id}/api/contacts/${contactId}/relatives/${item.id}.json`,
        )
        .then(res => {
          if (res.data.success) {
            showSuccessMessage(`${res.data.message}`);
            getRelativesList(contactId);
            dispatch(actions.deleteRelatives.success());
          } else {
            showErrorMessage(`${res.data.message}`);
            dispatch(actions.deleteRelatives.failure());
          }
        })
        .catch(error => {
          showErrorMessage(`${error}`);
          dispatch(actions.deleteRelatives.failure());
        });
    },
    [getRelativesList],
  );

  const getRelativesContact = useCallback(
    async (contactId: number, text: string) => {
      dispatch(actions.getRelativesContact.loading());
      const user: any = await hydrate(AUTH_KEYS.user);
      await api
        .get<Array<RelativeContactProps>>(
          `${user.account_id}/api/search/relative?q=${text}&profile=${contactId}.json`,
        )
        .then(res => {
          if (res.data.success) {
            const {data} = res.data;
            dispatch(
              actions.getRelativesContact.success({relativeContactList: data}),
            );
          } else {
            showErrorMessage(`${res.data.message}`);
            dispatch(actions.getRelativesContact.failure());
          }
        })
        .catch(error => {
          showErrorMessage(`${error}`);
          dispatch(actions.getRelativesContact.failure());
        });
    },
    [],
  );

  const getRelativeItem = useCallback(
    async (itemId: number, contactId: number) => {
      dispatch(actions.getRelativeItem.loading());
      const user: any = await hydrate(AUTH_KEYS.user);
      await api
        .get(
          `${user.account_id}/api/contacts/${contactId}/relatives/${itemId}/edit.json`,
        )
        .then(res => {
          if (res?.data.success) {
            const {data} = res?.data;
            dispatch(actions.getRelativeItem.success({relativeItem: data}));
          } else {
            showErrorMessage(`${res.data.message}`);
            dispatch(actions.getRelativeItem.failure());
          }
        })
        .catch(e => {
          showErrorMessage(`${e}`);
          dispatch(actions.getRelativeItem.failure());
        });
    },
    [],
  );

  const editRelatives = useCallback(
    async (
      itemId: number,
      contactId: number,
      values: {
        api_relative: {
          first_contact_id: number;
          contact_id: any;
          relation_id: string;
        };
      },
    ) => {
      dispatch(actions.editRelatives.loading());
      const user: any = await hydrate(AUTH_KEYS.user);
      await api
        .patch(
          `${user.account_id}/api/contacts/${contactId}/relatives/${itemId}.json`,
          values,
        )
        .then(res => {
          if (res.data.success) {
            showSuccessMessage(`${res.data.message}`);
            getRelativesList(contactId);
            dispatch(actions.editRelatives.success());
            goBack();
          } else {
            showErrorMessage(`${res.data.message}`);
            dispatch(actions.editRelatives.failure());
          }
        })
        .catch(error => {
          showErrorMessage(`${error}`);
          dispatch(actions.editRelatives.failure());
        });
    },
    [getRelativesList],
  );

  return {
    state: {
      ...state,
    },
    actions: {
      getRelativesList,
      addRelatives,
      deleteRelatives,
      getRelativesContact,
      getRelativeItem,
      editRelatives,
    },
  };
});

export default useRelatives;
