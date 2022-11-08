import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  AuthStackParamList,
  HomeStackParamList,
  ContactStackParamList,
  JournalStackParamList,
  UpcomingStackParamList,
  SettingStackParamList,
  MainStackParamList,
} from 'typings/types/navigation.types';
import {Contact} from './Main/contacts';
import {Upcoming} from './Main/upcoming';
import {Journal} from './Main/journal';
import {Setting} from './Main/settings';
import {Icon} from 'atoms/Icon';
import {PersonalSetting} from './Main/personalSetting';
import {ProfileScreen} from './Main/profileScreen';
import {ChangePassword} from './Main/changePassword';
import {AccountSetting} from './Main/accountSetting';
import {LabelScreen} from './Main/labelScreen';
import {AddLabel} from './Main/addLabel';
import {EditLabel} from './Main/editLabel';
import {RelationScreen} from './Main/relationScreen';
import {AddRelation} from './Main/addRelation';
import {EditRelation} from './Main/editRelation';
import {AddContact} from './Main/addContact';
import {EditContact} from './Main/editContact';
import theme from 'styles/theme';
import {ContactDetails} from './Main/contactDetails';
import {Notes} from './Main/notes';
import {ContactTasks} from './Main/contactTasks';
import {EditContactTasks} from './Main/editContactTasks';
import {ContactTimeline} from './Main/contactTimeline';
import {AddJournal} from './Main/addJournal';
import {JournalDetails} from './Main/journalDetails';
import {JournalAddNewComment} from './Main/journalAddComment';
import {JournalEditComment} from './Main/journalEditComment';
import {ContactAddTask} from './Main/contactTaskAdd';
import {SignUpScreen} from './Auth/signUp';
import {ForgotPassword} from './Auth/forgotPassword';
import {ResendConfirmation} from './Auth/resendConfirmation';
import {ResendConfirmationSent} from './Auth/resendConfirmationSent';
import {EmailSent} from './Auth/emailsent';
import {ConfirmEmail} from './Auth/confirmemail';
import {NotesAdd} from './Main/notesAdd';
import {NotesEdit} from './Main/notesEdit';
import {navigate} from 'services/NavigationService';
import {EditJournal} from './Main/editJournal';
import {ArchivedContact} from './Main/archivedContact/archivedContact';
import {Gifts} from './Main/gifts';
import {GiftsAdd} from './Main/giftsAdd';
import {GiftsEdit} from './Main/giftsEdit';
import {PhoneCall} from './Main/phoneCall';
import {PhoneCallAdd} from './Main/phoneCallAdd';
import {PhoneCallEdit} from './Main/phoneCallEdit';
import {Debts} from './Main/debts';
import {DebtsAdd} from './Main/debtsAdd';
import {DebtsEdit} from './Main/debtsEdit';
import {Login} from './Auth/login';
import {Home} from './Main/home';
import {Relatives} from './Main/relatives';
import {RelativesAdd} from './Main/relativesAdd';
import {RelativesEdit} from './Main/relativesEdit';
import {ContactFieldTypes} from './Main/contactFieldTypes';
import {ContactFieldTypeAdd} from './Main/contactFieldTypeAdd';
import {ContactFieldTypeEdit} from './Main/contactFieldTypeEdit';
import {Documents} from './Main/documents';
import {DocumentsAdd} from './Main/documentsAdd';
import {DocumentsEdit} from './Main/documentsEdit';
import {LifeEvents} from './Main/lifeEvents';
import {LifeEventEdit} from './Main/lifeEventEdit';
import {LifeEventAdd} from './Main/lifeEventAdd';
import {AccountActivities} from './Main/accountActivities';
import {AccountActivityAdd} from './Main/accountActivityAdd';
import {AccountActivityEdit} from './Main/accountActivityEdit';
import {Conversations} from './Main/conversations';
import {ConversationsAdd} from './Main/conversationsAdd';
import {ConversationsEdit} from './Main/conversationsEdit';
import {ContactActivitiesEdit} from './Main/contactActivitiesEdit';
import {ContactActivitiesAdd} from './Main/contactActivitiesAdd';
import {ContactEvents} from './Main/contactEvents';
import {ContactAddEvent} from './Main/contactEventAdd';
import {ContactEditEvent} from './Main/contactEventEdit';
import {ContactActivities} from './Main/contactActivities';

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
export const Auth = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="SignUpScreen" component={SignUpScreen} />
      <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} />
      <AuthStack.Screen name="EmailSent" component={EmailSent} />
      <AuthStack.Screen name="ConfirmEmail" component={ConfirmEmail} />
      <AuthStack.Screen
        name="ResendConfirmation"
        component={ResendConfirmation}
      />
      <AuthStack.Screen
        name="ResendConfirmationSent"
        component={ResendConfirmationSent}
      />
    </AuthStack.Navigator>
  );
};

