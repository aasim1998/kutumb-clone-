import {useCallback, useReducer} from 'react';
import {
  createContainer,
  createReducer,
  createAsyncActions,
} from 'utils/context';
import {api} from 'utils/api/api';
import {ContactProps} from 'typings/contact.type';
import {AUTH_KEYS, hydrate} from 'utils/storage';
import {showErrorMessage, showSuccessMessage} from 'utils/toast';
import {ContactTimelineProps} from 'typings/contactTimeline.type';
import {goBack, navigate} from 'services/NavigationService';
import {ArchivedContactProps} from 'typings/archivedContact.type';
import {RestoreContactProps} from 'typings/archivedContact.type';

export type ContactState = {
  contactsListLoading?: boolean;
  contactList: Array<ContactProps>;
  contactPageData: any;
  contactItemLoading: boolean;
  contactItem: any;
  relativeList: any;
  editContactItemLoading: boolean;
  editContactItem: any;
  editContactLoading?: boolean;
  contactTimelineLoading: boolean;
  contactTimelineList: Array<ContactTimelineProps>;
  contactTimelinePageData: any;
  archivedContactList: Array<ArchivedContactProps>;
  archivedPageData: any;
  archivedContactsListLoading?: boolean;
  addContactLoading: boolean;
  deleteContactLoading: boolean;
  restoreContactLoading: boolean;
  favoriteContactItem: any;
};

const initialState: ContactState = {
  contactsListLoading: false,
  contactList: [],
  contactPageData: null,
  contactItemLoading: false,
  contactItem: {},
  relativeList: [],
  editContactItemLoading: false,
  editContactItem: {},
  editContactLoading: false,
  contactTimelineLoading: false,
  contactTimelineList: [],
  contactTimelinePageData: null,
  archivedContactList: [],
  archivedPageData: null,
  archivedContactsListLoading: false,
  addContactLoading: false,
  deleteContactLoading: false,
  restoreContactLoading: false,
  favoriteContactItem: {},
};

const actions = {
  getContactsList: createAsyncActions('GET_CONTACTS_LIST'),
  clearContactsList: createAsyncActions('CLEAR_CONTACTS_LIST'),
  getContactItem: createAsyncActions('GET_CONTACT_ITEM'),
  getEditContactItem: createAsyncActions('GET_EDIT_CONTACT_ITEM'),
  editContact: createAsyncActions('EDIT_CONTACT'),
  addContact: createAsyncActions('ADD_CONTACT'),
  archiveContact: createAsyncActions('ARCHIVE_CONTACT'),
  getContactTimeline: createAsyncActions('GET_CONTACT_TIMELINE'),
  clearContactTimeline: createAsyncActions('CLEAR_CONTACT_TIMELINE'),
  getArchivedContactsList: createAsyncActions('GET_ARCHIVED_CONTACTS_LIST'),
  clearArchivedContactsList: createAsyncActions('CLEAR_ARCHIVED_CONTACTS_LIST'),
  deleteContact: createAsyncActions('DELETE_CONTACT'),
  restoreContact: createAsyncActions('RESTORE_CONTACT'),
  setFavorite: createAsyncActions('SET_FAVORITE'),
};

