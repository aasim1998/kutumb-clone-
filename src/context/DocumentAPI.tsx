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
import {DocumentProps} from 'typings/document.type';

export type DocumentStateProps = {
  documentListLoading: boolean;
  refreshListLoading: boolean;
  documentList: Array<DocumentProps>;
  pageData: any;
  documentItemLoading: boolean;
  documentItem: any;
  addDocumentLoading: boolean;
  editDocumentLoading: boolean;
  deleteDocumentLoading: boolean;
};

const initialState: DocumentStateProps = {
  documentListLoading: false,
  refreshListLoading: false,
  documentList: [],
  pageData: null,
  documentItemLoading: false,
  documentItem: {},
  addDocumentLoading: false,
  editDocumentLoading: false,
  deleteDocumentLoading: false,
};

const actions = {
  getDocumentList: createAsyncActions('GET_DOCUMENT_LIST'),
  clearDocumentList: createAsyncActions('CLEAR_DOCUMENT_LIST'),
  updateDocumentList: createAsyncActions('UPDATE_DOCUMENT_LIST'),
  getDocumentItem: createAsyncActions('GET_DOCUMENT_ITEM'),
  addDocument: createAsyncActions('ADD_DOCUMENTL'),
  editDocument: createAsyncActions('EDIT_DOCUMENT'),
  deleteDocument: createAsyncActions('DELETE_DOCUMENT'),
};

const documentReducer = createReducer<DocumentStateProps>({
  [`${actions.getDocumentList.loading}`]: state => ({
    ...state,
    documentListLoading: true,
  }),
  [`${actions.getDocumentList.success}`]: (state, {payload}) => ({
    ...state,
    documentListLoading: false,
    documentList: [...state.documentList, ...payload?.payload.data],
    pageData: payload?.payload.pagy,
  }),
  [`${actions.getDocumentList.failure}`]: state => ({
    ...state,
    documentListLoading: false,
  }),
  [`${actions.clearDocumentList.success}`]: state => ({
    ...state,
    documentListLoading: false,
    documentList: [],
    pageData: null,
  }),
  [`${actions.updateDocumentList.loading}`]: state => ({
    ...state,
    refreshListLoading: true,
  }),
  [`${actions.updateDocumentList.success}`]: (state, {payload}) => ({
    ...state,
    refreshListLoading: false,
    documentList: payload?.updateddocumentList,
    pageData: payload?.pageData,
  }),
  [`${actions.updateDocumentList.failure}`]: state => ({
    ...state,
    refreshListLoading: false,
  }),
  [`${actions.getDocumentItem.loading}`]: state => ({
    ...state,
    documentItemLoading: true,
  }),
  [`${actions.getDocumentItem.success}`]: (state, {payload}) => ({
    ...state,
    documentItemLoading: false,
    documentItem: payload?.documentItem,
  }),
  [`${actions.getDocumentItem.failure}`]: state => ({
    ...state,
    documentItemLoading: false,
  }),
  [`${actions.addDocument.loading}`]: state => ({
    ...state,
    addDocumentLoading: true,
  }),
  [`${actions.addDocument.success}`]: state => ({
    ...state,
    addDocumentLoading: false,
  }),
  [`${actions.addDocument.failure}`]: state => ({
    ...state,
    addDocumentLoading: false,
  }),
  [`${actions.editDocument.loading}`]: state => ({
    ...state,
    editDocumentLoading: true,
  }),
  [`${actions.editDocument.success}`]: (state, {payload}) => ({
    ...state,
    editDocumentLoading: false,
    documentList: payload?.updateddocumentList,
  }),
  [`${actions.editDocument.failure}`]: state => ({
    ...state,
    editDocumentLoading: false,
  }),
  [`${actions.deleteDocument.loading}`]: state => ({
    ...state,
    deleteDocumentLoading: true,
  }),
  [`${actions.deleteDocument.success}`]: (state, {payload}) => ({
    ...state,
    deleteDocumentLoading: false,
    documentList: payload?.updateddocumentList,
  }),
  [`${actions.deleteDocument.failure}`]: state => ({
    ...state,
    deleteDocumentLoading: false,
  }),
});

