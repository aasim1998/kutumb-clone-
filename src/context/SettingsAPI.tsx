import {useCallback, useReducer} from 'react';
import {
  createContainer,
  createReducer,
  createAsyncActions,
} from 'utils/context';
import {api} from 'utils/api/api';
import {LabelProps} from 'typings/label.type';
import {AUTH_KEYS, hydrate} from 'utils/storage';
import {RelationProps} from 'typings/relation.type';
import {showErrorMessage, showSuccessMessage} from 'utils/toast';
import {goBack} from 'services/NavigationService';
import {ContactFieldTypesProps} from 'typings/contactFieldTypes.type';
import {LifeEventProps} from 'typings/lifeEvent.type';
import {LifeEventGroupProps} from 'typings/lifeEventGroup.type';
import {AccountActivitiesProps} from 'typings/accountActivities.type';
import {AccountActivitiesGroupProps} from 'typings/accountActivitiesGroup.type';

export type SettingState = {
  getLabelsLoading: boolean;
  labelList: Array<LabelProps>;
  getRelationsLoading: boolean;
  relationList: Array<RelationProps>;
  addLabelsLoading: boolean;
  addRelationsLoading: boolean;
  deleteLabelLoading: boolean;
  deleteRelationLoading: boolean;
  editLabelLoading?: boolean;
  editLabelItemLoading: boolean;
  editLabelItem: any;
  editRelationLoading?: boolean;
  editRelationItemLoading: boolean;
  editRelationItem: any;
  getPersonalDetailLoading: boolean;
  personalDetailItem: any;
  updatePersonalDetailLoading: boolean;
  contactFieldTypesList: Array<ContactFieldTypesProps>;
  contactFieldTypesListLoading: boolean;
  addContactFieldTypeLoading: boolean;
  deleteContactFieldTypeLoading: boolean;
  contactFieldTypeItem: any;
  contactFieldTypeItemLoading: boolean;
  editContactFieldTypeLoading: boolean;
  lifeEventList: Array<LifeEventProps>;
  lifeEventListLoading: boolean;
  lifeEventGroupList: Array<LifeEventGroupProps>;
  lifeEventGroupListLoading: boolean;
  deleteLifeEventLoading: boolean;
  editLifeEventItemLoading: boolean;
  editLifeEventItem: any;
  editLifeEventLoading: boolean;
  addLifeEventLoading: boolean;
  accountActivitiesList: Array<AccountActivitiesProps>;
  accountActivitiesListLoading: boolean;
  accountActivitiesGroupList: Array<AccountActivitiesGroupProps>;
  accountActivitiesGroupListLoading: boolean;
  addAccountActivityLoading: boolean;
  deleteAccountActivityLoading: boolean;
  accountActivityItem: any;
  accountActivityItemLoading: boolean;
  editAccountActivityLoading: boolean;
};

const initialState: SettingState = {
  getLabelsLoading: false,
  labelList: [],
  getRelationsLoading: false,
  relationList: [],
  addLabelsLoading: false,
  addRelationsLoading: false,
  deleteLabelLoading: false,
  deleteRelationLoading: false,
  editLabelLoading: false,
  editLabelItemLoading: false,
  editLabelItem: {},
  editRelationLoading: false,
  editRelationItemLoading: false,
  editRelationItem: {},
  getPersonalDetailLoading: false,
  personalDetailItem: {},
  updatePersonalDetailLoading: false,
  contactFieldTypesList: [],
  contactFieldTypesListLoading: false,
  addContactFieldTypeLoading: false,
  deleteContactFieldTypeLoading: false,
  contactFieldTypeItem: {},
  contactFieldTypeItemLoading: false,
  editContactFieldTypeLoading: false,
  lifeEventList: [],
  lifeEventListLoading: false,
  lifeEventGroupList: [],
  lifeEventGroupListLoading: false,
  deleteLifeEventLoading: false,
  editLifeEventItemLoading: false,
  editLifeEventItem: {},
  editLifeEventLoading: false,
  addLifeEventLoading: false,
  accountActivitiesList: [],
  accountActivitiesListLoading: false,
  accountActivitiesGroupList: [],
  accountActivitiesGroupListLoading: false,
  addAccountActivityLoading: false,
  deleteAccountActivityLoading: false,
  accountActivityItem: {},
  accountActivityItemLoading: false,
  editAccountActivityLoading: false,
};

