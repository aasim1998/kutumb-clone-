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
import {NoteProps} from 'typings/notes.type';

export type NotesStateProps = {
  notesListLoading: boolean;
  pageData: any;
  notesList: Array<NoteProps>;
  noteItemLoading: boolean;
  noteItem: any;
  addNotesLoading: boolean;
  editNotesLoading: boolean;
  deleteNotesLoading: boolean;
};

const initialState: NotesStateProps = {
  notesListLoading: false,
  notesList: [],
  pageData: null,
  addNotesLoading: false,
  noteItemLoading: false,
  noteItem: {},
  editNotesLoading: false,
  deleteNotesLoading: false,
};

const actions = {
  getNotesList: createAsyncActions('GET_NOTES_LIST'),
  clearNotesList: createAsyncActions('CLEAR_NOTES_LIST'),
  getNoteItem: createAsyncActions('GET_NOTE_ITEM'),
  addNotes: createAsyncActions('ADD_NOTES'),
  editNotes: createAsyncActions('EDIT_NOTES'),
  deleteNotes: createAsyncActions('DELETE_NOTES'),
};

const notesReducer = createReducer<NotesStateProps>({
  [`${actions.getNotesList.loading}`]: state => ({
    ...state,
    notesListLoading: true,
  }),
  [`${actions.getNotesList.success}`]: (state, {payload}) => ({
    ...state,
    notesListLoading: false,
    notesList: [...state?.notesList, ...payload?.payload.data],
    pageData: payload?.payload.pagy,
  }),
  [`${actions.getNotesList.failure}`]: state => ({
    ...state,
    notesListLoading: false,
  }),
  [`${actions.getNoteItem.loading}`]: state => ({
    ...state,
    noteItemLoading: true,
  }),
  [`${actions.getNoteItem.success}`]: (state, {payload}) => ({
    ...state,
    noteItemLoading: false,
    noteItem: payload?.noteItem,
  }),
  [`${actions.getNoteItem.failure}`]: state => ({
    ...state,
    noteItemLoading: false,
  }),
  [`${actions.addNotes.loading}`]: state => ({
    ...state,
    addNotesLoading: true,
  }),
  [`${actions.addNotes.success}`]: state => ({
    ...state,
    addNotesLoading: false,
  }),
  [`${actions.addNotes.failure}`]: state => ({
    ...state,
    addNotesLoading: false,
  }),
  [`${actions.editNotes.loading}`]: state => ({
    ...state,
    editNotesLoading: true,
  }),
  [`${actions.editNotes.success}`]: state => ({
    ...state,
    editNotesLoading: false,
  }),
  [`${actions.editNotes.failure}`]: state => ({
    ...state,
    editNotesLoading: false,
  }),
  [`${actions.deleteNotes.loading}`]: state => ({
    ...state,
    deleteNotesLoading: true,
  }),
  [`${actions.deleteNotes.success}`]: state => ({
    ...state,
    deleteNotesLoading: false,
  }),
  [`${actions.deleteNotes.failure}`]: state => ({
    ...state,
    deleteNotesLoading: false,
  }),
  [`${actions.clearNotesList.success}`]: state => ({
    ...state,
    notesListLoading: false,
    notesList: [],
    pageData: null,
  }),
});