const SettingsStack = createNativeStackNavigator<SettingStackParamList>();
const SettingsStackScreen = () => {
  return (
    <SettingsStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <SettingsStack.Screen name="SettingScreen" component={Setting} />
      <SettingsStack.Screen
        name="PersonalSetting"
        component={PersonalSetting}
      />
      <SettingsStack.Screen name="ProfileScreen" component={ProfileScreen} />
      <SettingsStack.Screen name="ChangePassword" component={ChangePassword} />
      <SettingsStack.Screen name="AccountSetting" component={AccountSetting} />
      <SettingsStack.Screen name="LabelScreen" component={LabelScreen} />
      <SettingsStack.Screen name="RelationScreen" component={RelationScreen} />
      <SettingsStack.Screen name="AddLabel" component={AddLabel} />
      <SettingsStack.Screen name="EditLabel" component={EditLabel} />
      <SettingsStack.Screen name="AddRelation" component={AddRelation} />
      <SettingsStack.Screen name="EditRelation" component={EditRelation} />
      <SettingsStack.Screen
        name="ArchivedContact"
        component={ArchivedContact}
      />
      <SettingsStack.Screen
        name="ContactFieldTypes"
        component={ContactFieldTypes}
      />
      <SettingsStack.Screen
        name="ContactFieldTypeAdd"
        component={ContactFieldTypeAdd}
      />
      <SettingsStack.Screen
        name="ContactFieldTypeEdit"
        component={ContactFieldTypeEdit}
      />
      <SettingsStack.Screen name="LifeEvents" component={LifeEvents} />
      <SettingsStack.Screen name="LifeEventEdit" component={LifeEventEdit} />
      <SettingsStack.Screen name="LifeEventAdd" component={LifeEventAdd} />
      <SettingsStack.Screen
        name="AccountActivities"
        component={AccountActivities}
      />
      <SettingsStack.Screen
        name="AccountActivityAdd"
        component={AccountActivityAdd}
      />
      <SettingsStack.Screen
        name="AccountActivityEdit"
        component={AccountActivityEdit}
      />
    </SettingsStack.Navigator>
  );
};

const HomeStack = createNativeStackNavigator<HomeStackParamList>();
export const HomeNavigator = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <HomeStack.Screen name="HomeScreen" component={Home} />
    </HomeStack.Navigator>
  );
};

const UpcomingStack = createNativeStackNavigator<UpcomingStackParamList>();
export const UpcomingNavigator = () => {
  return (
    <UpcomingStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <UpcomingStack.Screen name="UpcomingScreen" component={Upcoming} />
    </UpcomingStack.Navigator>
  );
};

