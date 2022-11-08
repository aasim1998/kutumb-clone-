import {useCallback, useReducer} from 'react';
import {
  createContainer,
  createReducer,
  createAsyncActions,
} from 'utils/context';
import {api} from 'utils/api/api';
import {JournalProps} from 'typings/journal.types';
import {AUTH_KEYS, hydrate} from 'utils/storage';
import {showErrorMessage, showSuccessMessage} from 'utils/toast';
import {goBack} from 'services/NavigationService';

export type JournalState = {
  journalListLoading: boolean;
  journalList: Array<JournalProps>;
  pageData: any;
  journalItemLoading: boolean;
  journalItem: any;
  getEditJournalItemLoading: boolean;
  editJournalItem: any;
  editJournalLoading: boolean;
  addJournalLoading: boolean;
  deleteJournalLoading: boolean;

  journalCommentItemLoading: boolean;
  journalCommentItem: any;
  addJournalCommentLoading: boolean;
  editJournalCommentLoading: boolean;
  deleteJournalCommentLoading: boolean;
};

const initialState: JournalState = {
  journalListLoading: false,
  journalList: [],
  pageData: null,
  journalItemLoading: false,
  journalItem: {},
  getEditJournalItemLoading: false,
  editJournalItem: {},
  editJournalLoading: false,
  addJournalLoading: false,
  deleteJournalLoading: false,

  journalCommentItemLoading: false,
  journalCommentItem: {},
  addJournalCommentLoading: false,
  editJournalCommentLoading: false,
  deleteJournalCommentLoading: false,
};

const actions = {
  getJournalList: createAsyncActions('GET_JOURNAL_LIST'),
  clearJournalList: createAsyncActions('CLEAR_JOURNAL_LIST'),
  getJournalItem: createAsyncActions('GET_JOURNAL_ITEM'),
  getEditJournalItem: createAsyncActions('GET_EDIT_JOURNAL_ITEM'),
  editJournal: createAsyncActions('EDIT_JOURNAL'),
  addJournal: createAsyncActions('ADD_JOURNAL'),
  deleteJournal: createAsyncActions('DELETE_JOURNAL'),

  getJournalCommentItem: createAsyncActions('GET_JOURNAL_COMMENT_ITEM'),
  editJournalComment: createAsyncActions('EDIT_JOURNAL_COMMENT'),
  addJournalComment: createAsyncActions('ADD_JOURNAL_COMMENT'),
  deleteJournalComment: createAsyncActions('DELETE_JOURNAL_COMMENT'),
};

const journalReducer = createReducer<JournalState>({
  [`${actions.clearJournalList.success}`]: state => ({
    ...state,
    journalListLoading: false,
    journalList: [],
    pageData: null,
  }),
  [`${actions.getJournalList.loading}`]: state => ({
    ...state,
    journalListLoading: true,
  }),
  [`${actions.getJournalList.success}`]: (state, {payload}) => ({
    ...state,
    journalListLoading: false,
    journalList: [...state?.journalList, ...payload?.payload.data],
    pageData: payload?.payload.pagy,
  }),
  [`${actions.getJournalList.failure}`]: state => ({
    ...state,
    journalListLoading: false,
  }),

  [`${actions.getJournalItem.loading}`]: state => ({
    ...state,
    journalItemLoading: true,
  }),
  [`${actions.getJournalItem.success}`]: (state, {payload}) => ({
    ...state,
    journalItem: payload?.journalItem,
    journalItemLoading: false,
  }),
  [`${actions.getJournalItem.failure}`]: state => ({
    ...state,
    journalItemLoading: false,
  }),

  [`${actions.addJournal.loading}`]: state => ({
    ...state,
    addJournalLoading: true,
  }),
  [`${actions.addJournal.success}`]: state => ({
    ...state,
    addJournalLoading: false,
  }),
  [`${actions.addJournal.failure}`]: state => ({
    ...state,
    addJournalLoading: false,
  }),

  [`${actions.getEditJournalItem.loading}`]: state => ({
    ...state,
    getEditJournalItemLoading: true,
  }),
  [`${actions.getEditJournalItem.success}`]: (state, {payload}) => ({
    ...state,
    editJournalItem: payload?.editJournalItem,
    getEditJournalItemLoading: false,
  }),
  [`${actions.getEditJournalItem.failure}`]: state => ({
    ...state,
    getEditJournalItemLoading: false,
  }),

  [`${actions.deleteJournal.loading}`]: state => ({
    ...state,
    deleteJournalLoading: true,
  }),
  [`${actions.deleteJournal.success}`]: state => ({
    ...state,
    deleteJournalLoading: false,
  }),
  [`${actions.deleteJournal.failure}`]: state => ({
    ...state,
    deleteJournalLoading: false,
  }),

  [`${actions.editJournal.loading}`]: state => ({
    ...state,
    editJournalLoading: true,
  }),
  [`${actions.editJournal.success}`]: state => ({
    ...state,
    editJournalLoading: false,
  }),
  [`${actions.editJournal.failure}`]: state => ({
    ...state,
    editJournalLoading: false,
  }),

  [`${actions.getJournalCommentItem.loading}`]: state => ({
    ...state,
    journalCommentItemLoading: true,
  }),
  [`${actions.getJournalCommentItem.success}`]: (state, {payload}) => ({
    ...state,
    journalCommentItem: payload?.journalCommentItem,
    journalCommentItemLoading: false,
  }),
  [`${actions.getJournalCommentItem.failure}`]: state => ({
    ...state,
    journalCommentItemLoading: false,
  }),

  [`${actions.addJournalComment.loading}`]: state => ({
    ...state,
    addJournalCommentLoading: true,
  }),
  [`${actions.addJournalComment.success}`]: state => ({
    ...state,
    addJournalCommentLoading: false,
  }),
  [`${actions.addJournalComment.failure}`]: state => ({
    ...state,
    addJournalCommentLoading: false,
  }),

  [`${actions.editJournalComment.loading}`]: state => ({
    ...state,
    editJournalCommentLoading: true,
  }),
  [`${actions.editJournalComment.success}`]: state => ({
    ...state,
    editJournalCommentLoading: false,
  }),
  [`${actions.editJournalComment.failure}`]: state => ({
    ...state,
    editJournalCommentLoading: false,
  }),

  [`${actions.deleteJournalComment.loading}`]: state => ({
    ...state,
    deleteJournalCommentLoading: true,
  }),
  [`${actions.deleteJournalComment.success}`]: state => ({
    ...state,
    deleteJournalCommentLoading: false,
  }),
  [`${actions.deleteJournalComment.failure}`]: state => ({
    ...state,
    deleteJournalCommentLoading: false,
  }),
});