const actions = {
  getLabels: createAsyncActions('GET_LABELS'),
  getRelations: createAsyncActions('GET_RELATIONS'),
  addLabels: createAsyncActions('ADD_LABELS'),
  addRelations: createAsyncActions('ADD_RELATIONS'),
  deleteLabels: createAsyncActions('DELETE_LABELS'),
  deleteRelations: createAsyncActions('DELETE_RELATIONS'),
  editLabel: createAsyncActions('EDIT_LABEL'),
  editRelation: createAsyncActions('EDIT_RELATION'),
  getLabelItem: createAsyncActions('GET_LABEL_ITEM'),
  getRelationItem: createAsyncActions('GET_RELATION_ITEM'),
  getPersonalDetailItem: createAsyncActions('GET_PERSONAL_DETAIL_ITEM'),
  updatePersonalDetail: createAsyncActions('UPDATE_PERSONAL_DETAIL'),
  getContactFieldTypesList: createAsyncActions('GET_CONTACT_FIELD_TYPES_LIST'),
  addContactFieldType: createAsyncActions('ADD_CONTACT_FIELD_TYPE'),
  deleteContactFieldType: createAsyncActions('DELETE_CONTACT_FIELD_TYPE'),
  getContactFieldTypeItem: createAsyncActions('GET_CONTACT_FIELD_TYPE_ITEM'),
  editContactFieldType: createAsyncActions('EDIT_CONTACT_FIELD_TYPE'),
  getLifeEventList: createAsyncActions('GET_LIFE_EVENT_LIST'),
  getLifeEventGroupList: createAsyncActions('GET_LIFE_EVENT_GROUP_LIST'),
  deleteLifeEvent: createAsyncActions('DELETE_LIFE_EVENT'),
  getLifeEventItem: createAsyncActions('GET_LIFE_EVENT_ITEM'),
  editLifeEvent: createAsyncActions('EDIT_LIFE_EVENT'),
  addLifeEvent: createAsyncActions('ADD_LIFE_EVENT'),
  getAccountActivitiesList: createAsyncActions('GET_ACCOUNT_ACTIVITIES_LIST'),
  getAccountActivitiesGroupList: createAsyncActions(
    'GET_ACCOUNT_ACTIVITIES_GROUP_LIST',
  ),
  addAccountActivity: createAsyncActions('ADD_ACCOUNT_ACTIVITY'),
  deleteAccountActivity: createAsyncActions('DELETE_ACCOUNT_ACTIVITY'),
  getAccountActivityItem: createAsyncActions('GET_ACCOUNT_ACTIVITY_ITEM'),
  editAccountActivity: createAsyncActions('EDIT_ACCOUNT_ACTIVITY'),
};

