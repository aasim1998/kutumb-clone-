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
import {GiftProps} from 'typings/gifts.type';

export type GiftsStateProps = {
  pageData: any;
  giftsList: Array<GiftProps>;
  giftsListLoading: boolean;
  addGiftsLoading: boolean;
  deleteGiftsLoading: boolean;
  giftItem: any;
  giftItemLoading: boolean;
  editGiftsLoading: boolean;
};

const initialState: GiftsStateProps = {
  pageData: null,
  giftsList: [],
  giftsListLoading: false,
  addGiftsLoading: false,
  deleteGiftsLoading: false,
  giftItem: {},
  giftItemLoading: false,
  editGiftsLoading: false,
};

const actions = {
  clearGiftsList: createAsyncActions('CLEAR_GIFTS_LIST'),
  getGiftsList: createAsyncActions('GET_GIFTS_LIST'),
  addGifts: createAsyncActions('ADD_GIFTS'),
  deleteGifts: createAsyncActions('DELETE_GIFTS'),
  getGiftItem: createAsyncActions('GET_GIFT_ITEM'),
  editGifts: createAsyncActions('EDIT_GIFTS'),
};

const giftsReducer = createReducer<GiftsStateProps>({
  [`${actions.getGiftsList.loading}`]: state => ({
    ...state,
    giftsListLoading: true,
  }),
  [`${actions.getGiftsList.success}`]: (state, {payload}) => ({
    ...state,
    giftsListLoading: false,
    giftsList: [...state?.giftsList, ...payload?.payload.data],
    pageData: payload?.payload.pagy,
  }),
  [`${actions.getGiftsList.failure}`]: state => ({
    ...state,
    giftsListLoading: false,
  }),
  [`${actions.getGiftItem.loading}`]: state => ({
    ...state,
    giftItemLoading: true,
  }),
  [`${actions.getGiftItem.success}`]: (state, {payload}) => ({
    ...state,
    giftItemLoading: false,
    giftItem: payload?.giftItem,
  }),
  [`${actions.getGiftItem.failure}`]: state => ({
    ...state,
    giftItemLoading: false,
  }),
  [`${actions.addGifts.loading}`]: state => ({
    ...state,
    addGiftsLoading: true,
  }),
  [`${actions.addGifts.success}`]: state => ({
    ...state,
    addGiftsLoading: false,
  }),
  [`${actions.addGifts.failure}`]: state => ({
    ...state,
    addGiftsLoading: false,
  }),
  [`${actions.editGifts.loading}`]: state => ({
    ...state,
    editGiftsLoading: true,
  }),
  [`${actions.editGifts.success}`]: state => ({
    ...state,
    editGiftsLoading: false,
  }),
  [`${actions.editGifts.failure}`]: state => ({
    ...state,
    editGiftsLoading: false,
  }),
  [`${actions.deleteGifts.loading}`]: state => ({
    ...state,
    deleteGiftsLoading: true,
  }),
  [`${actions.deleteGifts.success}`]: state => ({
    ...state,
    deleteGiftsLoading: false,
  }),
  [`${actions.deleteGifts.failure}`]: state => ({
    ...state,
    deleteGiftsLoading: false,
  }),
  [`${actions.clearGiftsList.success}`]: state => ({
    ...state,
    giftsListLoading: false,
    giftsList: [],
    pageData: null,
  }),
});