export const {
  useContext: useJournal,
  Context: JournalContext,
  Provider: JournalProvider,
  TestProvider: TestJournalProvider,
} = createContainer(() => {
  const [{...state}, dispatch] = useReducer(journalReducer, initialState);

  const clearJournalList = () => {
    dispatch(actions.clearJournalList.success());
  };

  const getJournalList = useCallback(async (pageNumber?: number) => {
    dispatch(actions.getJournalList.loading());
    const userID: any = await hydrate(AUTH_KEYS.user);
    try {
      const {data} = await api.get<Array<JournalProps>>(
        `${userID.account_id}/api/journals?page=${
          pageNumber ? pageNumber : 1
        }.json`,
      );
      if (data.success) {
        dispatch(
          actions.getJournalList.success({
            payload: data,
          }),
        );
      } else {
        showErrorMessage(`${data.message}`);
        dispatch(actions.getJournalList.failure());
      }
    } catch (e) {
      dispatch(actions.getJournalList.failure());
    }
  }, []);

  const getJournalItem = useCallback(async id => {
    dispatch(actions.getJournalItem.loading());
    const userID: any = await hydrate(AUTH_KEYS.user);
    try {
      const {data} = await api.get(
        `${userID.account_id}/api/journals/${id}.json`,
      );
      if (data.success) {
        dispatch(
          actions.getJournalItem.success({
            journalItem: data.data,
          }),
        );
      } else {
        showErrorMessage(`${data.message}`);
        dispatch(actions.getJournalItem.failure());
      }
    } catch (e) {
      dispatch(actions.getJournalItem.failure());
    }
  }, []);

  const addJournal = useCallback(
    async (values: {api_journal: {title: string; body: string}}) => {
      dispatch(actions.addJournal.loading());
      const user: any = await hydrate(AUTH_KEYS.user);
      try {
        const {data} = await api.post(
          `${user.account_id}/api/journals.json`,
          values,
        );
        if (data.success === false) {
          showErrorMessage(`${data.message}`);
          dispatch(actions.addJournal.failure());
        } else {
          showSuccessMessage(`${data.message}`);
          dispatch(actions.addJournal.success());
          clearJournalList();
          getJournalList();
          goBack();
        }
      } catch (e) {
        showErrorMessage(`${e}`);
        dispatch(actions.addJournal.failure());
      }
    },
    [getJournalList],
  );

  const getEditJournalItem = useCallback(async (id: number) => {
    dispatch(actions.getEditJournalItem.loading());
    const userID: any = await hydrate(AUTH_KEYS.user);
    try {
      const {data} = await api.get(
        `${userID.account_id}/api/journals/${id}/edit.json`,
      );
      if (data.success) {
        dispatch(
          actions.getEditJournalItem.success({
            editJournalItem: data.data,
          }),
        );
      } else {
        showErrorMessage(`${data.message}`);
        dispatch(actions.getEditJournalItem.failure());
      }
    } catch (e) {
      dispatch(actions.getEditJournalItem.failure());
    }
  }, []);

  const editJournal = useCallback(
    async (id, values) => {
      dispatch(actions.editJournal.loading());
      const userID: any = await hydrate(AUTH_KEYS.user);
      try {
        const {data} = await api.patch(
          `${userID.account_id}/api/journals/${id}.json`,
          values,
        );
        if (data.success === false) {
          showErrorMessage(`${data.message}`);
          dispatch(actions.editJournal.failure());
        } else {
          showSuccessMessage(`${data.message}`);
          dispatch(actions.editJournal.success());
          goBack();
          clearJournalList();
          getJournalList();
        }
      } catch (e) {
        showErrorMessage(`${e}`);
        dispatch(actions.editJournal.failure());
      }
    },
    [getJournalList],
  );

  const deleteJournal = useCallback(
    async id => {
      dispatch(actions.deleteJournal.loading());
      const userID: any = await hydrate(AUTH_KEYS.user);
      try {
        const {data} = await api.delete(
          `${userID.account_id}/api/journals/${id}.json`,
        );
        if (data.success === false) {
          showErrorMessage(`${data.message}`);
          dispatch(actions.deleteJournal.failure());
        } else {
          showSuccessMessage(`${data.message}`);
          dispatch(actions.deleteJournal.success());
          goBack();
          clearJournalList();
          getJournalList();
        }
      } catch (e) {
        showErrorMessage(`${e}`);
        dispatch(actions.deleteJournal.failure());
      }
    },
    [getJournalList],
  );

  const getJournalCommentItem = useCallback(async id => {
    dispatch(actions.getJournalCommentItem.loading());
    const userID: any = await hydrate(AUTH_KEYS.user);
    try {
      const {data} = await api.get(
        `${userID.account_id}/api/journal_comments/${id}/edit.json`,
      );
      if (data.success) {
        dispatch(
          actions.getJournalCommentItem.success({
            journalCommentItem: data.data,
          }),
        );
      } else {
        showErrorMessage(`${data.message}`);
        dispatch(actions.getJournalCommentItem.failure());
      }
    } catch (e) {
      dispatch(actions.getJournalCommentItem.failure());
    }
  }, []);

  const addJournalComment = useCallback(
    async (values, id) => {
      dispatch(actions.addJournalComment.loading());
      const user: any = await hydrate(AUTH_KEYS.user);
      try {
        const {data} = await api.post(
          `${user.account_id}/api/journal_comments.json`,
          values,
        );
        if (data.success === false) {
          showErrorMessage(`${data.message}`);
          dispatch(actions.addJournalComment.failure());
        } else {
          showSuccessMessage(`${data.message}`);
          dispatch(actions.addJournalComment.success());
          getJournalItem(id);
          goBack();
        }
      } catch (e) {
        showErrorMessage(`${e}`);
        dispatch(actions.addJournalComment.failure());
      }
    },
    [getJournalItem],
  );

  const editJournalComment = useCallback(
    async (id, values) => {
      const updatedValue = {
        api_comment: {
          title: values.api_comment.title,
          journal_id: values.api_comment.journal_id,
        },
      };
      dispatch(actions.editJournalComment.loading());
      const userID: any = await hydrate(AUTH_KEYS.user);
      try {
        const {data} = await api.patch(
          `${userID.account_id}/api/journal_comments/${id}.json`,
          updatedValue,
        );
        if (data.success === false) {
          showErrorMessage(`${data.message}`);
          dispatch(actions.editJournalComment.failure());
        } else {
          showSuccessMessage(`${data.message}`);
          dispatch(actions.editJournalComment.success());
          goBack();
          getJournalItem(values.api_comment.journal_id);
        }
      } catch (e) {
        showErrorMessage(`${e}`);
        dispatch(actions.editJournalComment.failure());
      }
    },
    [getJournalItem],
  );

  const deleteJournalComment = useCallback(
    async (id, item) => {
      dispatch(actions.deleteJournalComment.loading());
      const userID: any = await hydrate(AUTH_KEYS.user);
      try {
        const {data} = await api.delete(
          `${userID.account_id}/api/journal_comments/${item.id}.json`,
        );
        if (data.success === false) {
          showErrorMessage(`${data.message}`);
          dispatch(actions.deleteJournalComment.failure());
        } else {
          showSuccessMessage(`${data.message}`);
          dispatch(actions.deleteJournalComment.success());
          getJournalItem(id);
        }
      } catch (e) {
        showErrorMessage(`${e}`);
        dispatch(actions.deleteJournalComment.failure());
      }
    },
    [getJournalItem],
  );

  return {
    state: {
      ...state,
    },
    actions: {
      clearJournalList,
      getJournalList,
      getJournalItem,
      getEditJournalItem,
      addJournal,
      editJournal,
      deleteJournal,
      getJournalCommentItem,
      addJournalComment,
      editJournalComment,
      deleteJournalComment,
    },
  };
});