export const {
  useContext: useDocument,
  Context: DocumentContext,
  Provider: DocumentProvider,
  TestProvider: TestDocumentProvider,
} = createContainer(() => {
  const [{...state}, dispatch] = useReducer(documentReducer, initialState);

  const clearDocumentList = () => {
    dispatch(actions.clearDocumentList.success());
  };

  const updateDocumentList = useCallback(
    async (contactId: number, pageNumber?: number) => {
      dispatch(actions.updateDocumentList.loading());
      const user: any = await hydrate(AUTH_KEYS.user);
      await api
        .get<Array<DocumentProps>>(
          `${user.account_id}/api/contacts/${contactId}/documents?page=${
            pageNumber ? pageNumber : 1
          }.json`,
        )
        .then(res => {
          const data = res.data;
          if (data.success) {
            dispatch(
              actions.updateDocumentList.success({
                updateddocumentList: data.data,
                pageData: data.pagy,
              }),
            );
          } else {
            showErrorMessage(`${data.message}`);
            dispatch(actions.updateDocumentList.failure());
          }
        })
        .catch(e => {
          showErrorMessage(`${e}`);
          dispatch(actions.updateDocumentList.failure());
        });
    },
    [],
  );

  const getDocumentList = useCallback(
    async (contactId: number, pageNumber?: number) => {
      dispatch(actions.getDocumentList.loading());
      const user: any = await hydrate(AUTH_KEYS.user);
      await api
        .get<Array<DocumentProps>>(
          `${user.account_id}/api/contacts/${contactId}/documents?page=${
            pageNumber ? pageNumber : 1
          }.json`,
        )
        .then(res => {
          const data = res.data;
          if (data.success === true) {
            dispatch(
              actions.getDocumentList.success({
                payload: data,
              }),
            );
          } else {
            showErrorMessage(`${data.message}`);
            dispatch(actions.getDocumentList.failure());
          }
        })
        .catch(e => {
          showErrorMessage(`${e}`);
          dispatch(actions.getDocumentList.failure());
        });
    },
    [],
  );

  const getDocumentItem = useCallback(
    async (itemId: number, contactId: number) => {
      dispatch(actions.getDocumentItem.loading());
      const user: any = await hydrate(AUTH_KEYS.user);
      await api
        .get<DocumentProps>(
          `${user.account_id}/api/contacts/${contactId}/documents/${itemId}/edit.json`,
        )
        .then(res => {
          const {data} = res.data;
          if (res.data.success) {
            dispatch(actions.getDocumentItem.success({documentItem: data}));
          } else {
            showErrorMessage(`${res.data.message}`);
            dispatch(actions.getDocumentItem.failure());
          }
        })
        .catch(e => {
          showErrorMessage(`${e}`);
          dispatch(actions.getDocumentItem.failure());
        });
    },
    [],
  );

  const addDocument = useCallback(
    async (
      contactId: number,
      values: {
        api_document: {filename: string; comments: string; link: string};
      },
    ) => {
      dispatch(actions.addDocument.loading());
      const user: any = await hydrate(AUTH_KEYS.user);
      await api
        .post<DocumentProps>(
          `${user.account_id}/api/contacts/${contactId}/documents.json`,
          values,
        )
        .then(res => {
          const data = res.data;
          if (data.success) {
            showSuccessMessage(`${data.message}`);
            clearDocumentList();
            getDocumentList(contactId);
            dispatch(actions.addDocument.success());
            goBack();
          } else {
            showErrorMessage(`${data.message}`);
            dispatch(actions.addDocument.failure());
          }
        })
        .catch(e => {
          showErrorMessage(`${e}`);
          dispatch(actions.addDocument.failure());
        });
    },
    [getDocumentList],
  );

  const editDocument = useCallback(
    async (
      itemId: number,
      contactId: number,
      values: {api_document: {comments: string; link: string}},
    ) => {
      dispatch(actions.editDocument.loading());
      const user: any = await hydrate(AUTH_KEYS.user);
      await api
        .patch<DocumentProps>(
          `${user.account_id}/api/contacts/${contactId}/documents/${itemId}.json`,
          values,
        )
        .then(res => {
          const data = res.data;
          if (data.success) {
            showSuccessMessage(`${data.message}`);
            const {id, link, updated_at, comments} = data.data;
            const updateddocumentList = state.documentList.map(
              (obj: DocumentProps) => {
                if (obj.id === id) {
                  return {...obj, link, updated_at, comments};
                }
                return obj;
              },
            );
            dispatch(
              actions.editDocument.success({
                updateddocumentList: updateddocumentList,
              }),
            );
            goBack();
          } else {
            showErrorMessage(`${data.message}`);
            dispatch(actions.editDocument.failure());
          }
        })
        .catch(e => {
          showErrorMessage(`${e}`);
          dispatch(actions.editDocument.failure());
        });
    },
    [state.documentList],
  );

  const deleteDocument = useCallback(
    async (item, contactId: number) => {
      dispatch(actions.deleteDocument.loading());
      const user: any = await hydrate(AUTH_KEYS.user);
      await api
        .delete(
          `${user.account_id}/api/contacts/${contactId}/documents/${item.id}.json`,
        )
        .then(res => {
          const data = res.data;
          if (data.success) {
            showSuccessMessage(`${data.message}`);
            const updateddocumentList = state.documentList.filter(
              obj => obj.id !== item.id,
            );
            dispatch(
              actions.deleteDocument.success({
                updateddocumentList: updateddocumentList,
              }),
            );
          } else {
            showErrorMessage(`${data.message}`);
            dispatch(actions.deleteDocument.failure());
          }
        })
        .catch(e => {
          showErrorMessage(`${e}`);
          dispatch(actions.deleteDocument.failure());
        });
    },
    [state.documentList],
  );

  return {
    state: {
      ...state,
    },
    actions: {
      getDocumentList,
      getDocumentItem,
      addDocument,
      editDocument,
      deleteDocument,
      clearDocumentList,
      updateDocumentList,
    },
  };
});

export default useDocument;