const contactReducer = createReducer<ContactState>({
  [`${actions.getContactsList.loading}`]: state => ({
    ...state,
    contactsListLoading: true,
  }),
  [`${actions.getContactsList.success}`]: (state, {payload}) => ({
    ...state,
    contactsListLoading: false,
    contactList: [...state?.contactList, ...payload?.payload.data],
    contactPageData: payload?.payload.pagy,
  }),
  [`${actions.getContactsList.failure}`]: state => ({
    ...state,
    contactsListLoading: false,
  }),
  [`${actions.clearContactsList.success}`]: state => ({
    ...state,
    contactsListLoading: false,
    contactList: [],
    contactPageData: null,
  }),
  [`${actions.getContactItem.loading}`]: state => ({
    ...state,
    contactItemLoading: true,
  }),
  [`${actions.getContactItem.success}`]: (state, {payload}) => ({
    ...state,
    contactItemLoading: false,
    contactItem: payload?.payload.data,
    relativeList: payload?.payload.relaives,
  }),
  [`${actions.getContactItem.failure}`]: state => ({
    ...state,
    contactItemLoading: false,
  }),
  [`${actions.getEditContactItem.loading}`]: state => ({
    ...state,
    editContactItemLoading: true,
  }),
  [`${actions.getEditContactItem.success}`]: (state, {payload}) => ({
    ...state,
    editContactItemLoading: false,
    editContactItem: payload?.editContactItem,
  }),
  [`${actions.getEditContactItem.failure}`]: state => ({
    ...state,
    editContactItemLoading: false,
  }),
  [`${actions.editContact.loading}`]: state => ({
    ...state,
    editContactLoading: true,
  }),
  [`${actions.editContact.success}`]: state => ({
    ...state,
    editContactLoading: false,
  }),
  [`${actions.editContact.failure}`]: state => ({
    ...state,
    editContactLoading: false,
  }),

  [`${actions.getContactTimeline.loading}`]: state => ({
    ...state,
    contactTimelineLoading: true,
  }),
  [`${actions.getContactTimeline.success}`]: (state, {payload}) => ({
    ...state,
    contactTimelineLoading: false,
    contactTimelineList: [
      ...state?.contactTimelineList,
      ...payload?.payload.data,
    ],
    contactTimelinePageData: payload?.payload.pagy,
  }),
  [`${actions.getContactTimeline.failure}`]: state => ({
    ...state,
    contactTimelineLoading: false,
  }),
  [`${actions.clearContactTimeline.success}`]: state => ({
    ...state,
    contactTimelineLoading: false,
    contactTimelineList: [],
    contactTimelinePageData: null,
  }),
  [`${actions.getArchivedContactsList.loading}`]: state => ({
    ...state,
    archivedContactsListLoading: true,
  }),
  [`${actions.getArchivedContactsList.success}`]: (state, {payload}) => ({
    ...state,
    archivedContactsListLoading: false,
    archivedContactList: [
      ...state?.archivedContactList,
      ...payload?.payload.data,
    ],
    archivedPageData: payload?.payload.pagy,
  }),
  [`${actions.getArchivedContactsList.failure}`]: state => ({
    ...state,
    archivedContactsListLoading: false,
  }),
  [`${actions.clearArchivedContactsList.success}`]: state => ({
    ...state,
    archivedContactsListLoading: false,
    archivedContactList: [],
    archivedPageData: null,
  }),
  [`${actions.addContact.loading}`]: state => ({
    ...state,
    addContactLoading: true,
  }),
  [`${actions.addContact.success}`]: state => ({
    ...state,
    addContactLoading: false,
  }),
  [`${actions.addContact.failure}`]: state => ({
    ...state,
    addContactLoading: false,
  }),
  [`${actions.deleteContact.loading}`]: state => ({
    ...state,
    deleteContactLoading: true,
  }),
  [`${actions.deleteContact.success}`]: state => ({
    ...state,
    deleteContactLoading: false,
  }),
  [`${actions.deleteContact.failure}`]: state => ({
    ...state,
    deleteContactLoading: false,
  }),
  [`${actions.restoreContact.loading}`]: state => ({
    ...state,
    restoreContactLoading: true,
  }),
  [`${actions.restoreContact.success}`]: state => ({
    ...state,
    restoreContactLoading: false,
  }),
  [`${actions.restoreContact.failure}`]: state => ({
    ...state,
    restoreContactLoading: false,
  }),
  [`${actions.setFavorite.loading}`]: state => ({
    ...state,
  }),
  [`${actions.setFavorite.success}`]: (state, {payload}) => ({
    ...state,
    favoriteContactItem: payload?.payload.data,
  }),
  [`${actions.setFavorite.failure}`]: state => ({
    ...state,
  }),
});