export const {
  useContext: useNotes,
  Context: NotesContext,
  Provider: NotesProvider,
  TestProvider: TestNotesProvider,
} = createContainer(() => {
  const [{...state}, dispatch] = useReducer(notesReducer, initialState);

  const getNotesList = useCallback(
    async (contactId: number, pageNumber?: number) => {
      dispatch(actions.getNotesList.loading());
      const user: any = await hydrate(AUTH_KEYS.user);
      await api
        .get<Array<NoteProps>>(
          `${user.account_id}/api/contacts/${contactId}/notes?page=${
            pageNumber ? pageNumber : 1
          }.json`,
        )
        .then(res => {
          const data = res.data;
          if (data.success) {
            dispatch(actions.getNotesList.success({payload: data}));
          } else {
            showErrorMessage(`${data.message}`);
            dispatch(actions.getNotesList.failure());
          }
        })
        .catch(e => {
          showErrorMessage(`${e}`);
          dispatch(actions.getNotesList.failure());
        });
    },
    [],
  );

  const getNoteItem = useCallback(async (itemId: number, contactId: number) => {
    dispatch(actions.getNoteItem.loading());
    const user: any = await hydrate(AUTH_KEYS.user);
    await api
      .get(
        `${user.account_id}/api/contacts/${contactId}/notes/${itemId}/edit.json`,
      )
      .then(res => {
        const {data} = res.data;
        if (res.data.success) {
          dispatch(actions.getNoteItem.success({noteItem: data}));
        } else {
          showErrorMessage(`${res.data.message}`);
          dispatch(actions.getNoteItem.failure());
        }
      })
      .catch(e => {
        showErrorMessage(`${e}`);
        dispatch(actions.getNoteItem.failure());
      });
  }, []);

  const addNotes = useCallback(
    async (
      contactId: number,
      values: {api_note: {title: string; body: string}},
    ) => {
      dispatch(actions.addNotes.loading());
      const user: any = await hydrate(AUTH_KEYS.user);
      await api
        .post(`${user.account_id}/api/contacts/${contactId}/notes.json`, values)
        .then(res => {
          if (res.data.success) {
            showSuccessMessage(`${res.data.message}`);
            clearNotesList();
            getNotesList(contactId);
            dispatch(actions.addNotes.success());
            goBack();
          } else {
            showErrorMessage(`${res.data.message}`);
            dispatch(actions.addNotes.failure());
          }
        })
        .catch(error => {
          showErrorMessage(`${error}`);
          dispatch(actions.addNotes.failure());
        });
    },
    [getNotesList],
  );

  const editNotes = useCallback(
    async (
      itemId: number,
      contactId: number,
      values: {api_note: {title: string; body: string}},
    ) => {
      dispatch(actions.editNotes.loading());
      const user: any = await hydrate(AUTH_KEYS.user);
      await api
        .patch(
          `${user.account_id}/api/contacts/${contactId}/notes/${itemId}.json`,
          values,
        )
        .then(res => {
          if (res.data.success) {
            showSuccessMessage(`${res.data.message}`);
            clearNotesList();
            getNotesList(contactId);
            dispatch(actions.editNotes.success());
            goBack();
          } else {
            showErrorMessage(`${res.data.message}`);
            dispatch(actions.editNotes.failure());
          }
        })
        .catch(error => {
          showErrorMessage(`${error}`);
          dispatch(actions.editNotes.failure());
        });
    },
    [getNotesList],
  );

  const deleteNotes = useCallback(
    async (item, contactId: number) => {
      dispatch(actions.deleteNotes.loading());
      const user: any = await hydrate(AUTH_KEYS.user);
      await api
        .delete(
          `${user.account_id}/api/contacts/${contactId}/notes/${item.id}.json`,
        )
        .then(res => {
          if (res.data.success) {
            showSuccessMessage(`${res.data.message}`);
            clearNotesList();
            getNotesList(contactId);
            dispatch(actions.deleteNotes.success());
          } else {
            showErrorMessage(`${res.data.message}`);
            dispatch(actions.deleteNotes.failure());
          }
        })
        .catch(error => {
          showErrorMessage(`${error}`);
          dispatch(actions.deleteNotes.failure());
        });
    },
    [getNotesList],
  );

  const clearNotesList = () => {
    dispatch(actions.clearNotesList.success());
  };

  return {
    state: {
      ...state,
    },
    actions: {
      getNotesList,
      getNoteItem,
      addNotes,
      editNotes,
      deleteNotes,
      clearNotesList,
    },
  };
});

export default useNotes;