const settingReducer = createReducer<SettingState>({
  [`${actions.getLabels.loading}`]: state => ({
    ...state,
    getLabelsLoading: true,
  }),
  [`${actions.getLabels.success}`]: (state, {payload}) => ({
    ...state,
    labelList: payload?.labelList,
    getLabelsLoading: false,
  }),
  [`${actions.getLabels.failure}`]: state => ({
    ...state,
    getLabelsLoading: false,
  }),
  [`${actions.getRelations.loading}`]: state => ({
    ...state,
    getRelationsLoading: true,
  }),
  [`${actions.getRelations.success}`]: (state, {payload}) => ({
    ...state,
    relationList: payload?.relationList,
    getRelationsLoading: false,
  }),
  [`${actions.getRelations.failure}`]: state => ({
    ...state,
    getRelationsLoading: false,
  }),

  [`${actions.addLabels.loading}`]: state => ({
    ...state,
    addLabelsLoading: true,
  }),
  [`${actions.addLabels.success}`]: state => ({
    ...state,

    addLabelsLoading: false,
  }),
  [`${actions.addLabels.failure}`]: state => ({
    ...state,
    addLabelsLoading: false,
  }),

  [`${actions.addRelations.loading}`]: state => ({
    ...state,
    addRelationsLoading: true,
  }),
  [`${actions.addRelations.success}`]: state => ({
    ...state,

    addRelationsLoading: false,
  }),
  [`${actions.addRelations.failure}`]: state => ({
    ...state,
    addRelationsLoading: false,
  }),

  [`${actions.deleteLabels.loading}`]: state => ({
    ...state,
    deleteLabelsLoading: true,
  }),
  [`${actions.deleteLabels.success}`]: state => ({
    ...state,
    deleteLabelsLoading: false,
  }),
  [`${actions.deleteLabels.failure}`]: state => ({
    ...state,
    deleteLabelsLoading: false,
  }),

  [`${actions.deleteRelations.loading}`]: state => ({
    ...state,
    deleteRelationsLoading: true,
  }),
  [`${actions.deleteRelations.success}`]: state => ({
    ...state,
    deleteRelationsLoading: false,
  }),
  [`${actions.deleteRelations.failure}`]: state => ({
    ...state,
    deleteRelationsLoading: false,
  }),
  [`${actions.editLabel.loading}`]: state => ({
    ...state,
    editLabelLoading: true,
  }),
  [`${actions.editLabel.success}`]: state => ({
    ...state,
    editLabelLoading: false,
  }),
  [`${actions.editLabel.failure}`]: state => ({
    ...state,
    editLabelLoading: false,
  }),

  [`${actions.editRelation.loading}`]: state => ({
    ...state,
    editRelationLoading: true,
  }),
  [`${actions.editRelation.success}`]: state => ({
    ...state,
    editRelationLoading: false,
  }),
  [`${actions.editRelation.failure}`]: state => ({
    ...state,
    editRelationLoading: false,
  }),
  [`${actions.getLabelItem.loading}`]: state => ({
    ...state,
    editLabelItemLoading: true,
  }),
  [`${actions.getLabelItem.success}`]: (state, {payload}) => ({
    ...state,
    editLabelItem: payload?.editLabelItem,
    editLabelItemLoading: false,
  }),
  [`${actions.getLabelItem.failure}`]: state => ({
    ...state,
    editLabelItemLoading: false,
  }),

  [`${actions.getRelationItem.loading}`]: state => ({
    ...state,
    editRelationItemLoading: true,
  }),
  [`${actions.getRelationItem.success}`]: (state, {payload}) => ({
    ...state,
    editRelationItem: payload?.editRelationItem,
    editRelationItemLoading: false,
  }),
  [`${actions.getRelationItem.failure}`]: state => ({
    ...state,
    editRelationItemLoading: false,
  }),
  [`${actions.getPersonalDetailItem.loading}`]: state => ({
    ...state,
    getPersonalDetailLoading: true,
  }),
  [`${actions.getPersonalDetailItem.success}`]: (state, {payload}) => ({
    ...state,
    personalDetailItem: payload?.personalDetailItem,
    getPersonalDetailLoading: false,
  }),
  [`${actions.getPersonalDetailItem.failure}`]: state => ({
    ...state,
    getPersonalDetailLoading: false,
  }),
  [`${actions.updatePersonalDetail.loading}`]: state => ({
    ...state,
    updatePersonalDetailLoading: true,
  }),
  [`${actions.updatePersonalDetail.success}`]: state => ({
    ...state,
    updatePersonalDetailLoading: false,
  }),
  [`${actions.updatePersonalDetail.failure}`]: state => ({
    ...state,
    updatePersonalDetailLoading: false,
  }),
  [`${actions.getContactFieldTypesList.loading}`]: state => ({
    ...state,
    contactFieldTypesListLoading: true,
  }),
  [`${actions.getContactFieldTypesList.success}`]: (state, {payload}) => ({
    ...state,
    contactFieldTypesListLoading: false,
    contactFieldTypesList: payload?.payload.data,
  }),
  [`${actions.getContactFieldTypesList.failure}`]: state => ({
    ...state,
    contactFieldTypesListLoading: false,
  }),
  [`${actions.addContactFieldType.loading}`]: state => ({
    ...state,
    addContactFieldTypeLoading: true,
  }),
  [`${actions.addContactFieldType.success}`]: state => ({
    ...state,
    addContactFieldTypeLoading: false,
  }),
  [`${actions.addContactFieldType.failure}`]: state => ({
    ...state,
    addContactFieldTypeLoading: false,
  }),
  [`${actions.deleteContactFieldType.loading}`]: state => ({
    ...state,
    deleteContactFieldTypeLoading: true,
  }),
  [`${actions.deleteContactFieldType.success}`]: state => ({
    ...state,
    deleteContactFieldTypeLoading: false,
  }),
  [`${actions.deleteContactFieldType.failure}`]: state => ({
    ...state,
    deleteContactFieldTypeLoading: false,
  }),
  [`${actions.getContactFieldTypeItem.loading}`]: state => ({
    ...state,
    contactFieldTypeItemLoading: true,
  }),
  [`${actions.getContactFieldTypeItem.success}`]: (state, {payload}) => ({
    ...state,
    contactFieldTypeItemLoading: false,
    contactFieldTypeItem: payload?.contactFieldTypeItem,
  }),
  [`${actions.getContactFieldTypeItem.failure}`]: state => ({
    ...state,
    contactFieldTypeItemLoading: false,
  }),
  [`${actions.editContactFieldType.loading}`]: state => ({
    ...state,
    editContactFieldTypeLoading: true,
  }),
  [`${actions.editContactFieldType.success}`]: state => ({
    ...state,
    editContactFieldTypeLoading: false,
  }),
  [`${actions.editContactFieldType.failure}`]: state => ({
    ...state,
    editContactFieldTypeLoading: false,
  }),
  [`${actions.getLifeEventList.loading}`]: state => ({
    ...state,
    lifeEventListLoading: true,
  }),
  [`${actions.getLifeEventList.success}`]: (state, {payload}) => ({
    ...state,
    lifeEventListLoading: false,
    lifeEventList: payload?.lifeEventList,
  }),
  [`${actions.getLifeEventList.failure}`]: state => ({
    ...state,
    lifeEventListLoading: false,
  }),
  [`${actions.getLifeEventGroupList.loading}`]: state => ({
    ...state,
    lifeEventGroupListLoading: true,
  }),
  [`${actions.getLifeEventGroupList.success}`]: (state, {payload}) => ({
    ...state,
    lifeEventGroupListLoading: false,
    lifeEventGroupList: payload?.lifeEventGroupList,
  }),
  [`${actions.getLifeEventGroupList.failure}`]: state => ({
    ...state,
    lifeEventGroupListLoading: false,
  }),
  [`${actions.deleteLifeEvent.loading}`]: state => ({
    ...state,
    deleteLifeEventLoading: true,
  }),
  [`${actions.deleteLifeEvent.success}`]: state => ({
    ...state,
    deleteLifeEventLoading: false,
  }),
  [`${actions.deleteLifeEvent.failure}`]: state => ({
    ...state,
    deleteLifeEventLoading: false,
  }),

  [`${actions.getLifeEventItem.loading}`]: state => ({
    ...state,
    editLifeEventItemLoading: true,
  }),
  [`${actions.getLifeEventItem.success}`]: (state, {payload}) => ({
    ...state,
    editLifeEventItem: payload?.editLifeEventItem,
    editLifeEventItemLoading: false,
  }),
  [`${actions.getLifeEventItem.failure}`]: state => ({
    ...state,
    editLifeEventItemLoading: false,
  }),

  [`${actions.editLifeEvent.loading}`]: state => ({
    ...state,
    editLifeEventLoading: true,
  }),
  [`${actions.editLifeEvent.success}`]: state => ({
    ...state,
    editLifeEventLoading: false,
  }),
  [`${actions.editLifeEvent.failure}`]: state => ({
    ...state,
    editLifeEventLoading: false,
  }),
  [`${actions.addLifeEvent.loading}`]: state => ({
    ...state,
    addLifeEventLoading: true,
  }),
  [`${actions.addLifeEvent.success}`]: state => ({
    ...state,
    addLifeEventLoading: false,
  }),
  [`${actions.addLifeEvent.failure}`]: state => ({
    ...state,
    addLifeEventLoading: false,
  }),
  [`${actions.getAccountActivitiesList.loading}`]: state => ({
    ...state,
    accountActivitiesListLoading: true,
  }),
  [`${actions.getAccountActivitiesList.success}`]: (state, {payload}) => ({
    ...state,
    accountActivitiesListLoading: false,
    accountActivitiesList: payload?.accountActivitiesList,
  }),
  [`${actions.getAccountActivitiesList.failure}`]: state => ({
    ...state,
    accountActivitiesListLoading: false,
  }),
  [`${actions.getAccountActivitiesGroupList.loading}`]: state => ({
    ...state,
    accountActivitiesGroupListLoading: true,
  }),
  [`${actions.getAccountActivitiesGroupList.success}`]: (state, {payload}) => ({
    ...state,
    accountActivitiesGroupListLoading: false,
    accountActivitiesGroupList: payload?.accountActivitiesGroupList,
  }),
  [`${actions.getAccountActivitiesGroupList.failure}`]: state => ({
    ...state,
    accountActivitiesGroupListLoading: false,
  }),
  [`${actions.addAccountActivity.loading}`]: state => ({
    ...state,
    addAccountActivityLoading: true,
  }),
  [`${actions.addAccountActivity.success}`]: state => ({
    ...state,
    addAccountActivityLoading: false,
  }),
  [`${actions.addAccountActivity.failure}`]: state => ({
    ...state,
    addAccountActivityLoading: false,
  }),
  [`${actions.deleteAccountActivity.loading}`]: state => ({
    ...state,
    deleteAccountActivityLoading: true,
  }),
  [`${actions.deleteAccountActivity.success}`]: state => ({
    ...state,
    deleteAccountActivityLoading: false,
  }),
  [`${actions.deleteAccountActivity.failure}`]: state => ({
    ...state,
    deleteAccountActivityLoading: false,
  }),
  [`${actions.getAccountActivityItem.loading}`]: state => ({
    ...state,
    accountActivityItemLoading: true,
  }),
  [`${actions.getAccountActivityItem.success}`]: (state, {payload}) => ({
    ...state,
    accountActivityItemLoading: false,
    accountActivityItem: payload?.accountActivityItem,
  }),
  [`${actions.getAccountActivityItem.failure}`]: state => ({
    ...state,
    accountActivityItemLoading: false,
  }),
  [`${actions.editAccountActivity.loading}`]: state => ({
    ...state,
    editAccountActivityLoading: true,
  }),
  [`${actions.editAccountActivity.success}`]: state => ({
    ...state,
    editAccountActivityLoading: false,
  }),
  [`${actions.editAccountActivity.failure}`]: state => ({
    ...state,
    editAccountActivityLoading: false,
  }),
});

