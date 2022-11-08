export type Routes =
  | 'Login'
  | 'SignUpScreen'
  | 'EmailSent'
  | 'ConfirmEmail'
  | 'ForgotPassword'
  | 'ResendConfirmation'
  | 'ResendConfirmationSent'
  | 'Home'
  | 'HomeScreen'
  | 'Upcoming'
  | 'UpcomingScreen'
  | 'Contacts'
  | 'ContactScreen'
  | 'Journals'
  | 'JournalScreen'
  | 'Settings'
  | 'SettingScreen'
  | 'Notes'
  | 'PersonalSetting'
  | 'AccountSetting'
  | 'ProfileScreen'
  | 'ChangePassword'
  | 'LabelScreen'
  | 'AddLabel'
  | 'EditLabel'
  | 'RelationScreen'
  | 'AddRelation'
  | 'EditRelation'
  | 'BottomNavigator'
  | 'AddContact'
  | 'EditContact'
  | 'ContactDetails'
  | 'ContactTimeline'
  | 'AddJournal'
  | 'JournalDetails'
  | 'JournalAddNewComment'
  | 'JournalEditComment'
  | 'ContactTasks'
  | 'EditContactTasks'
  | 'ContactTaskAdd'
  | 'NotesAdd'
  | 'NotesEdit'
  | 'EditJournal'
  | 'ArchivedContact'
  | 'Gifts'
  | 'GiftsAdd'
  | 'GiftsEdit'
  | 'PhoneCall'
  | 'PhoneCallAdd'
  | 'PhoneCallEdit'
  | 'Debts'
  | 'DebtsAdd'
  | 'DebtsEdit'
  | 'Relatives'
  | 'RelativesAdd'
  | 'RelativesEdit'
  | 'Documents'
  | 'DocumentsAdd'
  | 'DocumentsEdit'
  | 'LifeEvents'
  | 'LifeEventEdit'
  | 'LifeEventAdd'
  | 'ContactFieldTypes'
  | 'ContactFieldTypeAdd'
  | 'ContactFieldTypeEdit'
  | 'AccountActivities'
  | 'AccountActivityAdd'
  | 'AccountActivityEdit'
  | 'Conversations'
  | 'ConversationsAdd'
  | 'ConversationsEdit'
  | 'ContactActivities'
  | 'ContactActivitiesAdd'
  | 'ContactActivitiesEdit'
  | 'Events'
  | 'EventAdd'
  | 'EventEdit';

export type AuthStackParamList = {
  Login: undefined;
  SignUpScreen: undefined;
  EmailSent: undefined;
  ConfirmEmail: undefined;
  ForgotPassword: undefined;
  ResendConfirmation: undefined;
  ResendConfirmationSent: undefined;
};

export type HomeStackParamList = {
  HomeScreen: undefined;
};

export type ContactStackParamList = {
  ContactScreen: undefined;
  AddContact: undefined;
  EditContact: undefined;
  ContactDetails: undefined;
  ContactTimeline: undefined;
  Notes: undefined;
  NotesAdd: undefined;
  NotesEdit: undefined;
  ContactTasks: undefined;
  EditContactTasks: undefined;
  ContactTaskAdd: undefined;
  Gifts: undefined;
  GiftsAdd: undefined;
  GiftsEdit: undefined;
  PhoneCall: {contactId: number; fullName: string};
  PhoneCallAdd: {contactId: number; fullName: string};
  PhoneCallEdit: {contactId: number; fullName: string};
  Debts: {contactId: number; fullName: string};
  DebtsAdd: {contactId: number; fullName: string};
  DebtsEdit: {listItemId: number; contactId: number; fullName: string};
  Relatives: {contactId: number; fullName: string};
  RelativesAdd: {contactId: number};
  RelativesEdit: {listItemId: number; contactId: number};
  Documents: {contactId: number; fullName: string};
  DocumentsAdd: {contactId: number; fullName: string};
  DocumentsEdit: {listItemId: number; contactId: number; fullName: string};
  Conversations: {contactId: number; fullName: string};
  ConversationsAdd: {contactId: number; fullName: string};
  ConversationsEdit: {
    contactId: number;
    fullName: string;
    conversationId: number;
  };
  ContactActivities: {contactId: number; fullName: string};
  ContactActivitiesAdd: {
    contactId: number;
    fullName: string;
  };
  ContactActivitiesEdit: {
    listItemId: number;
    contactId: number;
    fullName: string;
  };
  Events: {contactId: number; fullName: string};
  EventAdd: {contactId: number};
  EventEdit: {listItemId: number; contactId: number; fullName: string};
};

export type JournalStackParamList = {
  JournalScreen: undefined;
  AddJournal: undefined;
  JournalDetails: undefined;
  JournalAddNewComment: undefined;
  JournalEditComment: undefined;
  EditJournal: undefined;
};

export type UpcomingStackParamList = {
  UpcomingScreen: undefined;
};

export type SettingStackParamList = {
  SettingScreen: undefined;
  PersonalSetting: undefined;
  AccountSetting: undefined;
  ProfileScreen: undefined;
  ChangePassword: undefined;
  LabelScreen: undefined;
  AddLabel: undefined;
  EditLabel: undefined;
  RelationScreen: undefined;
  AddRelation: undefined;
  EditRelation: undefined;
  ArchivedContact: undefined;
  LifeEvents: undefined;
  LifeEventEdit: {lifeEventId: number};
  LifeEventAdd: undefined;
  ContactFieldTypes: undefined;
  ContactFieldTypeAdd: undefined;
  ContactFieldTypeEdit: {contactFieldTypeItemId: number};
  AccountActivities: undefined;
  AccountActivityAdd: undefined;
  AccountActivityEdit: {activityId: number};
};

export type MainStackParamList = {
  BottomNavigator: undefined;
};