const Tab = createBottomTabNavigator();
const BottomNavigator = ({navigation}: {navigation: any}) => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarLabelStyle: {
          fontSize: theme.textVariants.normalIconText.fontSize,
          fontWeight: '600',
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.zBlack,
        tabBarIconStyle: {marginTop: theme.spacing.sl},
        tabBarStyle: {
          overflow: 'visible',
          shadowColor: '#000000',
          shadowOpacity: 0.25,
          shadowRadius: 8,
          shadowOffset: {width: 0, height: 1},
          elevation: 10,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarLabel: 'Home',
          unmountOnBlur: true,
          tabBarIcon: ({color}) => (
            <Icon
              icon="home"
              size={24}
              color={color}
              onPress={() => navigate('Home')}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Contacts"
        component={ContactStackScreen}
        options={{
          tabBarLabel: 'Contacts',
          unmountOnBlur: true,
          tabBarIcon: ({color}) => (
            <Icon
              icon="phone"
              size={24}
              color={color}
              onPress={() => navigate('Contacts')}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Upcoming"
        component={UpcomingNavigator}
        options={{
          tabBarLabel: 'Upcoming',
          unmountOnBlur: true,
          tabBarIcon: ({color}) => (
            <Icon
              icon="upcoming"
              color={color}
              onPress={() => navigate('Upcoming')}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Journals"
        component={JournalStackScreen}
        options={{
          tabBarLabel: 'Journal',
          unmountOnBlur: true,
          tabBarIcon: ({color}) => (
            <Icon
              icon="journal"
              size={24}
              color={color}
              onPress={() => navigation.navigate('Journals')}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsStackScreen}
        options={{
          tabBarLabel: 'Settings',
          unmountOnBlur: true,
          tabBarIcon: ({color}) => (
            <Icon
              icon="settings"
              size={24}
              color={color}
              onPress={() => navigate('Settings')}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const ContactStack = createNativeStackNavigator<ContactStackParamList>();

const ContactStackScreen = () => {
  return (
    <ContactStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <ContactStack.Screen name="ContactScreen" component={Contact} />
      <ContactStack.Screen name="AddContact" component={AddContact} />
      <ContactStack.Screen name="EditContact" component={EditContact} />
      <ContactStack.Screen name="ContactDetails" component={ContactDetails} />
      <ContactStack.Screen name="ContactTimeline" component={ContactTimeline} />
      <ContactStack.Screen name="Notes" component={Notes} />
      <ContactStack.Screen name="NotesAdd" component={NotesAdd} />
      <ContactStack.Screen name="NotesEdit" component={NotesEdit} />
      <ContactStack.Screen name="ContactTasks" component={ContactTasks} />
      <ContactStack.Screen name="ContactTaskAdd" component={ContactAddTask} />
      <ContactStack.Screen
        name="EditContactTasks"
        component={EditContactTasks}
      />
      <ContactStack.Screen name="Gifts" component={Gifts} />
      <ContactStack.Screen name="GiftsAdd" component={GiftsAdd} />
      <ContactStack.Screen name="GiftsEdit" component={GiftsEdit} />
      <ContactStack.Screen name="PhoneCall" component={PhoneCall} />
      <ContactStack.Screen name="PhoneCallAdd" component={PhoneCallAdd} />
      <ContactStack.Screen name="PhoneCallEdit" component={PhoneCallEdit} />
      <ContactStack.Screen name="Debts" component={Debts} />
      <ContactStack.Screen name="DebtsAdd" component={DebtsAdd} />
      <ContactStack.Screen name="DebtsEdit" component={DebtsEdit} />
      <ContactStack.Screen name="Relatives" component={Relatives} />
      <ContactStack.Screen name="RelativesAdd" component={RelativesAdd} />
      <ContactStack.Screen name="RelativesEdit" component={RelativesEdit} />
      <ContactStack.Screen name="Documents" component={Documents} />
      <ContactStack.Screen name="DocumentsAdd" component={DocumentsAdd} />
      <ContactStack.Screen name="DocumentsEdit" component={DocumentsEdit} />
      <ContactStack.Screen name="Conversations" component={Conversations} />
      <ContactStack.Screen
        name="ConversationsAdd"
        component={ConversationsAdd}
      />
      <ContactStack.Screen
        name="ConversationsEdit"
        component={ConversationsEdit}
      />
      <ContactStack.Screen
        name="ContactActivities"
        component={ContactActivities}
      />
      <ContactStack.Screen
        name="ContactActivitiesAdd"
        component={ContactActivitiesAdd}
      />
      <ContactStack.Screen
        name="ContactActivitiesEdit"
        component={ContactActivitiesEdit}
      />
      <ContactStack.Screen name="Events" component={ContactEvents} />
      <ContactStack.Screen name="EventAdd" component={ContactAddEvent} />
      <ContactStack.Screen name="EventEdit" component={ContactEditEvent} />
    </ContactStack.Navigator>
  );
};

const JournalStack = createNativeStackNavigator<JournalStackParamList>();

const JournalStackScreen = () => {
  return (
    <JournalStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <JournalStack.Screen name="JournalScreen" component={Journal} />
      <JournalStack.Screen name="AddJournal" component={AddJournal} />
      <JournalStack.Screen name="JournalDetails" component={JournalDetails} />
      <JournalStack.Screen
        name="JournalAddNewComment"
        component={JournalAddNewComment}
      />
      <JournalStack.Screen
        name="JournalEditComment"
        component={JournalEditComment}
      />
      <JournalStack.Screen name="EditJournal" component={EditJournal} />
    </JournalStack.Navigator>
  );
};

const MainStack = createNativeStackNavigator<MainStackParamList>();

export const Main = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <MainStack.Screen name="BottomNavigator" component={BottomNavigator} />
    </MainStack.Navigator>
  );
};