export const {
  useContext: useGifts,
  Context: GiftsContext,
  Provider: GiftsProvider,
  TestProvider: TestGiftsProvider,
} = createContainer(() => {
  const [{...state}, dispatch] = useReducer(giftsReducer, initialState);

  const clearGiftsList = () => {
    dispatch(actions.clearGiftsList.success());
  };

  const getGiftsList = useCallback(
    async (contactId: number, pageNumber?: number) => {
      dispatch(actions.getGiftsList.loading());
      const user: any = await hydrate(AUTH_KEYS.user);
      await api
        .get<Array<GiftProps>>(
          `${user.account_id}/api/contacts/${contactId}/gifts?page=${
            pageNumber ? pageNumber : 1
          }.json`,
        )
        .then(res => {
          const data = res.data;
          if (data.success) {
            dispatch(actions.getGiftsList.success({payload: data}));
          } else {
            showErrorMessage(`${data.message}`);
            dispatch(actions.getGiftsList.failure());
          }
        })
        .catch(e => {
          showErrorMessage(`${e}`);
          dispatch(actions.getGiftsList.failure());
        });
    },
    [],
  );

  const addGifts = useCallback(
    async (
      contactId: number,
      values: {
        api_gift: {name: string; body: string; status: string; date: string};
      },
    ) => {
      dispatch(actions.addGifts.loading());
      const user: any = await hydrate(AUTH_KEYS.user);
      await api
        .post(`${user.account_id}/api/contacts/${contactId}/gifts.json`, values)
        .then(res => {
          if (res.data.success) {
            showSuccessMessage(`${res.data.message}`);
            clearGiftsList();
            getGiftsList(contactId);
            dispatch(actions.addGifts.success());
            goBack();
          } else {
            showErrorMessage(`${res.data.message}`);
            dispatch(actions.addGifts.failure());
          }
        })
        .catch(error => {
          showErrorMessage(`${error}`);
          dispatch(actions.addGifts.failure());
        });
    },
    [getGiftsList],
  );

  const deleteGifts = useCallback(
    async (item, contactId: number) => {
      dispatch(actions.deleteGifts.loading());
      const user: any = await hydrate(AUTH_KEYS.user);
      await api
        .delete(
          `${user.account_id}/api/contacts/${contactId}/gifts/${item.id}.json`,
        )
        .then(res => {
          showSuccessMessage(`${res.data.message}`);
          clearGiftsList();
          getGiftsList(contactId);
          dispatch(actions.deleteGifts.success());
        })
        .catch(error => {
          showErrorMessage(`${error}`);
          dispatch(actions.deleteGifts.failure());
        });
    },
    [getGiftsList],
  );

  const getGiftItem = useCallback(async (itemId: number, contactId: number) => {
    dispatch(actions.getGiftItem.loading());
    const user: any = await hydrate(AUTH_KEYS.user);
    await api
      .get(
        `${user.account_id}/api/contacts/${contactId}/gifts/${itemId}/edit.json`,
      )
      .then(res => {
        const data = res.data;
        if (data.success) {
          dispatch(actions.getGiftItem.success({giftItem: data.data}));
        } else {
          showErrorMessage(`${data.message}`);
          dispatch(actions.getGiftItem.failure());
        }
      })
      .catch(e => {
        showErrorMessage(`${e}`);
        dispatch(actions.getGiftItem.failure());
      });
  }, []);

  const editGifts = useCallback(
    async (
      itemId: number,
      contactId: number,
      values: {
        api_gift: {name: string; body: string; status: string; date: string};
      },
    ) => {
      dispatch(actions.editGifts.loading());
      const user: any = await hydrate(AUTH_KEYS.user);
      await api
        .patch(
          `${user.account_id}/api/contacts/${contactId}/gifts/${itemId}.json`,
          values,
        )
        .then(res => {
          if (res.data.success) {
            showSuccessMessage(`${res.data.message}`);
            clearGiftsList();
            getGiftsList(contactId);
            dispatch(actions.editGifts.success());
            goBack();
          } else {
            showErrorMessage(`${res.data.message}`);
            dispatch(actions.editGifts.failure());
          }
        })
        .catch(error => {
          showErrorMessage(`${error}`);
          dispatch(actions.editGifts.failure());
        });
    },
    [getGiftsList],
  );

  return {
    state: {
      ...state,
    },
    actions: {
      clearGiftsList,
      getGiftsList,
      addGifts,
      deleteGifts,
      getGiftItem,
      editGifts,
    },
  };
});

export default useGifts;