export const {
  useContext: useContact,
  Context: ContactContext,
  Provider: ContactProvider,
  TestProvider: TestContactProvider,
} = createContainer(() => {
  const [{...state}, dispatch] = useReducer(contactReducer, initialState);

  const getContactsList = useCallback(async (pageNumber?: number) => {
    dispatch(actions.getContactsList.loading());
    const userID: any = await hydrate(AUTH_KEYS.user);
    try {
      const {data} = await api.get<Array<ContactProps>>(
        `${userID.account_id}/api/contacts?page=${
          pageNumber ? pageNumber : 1
        }.json`,
      );
      dispatch(
        actions.getContactsList.success({
          payload: data,
        }),
      );
    } catch (e) {
      dispatch(actions.getContactsList.failure());
    }
  }, []);

  const getContactItem = useCallback(async id => {
    dispatch(actions.getContactItem.loading());
    const userID: any = await hydrate(AUTH_KEYS.user);
    try {
      const {data} = await api.get(
        `${userID.account_id}/api/contacts/${id}.json`,
      );
      if (data.success) {
        dispatch(
          actions.getContactItem.success({
            payload: data,
          }),
        );
      } else {
        showErrorMessage(`${data.message}`);
        dispatch(actions.getContactItem.failure());
      }
    } catch (e) {
      showErrorMessage(`${e}`);
      dispatch(actions.getContactItem.failure());
    }
  }, []);

  const getEditContactItem = useCallback(async id => {
    dispatch(actions.getEditContactItem.loading());
    const userID: any = await hydrate(AUTH_KEYS.user);
    try {
      const {data} = await api.get(
        `${userID.account_id}/api/contacts/${id}/edit.json`,
      );
      if (data.success) {
        dispatch(
          actions.getEditContactItem.success({
            editContactItem: data.data,
          }),
        );
      } else {
        showErrorMessage(`${data.message}`);
        dispatch(actions.getEditContactItem.failure());
      }
    } catch (e) {
      showErrorMessage(`${e}`);
      dispatch(actions.getEditContactItem.failure());
    }
  }, []);

  const editContact = useCallback(
    async (id, values) => {
      dispatch(actions.editContact.loading());
      const userID: any = await hydrate(AUTH_KEYS.user);
      try {
        const {data} = await api.patch(
          `${userID.account_id}/api/contacts/${id}.json`,
          values,
        );
        if (data.success) {
          showSuccessMessage(`${data.message}`);
          dispatch(actions.editContact.success());
          clearContactsList();
          getContactsList();
          goBack();
        } else {
          showErrorMessage(`${data.message}`);
          dispatch(actions.editContact.failure());
        }
      } catch (e) {
        showErrorMessage(`${e}`);
        dispatch(actions.editContact.failure());
      }
    },
    [getContactsList],
  );

  const clearContactsList = () => {
    dispatch(actions.clearContactsList.success());
  };

  const addContact = useCallback(
    async (values, navigation) => {
      dispatch(actions.addContact.loading());
      const userID: any = await hydrate(AUTH_KEYS.user);
      try {
        const {data} = await api.post<Array<ContactProps>>(
          `${userID.account_id}/api/contacts.json`,
          values,
        );
        if (data.success === false) {
          showErrorMessage(`${data.message}`);
          dispatch(actions.addContact.failure());
        } else {
          clearContactsList();
          getContactsList();
          dispatch(actions.addContact.success());
          showSuccessMessage(`${data.message}`);
          navigation.goBack();
        }
      } catch (e) {
        dispatch(actions.addContact.failure());
        showErrorMessage(`${e}`);
      }
    },
    [getContactsList],
  );

  const archiveContact = useCallback(
    async values => {
      const userID: any = await hydrate(AUTH_KEYS.user);
      try {
        const {data} = await api.get<Array<ContactProps>>(
          `${userID.account_id}/api/archive/contact/${values.id}.json`,
        );
        clearContactsList();
        getContactsList();
        showSuccessMessage(`${data.message}`);
      } catch (e) {
        dispatch(actions.getContactsList.failure());
        showErrorMessage(`${e}`);
      }
    },
    [getContactsList],
  );

  const getContactTimeline = useCallback(
    async (id: number, pageNumber?: number) => {
      dispatch(actions.getContactTimeline.loading());
      const userID: any = await hydrate(AUTH_KEYS.user);
      try {
        const {data} = await api.get<Array<ContactTimelineProps>>(
          `${userID.account_id}/api/contacts/${id}/timeline?page=${
            pageNumber ? pageNumber : 1
          }.json`,
        );
        if (data.success) {
          dispatch(
            actions.getContactTimeline.success({
              payload: data,
            }),
          );
        } else {
          showErrorMessage(`${data.message}`);
          dispatch(actions.getContactTimeline.failure());
        }
      } catch (e) {
        showErrorMessage(`${e}`);
        dispatch(actions.getContactTimeline.failure());
      }
    },
    [],
  );

  const clearContactTimeline = () => {
    dispatch(actions.clearContactTimeline.success());
  };

  const getArchivedContactsList = useCallback(async () => {
    dispatch(actions.getArchivedContactsList.loading());
    const userID: any = await hydrate(AUTH_KEYS.user);
    await api
      .get<Array<ArchivedContactProps>>(
        `${userID.account_id}/api/archive/contacts.json`,
      )
      .then(res => {
        const data = res.data;
        if (data.success) {
          dispatch(actions.getArchivedContactsList.success({payload: data}));
        } else {
          showErrorMessage(`${data.message}`);
          dispatch(actions.getArchivedContactsList.failure());
        }
      })
      .catch(e => {
        showErrorMessage(`${e}`);
        dispatch(actions.getArchivedContactsList.failure());
      });
  }, []);

  const clearArchivedContactsList = () => {
    dispatch(actions.clearArchivedContactsList.success());
  };

  const deleteContact = useCallback(
    async (contactId: number) => {
      dispatch(actions.deleteContact.loading());
      const user: any = await hydrate(AUTH_KEYS.user);
      await api
        .delete(`${user.account_id}/api/contacts/${contactId}.json`)
        .then(res => {
          showSuccessMessage(`${res.data.message}`);
          clearArchivedContactsList();
          getArchivedContactsList();
          dispatch(actions.deleteContact.success());
        })
        .catch(error => {
          showErrorMessage(`${error}`);
          dispatch(actions.deleteContact.failure());
        });
    },
    [getArchivedContactsList],
  );

  const restoreContact = useCallback(async (contactId: number) => {
    dispatch(actions.restoreContact.loading());
    const user: any = await hydrate(AUTH_KEYS.user);
    await api
      .get<Array<RestoreContactProps>>(
        `${user.account_id}/api/archive/contact/${contactId}/restore.json`,
      )
      .then(res => {
        showSuccessMessage(`${res.data.message}`);
        dispatch(actions.restoreContact.success());
        clearArchivedContactsList();
        navigate('Contacts');
      })
      .catch(error => {
        showErrorMessage(`${error}`);
        dispatch(actions.restoreContact.failure());
      });
  }, []);

  const setFavorite = useCallback(
    async contactId => {
      dispatch(actions.setFavorite.loading());
      const userID: any = await hydrate(AUTH_KEYS.user);
      try {
        const {data} = await api.get(
          `${userID.account_id}/api/contacts/${contactId}/favorite.json`,
        );
        if (data.success) {
          dispatch(
            actions.setFavorite.success({
              payload: data,
            }),
          );
          getContactItem(contactId);
        } else {
          showErrorMessage(`${data.message}`);
          dispatch(actions.setFavorite.failure());
        }
      } catch (e) {
        showErrorMessage(`${e}`);
        dispatch(actions.setFavorite.failure());
      }
    },
    [getContactItem],
  );

  return {
    state: {
      ...state,
    },
    actions: {
      getContactsList,
      clearContactsList,
      getContactItem,
      getEditContactItem,
      editContact,
      addContact,
      archiveContact,
      getContactTimeline,
      clearContactTimeline,
      getArchivedContactsList,
      clearArchivedContactsList,
      deleteContact,
      restoreContact,
      setFavorite,
    },
  };
});

export default useContact;