export const {
  useContext: useSetting,
  Context: SettingContext,
  Provider: SettingProvider,
  TestProvider: TestSettingProvider,
} = createContainer(() => {
  const [{...state}, dispatch] = useReducer(settingReducer, initialState);

  const getLabels = useCallback(async () => {
    dispatch(actions.getLabels.loading());
    const userID: any = await hydrate(AUTH_KEYS.user);
    try {
      const {data} = await api.get<Array<LabelProps>>(
        `${userID.account_id}/api/account/labels.json`,
      );
      dispatch(
        actions.getLabels.success({
          labelList: data.data,
        }),
      );
    } catch (e) {
      dispatch(actions.getLabels.failure());
    }
  }, []);

  const getRelations = useCallback(async () => {
    dispatch(actions.getRelations.loading());
    const userID: any = await hydrate(AUTH_KEYS.user);
    try {
      const {data} = await api.get<Array<RelationProps>>(
        `${userID.account_id}/api/account/relations.json`,
      );
      dispatch(
        actions.getRelations.success({
          relationList: data.data,
        }),
      );
    } catch (e) {
      dispatch(actions.getRelations.failure());
    }
  }, []);

  const addLabels = useCallback(
    async values => {
      dispatch(actions.addLabels.loading());
      const userID: any = await hydrate(AUTH_KEYS.user);
      try {
        const {data} = await api.post(
          `${userID.account_id}/api/account/labels.json`,
          values,
        );
        if (data.success) {
          showSuccessMessage(`${data.message}`);
          dispatch(actions.addLabels.success());
          getLabels();
          goBack();
        } else {
          showErrorMessage(`${data.message}`);
          dispatch(actions.addLabels.failure());
        }
      } catch (e) {
        console.log(e);
        showErrorMessage(`${e}`);
        dispatch(actions.addLabels.failure());
      }
    },
    [getLabels],
  );

  const addRelations = useCallback(
    async values => {
      dispatch(actions.addRelations.loading());
      const userID: any = await hydrate(AUTH_KEYS.user);
      try {
        const {data} = await api.post(
          `${userID.account_id}/api/account/relations.json`,
          values,
        );
        if (data.success) {
          showSuccessMessage(`${data.message}`);
          dispatch(actions.addRelations.success());
          getRelations();
          goBack();
        } else {
          showErrorMessage(`${data.message}`);
          dispatch(actions.addRelations.failure());
        }
      } catch (e) {
        console.log(e);
        showErrorMessage(`${e}`);
        dispatch(actions.addRelations.failure());
      }
    },
    [getRelations],
  );

  const deleteLabels = useCallback(
    async labelItem => {
      dispatch(actions.deleteLabels.loading());
      const userID: any = await hydrate(AUTH_KEYS.user);
      try {
        const {data} = await api.delete(
          `${userID.account_id}/api/account/labels/${labelItem.id}.json`,
        );
        showSuccessMessage(`${data.message}`);
        dispatch(actions.deleteLabels.success());
        getLabels();
      } catch (e) {
        showErrorMessage(`${e}`);
        console.log(e);
        dispatch(actions.deleteLabels.failure());
      }
    },
    [getLabels],
  );

  const deleteRelations = useCallback(
    async relationItem => {
      dispatch(actions.deleteRelations.loading());
      const userID: any = await hydrate(AUTH_KEYS.user);
      try {
        const {data} = await api.delete(
          `${userID.account_id}/api/account/relations/${relationItem.id}.json`,
        );
        showSuccessMessage(`${data.message}`);
        getRelations();
        dispatch(actions.deleteRelations.success());
      } catch (e) {
        console.log(e);
        showErrorMessage(`${e}`);
        dispatch(actions.deleteRelations.failure());
      }
    },
    [getRelations],
  );

  const getLabelItem = useCallback(async labelId => {
    dispatch(actions.getLabelItem.loading());
    const userID: any = await hydrate(AUTH_KEYS.user);
    try {
      const {data} = await api.get(
        `${userID.account_id}/api/account/labels/${labelId}/edit.json`,
      );
      dispatch(
        actions.getLabelItem.success({
          editLabelItem: data.data,
        }),
      );
    } catch (e) {
      dispatch(actions.getLabelItem.failure());
    }
  }, []);

  const editLabel = useCallback(
    async (labelId, values) => {
      const updatedValue = {
        api_label: {
          name: values.editLabel,
          color: values.color,
        },
      };

      dispatch(actions.editLabel.loading());
      const userID: any = await hydrate(AUTH_KEYS.user);
      try {
        const {data} = await api.patch(
          `${userID.account_id}/api/account/labels/${labelId}.json`,
          updatedValue,
        );
        if (data.success) {
          showSuccessMessage(`${data.message}`);
          dispatch(actions.editLabel.success());
          getLabels();
          goBack();
        } else {
          showErrorMessage(`${data.message}`);
          dispatch(actions.editLabel.failure());
        }
      } catch (e) {
        console.log(e);
        showErrorMessage(`${e}`);
        dispatch(actions.editLabel.failure());
      }
    },
    [getLabels],
  );

  const getRelationItem = useCallback(async relationId => {
    dispatch(actions.getRelationItem.loading());
    const userID: any = await hydrate(AUTH_KEYS.user);
    try {
      const {data} = await api.get(
        `${userID.account_id}/api/account/relations/${relationId}/edit.json`,
      );
      dispatch(
        actions.getRelationItem.success({
          editRelationItem: data.data,
        }),
      );
    } catch (e) {
      dispatch(actions.getRelationItem.failure());
    }
  }, []);

  const editRelation = useCallback(
    async (relationId, values) => {
      const updatedValue = {
        api_relation: {
          name: values.editRelation,
          color: values.color,
        },
      };

      dispatch(actions.editRelation.loading());
      const userID: any = await hydrate(AUTH_KEYS.user);
      try {
        const {data} = await api.patch(
          `${userID.account_id}/api/account/relations/${relationId}.json`,
          updatedValue,
        );
        if (data.success) {
          showSuccessMessage(`${data.message}`);
          dispatch(actions.editRelation.success());
          getRelations();
          goBack();
        } else {
          showErrorMessage(`${data.message}`);
          dispatch(actions.editRelation.failure());
        }
      } catch (e) {
        console.log(e);
        showErrorMessage(`${e}`);
        dispatch(actions.editRelation.failure());
      }
    },
    [getRelations],
  );

  const getPersonalDetailItem = useCallback(async () => {
    dispatch(actions.getPersonalDetailItem.loading());
    const userID: any = await hydrate(AUTH_KEYS.user);
    try {
      const {data} = await api.get(
        `${userID.account_id}/api/settings/profile.json`,
      );
      dispatch(
        actions.getPersonalDetailItem.success({
          personalDetailItem: data.data,
        }),
      );
    } catch (e) {
      console.log(e);
      showErrorMessage(`${e}`);
      dispatch(actions.getPersonalDetailItem.failure());
    }
  }, []);

  const updatePersonalDetail = useCallback(async values => {
    const updatedValue = {
      api_user: {
        first_name: values.profileFirstName,
        last_name: values.profileLastName,
      },
    };
    dispatch(actions.updatePersonalDetail.loading());
    const user: any = await hydrate(AUTH_KEYS.user);
    try {
      const {data} = await api.patch(
        `${user.account_id}/api/user/{id}.json`,
        updatedValue,
      );
      if (data.success === false) {
        showErrorMessage(`${data.message}`);
      } else {
        showSuccessMessage(`${data.message}`);
        dispatch(actions.updatePersonalDetail.success());
        goBack();
      }
    } catch (e) {
      console.log(e);
      showErrorMessage(`${e}`);
      dispatch(actions.updatePersonalDetail.failure());
    }
  }, []);

  const getContactFieldTypesList = useCallback(async () => {
    dispatch(actions.getContactFieldTypesList.loading());
    const userID: any = await hydrate(AUTH_KEYS.user);
    try {
      const {data} = await api.get<Array<ContactFieldTypesProps>>(
        `${userID.account_id}/api/account/fields.json`,
      );
      dispatch(
        actions.getContactFieldTypesList.success({
          payload: data,
        }),
      );
    } catch (e) {
      dispatch(actions.getContactFieldTypesList.failure());
    }
  }, []);

  const addContactFieldType = useCallback(
    async (values: {
      api_field: {
        name: string;
        protocol: string | undefined;
        icon: string | undefined;
      };
    }) => {
      dispatch(actions.addContactFieldType.loading());
      const user: any = await hydrate(AUTH_KEYS.user);
      await api
        .post(`${user.account_id}/api/account/fields.json`, values)
        .then(res => {
          if (res.data.success) {
            showSuccessMessage(`${res.data.message}`);
            getContactFieldTypesList();
            dispatch(actions.addContactFieldType.success());
            goBack();
          } else {
            showErrorMessage(`${res.data.message}`);
            dispatch(actions.addContactFieldType.failure());
          }
        })
        .catch(error => {
          showErrorMessage(`${error}`);
          dispatch(actions.addContactFieldType.failure());
        });
    },
    [getContactFieldTypesList],
  );

  const deleteContactFieldType = useCallback(
    async ContactFieldTypeItem => {
      dispatch(actions.deleteContactFieldType.loading());
      const userID: any = await hydrate(AUTH_KEYS.user);
      try {
        const {data} = await api.delete(
          `${userID.account_id}/api/account/fields/${ContactFieldTypeItem.id}.json`,
        );
        showSuccessMessage(`${data.message}`);
        dispatch(actions.deleteContactFieldType.success());
        getContactFieldTypesList();
      } catch (e) {
        showErrorMessage(`${e}`);
        dispatch(actions.deleteContactFieldType.failure());
      }
    },
    [getContactFieldTypesList],
  );

  const getContactFieldTypeItem = useCallback(async (itemId: number) => {
    dispatch(actions.getContactFieldTypeItem.loading());
    const user: any = await hydrate(AUTH_KEYS.user);
    await api
      .get(`${user.account_id}/api/account/fields/${itemId}/edit.json`)
      .then(res => {
        if (res.data.success) {
          const {data} = res.data;
          dispatch(
            actions.getContactFieldTypeItem.success({
              contactFieldTypeItem: data,
            }),
          );
        } else {
          showErrorMessage(`${res.data.message}`);
          dispatch(actions.getContactFieldTypeItem.failure());
        }
      })
      .catch(e => {
        showErrorMessage(`${e}`);
        dispatch(actions.getContactFieldTypeItem.failure());
      });
  }, []);

  const editContactFieldType = useCallback(
    async (
      itemId: number,
      values: {
        api_field: {
          name: string;
          protocol: string;
          icon: string;
        };
      },
    ) => {
      dispatch(actions.editContactFieldType.loading());
      const user: any = await hydrate(AUTH_KEYS.user);
      await api
        .patch(`${user.account_id}/api/account/fields/${itemId}.json`, values)
        .then(res => {
          if (res.data.success) {
            showSuccessMessage(`${res.data.message}`);
            getContactFieldTypesList();
            dispatch(actions.editContactFieldType.success());
            goBack();
          } else {
            showErrorMessage(`${res.data.message}`);
            dispatch(actions.editContactFieldType.failure());
          }
        })
        .catch(error => {
          showErrorMessage(`${error}`);
          dispatch(actions.editContactFieldType.failure());
        });
    },
    [getContactFieldTypesList],
  );

  const getLifeEventList = useCallback(async () => {
    dispatch(actions.getLifeEventList.loading());
    const user: any = await hydrate(AUTH_KEYS.user);
    await api
      .get<Array<LifeEventProps>>(
        `${user.account_id}/api/account/life_events.json`,
      )
      .then(res => {
        const data = res.data;
        if (data.success) {
          dispatch(
            actions.getLifeEventList.success({lifeEventList: data.data}),
          );
        } else {
          showErrorMessage(`${data.message}`);
          dispatch(actions.getLifeEventList.failure());
        }
      })
      .catch(error => {
        showErrorMessage(`${error}`);
        dispatch(actions.getLifeEventList.failure());
      });
  }, []);

  const getLifeEventGroupList = useCallback(async () => {
    dispatch(actions.getLifeEventGroupList.loading());
    const user: any = await hydrate(AUTH_KEYS.user);
    await api
      .get<Array<LifeEventGroupProps>>(
        `${user.account_id}/api/account/life_events/new.json`,
      )
      .then(res => {
        const data = res.data;
        if (data.success) {
          dispatch(
            actions.getLifeEventGroupList.success({
              lifeEventGroupList: data.data,
            }),
          );
        } else {
          showErrorMessage(`${data.message}`);
          dispatch(actions.getLifeEventGroupList.failure());
        }
      })
      .catch(error => {
        showErrorMessage(`${error}`);
        dispatch(actions.getLifeEventGroupList.failure());
      });
  }, []);

  const deleteLifeEvent = useCallback(
    async lifeEventItem => {
      dispatch(actions.deleteLifeEvent.loading());
      const userID: any = await hydrate(AUTH_KEYS.user);
      try {
        const {data} = await api.delete(
          `${userID.account_id}/api/account/life_events/${lifeEventItem.id}.json`,
        );
        if (data.success) {
          showSuccessMessage(`${data.message}`);
          getLifeEventList();
          dispatch(actions.deleteLifeEvent.success());
        } else {
          showErrorMessage(`${data.message}`);
          dispatch(actions.deleteLifeEvent.failure());
        }
      } catch (e) {
        console.log(e);
        showErrorMessage(`${e}`);
        dispatch(actions.deleteLifeEvent.failure());
      }
    },
    [getLifeEventList],
  );

  const getLifeEventItem = useCallback(async lifeEventId => {
    dispatch(actions.getLifeEventItem.loading());
    const userID: any = await hydrate(AUTH_KEYS.user);
    try {
      const {data} = await api.get(
        `${userID.account_id}/api/account/life_events/${lifeEventId}/edit.json`,
      );
      if (data.success) {
        dispatch(
          actions.getLifeEventItem.success({
            editLifeEventItem: data.data,
          }),
        );
      } else {
        showErrorMessage(`${data.message}`);
        dispatch(actions.getLifeEventItem.failure());
      }
    } catch (e) {
      showErrorMessage(`${e}`);
      dispatch(actions.getLifeEventItem.failure());
    }
  }, []);

  const editLifeEvent = useCallback(
    async (lifeEventId, values) => {
      dispatch(actions.editLifeEvent.loading());
      const userID: any = await hydrate(AUTH_KEYS.user);
      try {
        const {data} = await api.patch(
          `${userID.account_id}/api/account/life_events/${lifeEventId}.json`,
          values,
        );
        if (data.success) {
          showSuccessMessage(`${data.message}`);
          dispatch(actions.editLifeEvent.success());
          getLifeEventList();
          goBack();
        } else {
          showErrorMessage(`${data.message}`);
          dispatch(actions.editLifeEvent.failure());
        }
      } catch (e) {
        console.log(e);
        showErrorMessage(`${e}`);
        dispatch(actions.editLifeEvent.failure());
      }
    },
    [getLifeEventList],
  );

  const addLifeEvent = useCallback(
    async values => {
      dispatch(actions.addLifeEvent.loading());
      const userID: any = await hydrate(AUTH_KEYS.user);
      try {
        const {data} = await api.post(
          `${userID.account_id}/api/account/life_events.json`,
          values,
        );
        if (data.success) {
          showSuccessMessage(`${data.message}`);
          dispatch(actions.addLifeEvent.success());
          getLifeEventList();
          goBack();
        } else {
          showErrorMessage(`${data.message}`);
          dispatch(actions.addLifeEvent.failure());
        }
      } catch (e) {
        console.log(e);
        showErrorMessage(`${e}`);
        dispatch(actions.addLifeEvent.failure());
      }
    },
    [getLifeEventList],
  );

  const getAccountActivitiesList = useCallback(async () => {
    dispatch(actions.getAccountActivitiesList.loading());
    const user: any = await hydrate(AUTH_KEYS.user);
    await api
      .get<Array<AccountActivitiesProps>>(
        `${user.account_id}/api/account/activities.json`,
      )
      .then(res => {
        const data = res.data;
        if (data.success) {
          dispatch(
            actions.getAccountActivitiesList.success({
              accountActivitiesList: data.data,
            }),
          );
        } else {
          showErrorMessage(`${data.message}`);
          dispatch(actions.getAccountActivitiesList.failure());
        }
      })
      .catch(error => {
        showErrorMessage(`${error}`);
        dispatch(actions.getAccountActivitiesList.failure());
      });
  }, []);

  const getAccountActivitiesGroupList = useCallback(async () => {
    dispatch(actions.getAccountActivitiesGroupList.loading());
    const user: any = await hydrate(AUTH_KEYS.user);
    await api
      .get<Array<AccountActivitiesGroupProps>>(
        `${user.account_id}/api/account/activities/new.json`,
      )
      .then(res => {
        const data = res.data;
        if (data.success) {
          dispatch(
            actions.getAccountActivitiesGroupList.success({
              accountActivitiesGroupList: data.data,
            }),
          );
        } else {
          showErrorMessage(`${data.message}`);
          dispatch(actions.getAccountActivitiesGroupList.failure());
        }
      })
      .catch(error => {
        showErrorMessage(`${error}`);
        dispatch(actions.getAccountActivitiesGroupList.failure());
      });
  }, []);

  const addAccountActivity = useCallback(
    async values => {
      dispatch(actions.addAccountActivity.loading());
      const userID: any = await hydrate(AUTH_KEYS.user);
      try {
        const {data} = await api.post(
          `${userID.account_id}/api/account/activities.json`,
          values,
        );
        if (data.success) {
          showSuccessMessage(`${data.message}`);
          dispatch(actions.addAccountActivity.success());
          getAccountActivitiesList();
          goBack();
        } else {
          showErrorMessage(`${data.message}`);
          dispatch(actions.addAccountActivity.failure());
        }
      } catch (e) {
        showErrorMessage(`${e}`);
        dispatch(actions.addAccountActivity.failure());
      }
    },
    [getAccountActivitiesList],
  );

  const deleteAccountActivity = useCallback(
    async accountActivityItem => {
      dispatch(actions.deleteAccountActivity.loading());
      const userID: any = await hydrate(AUTH_KEYS.user);
      try {
        const {data} = await api.delete(
          `${userID.account_id}/api/account/activities/${accountActivityItem.id}.json`,
        );
        showSuccessMessage(`${data.message}`);
        dispatch(actions.deleteAccountActivity.success());
        getAccountActivitiesList();
      } catch (e) {
        showErrorMessage(`${e}`);
        dispatch(actions.deleteAccountActivity.failure());
      }
    },
    [getAccountActivitiesList],
  );

  const getAccountActivityItem = useCallback(async (itemId: number) => {
    dispatch(actions.getAccountActivityItem.loading());
    const user: any = await hydrate(AUTH_KEYS.user);
    await api
      .get(`${user.account_id}/api/account/activities/${itemId}/edit.json`)
      .then(res => {
        if (res?.data.success) {
          const {data} = res?.data;
          dispatch(
            actions.getAccountActivityItem.success({accountActivityItem: data}),
          );
        } else {
          showErrorMessage(`${res.data.message}`);
          dispatch(actions.getAccountActivityItem.failure());
        }
      })
      .catch(e => {
        showErrorMessage(`${e}`);
        dispatch(actions.getAccountActivityItem.failure());
      });
  }, []);

  const editAccountActivity = useCallback(
    async (activityId, values) => {
      dispatch(actions.editAccountActivity.loading());
      const userID: any = await hydrate(AUTH_KEYS.user);
      try {
        const {data} = await api.patch(
          `${userID.account_id}/api/account/activities/${activityId}.json`,
          values,
        );
        if (data.success) {
          showSuccessMessage(`${data.message}`);
          dispatch(actions.editAccountActivity.success());
          getAccountActivitiesList();
          goBack();
        } else {
          showErrorMessage(`${data.message}`);
          dispatch(actions.editAccountActivity.failure());
        }
      } catch (e) {
        showErrorMessage(`${e}`);
        dispatch(actions.editAccountActivity.failure());
      }
    },
    [getAccountActivitiesList],
  );

  return {
    state: {
      ...state,
    },
    actions: {
      getLabels,
      getRelations,
      addLabels,
      addRelations,
      deleteLabels,
      deleteRelations,
      getLabelItem,
      editLabel,
      getRelationItem,
      editRelation,
      getPersonalDetailItem,
      updatePersonalDetail,
      getContactFieldTypesList,
      addContactFieldType,
      deleteContactFieldType,
      getContactFieldTypeItem,
      editContactFieldType,
      getLifeEventList,
      getLifeEventGroupList,
      deleteLifeEvent,
      getLifeEventItem,
      editLifeEvent,
      addLifeEvent,
      getAccountActivitiesList,
      getAccountActivitiesGroupList,
      addAccountActivity,
      deleteAccountActivity,
      getAccountActivityItem,
      editAccountActivity,
    },
  };
});

export default useSetting;
