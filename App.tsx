/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import React, {useEffect} from 'react';
import LoadAssets from './src/utils/LoadAssets';
import {ThemeProvider} from '@shopify/restyle';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {composeComponents} from './src/utils/component';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {AuthProvider} from './src/context/Authentication';
import {HomeProvider} from './src/context/HomeAPI';
import {JournalProvider} from './src/context/JournalAPI';
import {ContactProvider} from './src/context/ContactAPI';
import {SettingProvider} from './src/context/SettingsAPI';
import {PhoneCallProvider} from './src/context/PhoneCallAPI';
import {NotesProvider} from './src/context/NotesAPI';
import {TasksProvider} from './src/context/TasksAPI';
import {GiftsProvider} from './src/context/GiftsAPI';
import {DebtsProvider} from './src/context/DebtsAPI';
import {RelativesProvider} from './src/context/RelativesAPI';
import {DocumentProvider} from './src/context/DocumentAPI';
import {ConversationProvider} from './src/context/ConversationAPI';
import {ContactActivityProvider} from './src/context/ContactActivitiesAPI';
import {EventsProvider} from './src/context/EventsAPI';
import {I18nProvider} from './src/locales/I18nProvider';
import theme from './src/styles/theme';
import {AuthLoading} from './src/screens/Auth/organisms/AuthLoading';
import messaging from '@react-native-firebase/messaging';
import PushNotification, {Importance} from 'react-native-push-notification';
import {LogBox} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import Config from 'react-native-config';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fab} from '@fortawesome/free-brands-svg-icons';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';

console.log(Config.API_URL);

library.add(fab, fas, far);

const Providers = composeComponents(
  SafeAreaProvider,
  AuthProvider,
  HomeProvider,
  ContactProvider,
  JournalProvider,
  SettingProvider,
  PhoneCallProvider,
  NotesProvider,
  TasksProvider,
  GiftsProvider,
  DebtsProvider,
  RelativesProvider,
  DocumentProvider,
  ConversationProvider,
  ContactActivityProvider,
  EventsProvider,
);

export const getFmcToken = async () => {
  await messaging().requestPermission();
  try {
    // await messaging().registerDeviceForRemoteMessages();
    const fmcToken = await messaging().getToken();
    console.log('FmcToken : ', fmcToken);
  } catch (error) {
    console.log('Error in getFmcToken :', error);
  }
};

PushNotification.createChannel(
  {
    channelId: 'kutumb', // (required)
    channelName: 'Kutumb', // (required)
    importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
  },
  created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
);

const paperTheme: typeof DefaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: theme.colors.primary,
  },
};

const App = () => {
  LogBox.ignoreLogs(['EventEmitter.removeListener']);
  useEffect(() => {
    getFmcToken();

    const unsubscribe = messaging().onMessage(async (remoteMessage: any) => {
      console.log(
        'Message handled in foreground!',
        JSON.stringify(remoteMessage),
      );

      PushNotification.localNotification({
        channelId: 'kutumb',
        title: remoteMessage.notification.title,
        message: remoteMessage.notification.body!,
        priority: 'high',
      });
    });

    return unsubscribe;
  }, []);

  return (
    <LoadAssets>
      <Providers>
        <I18nProvider>
          <PaperProvider theme={paperTheme}>
            <ThemeProvider theme={theme}>
              <FlashMessage position="top" />
              <SafeAreaView style={{flex: 1}} edges={['top', 'left', 'right']}>
                <AuthLoading />
              </SafeAreaView>
            </ThemeProvider>
          </PaperProvider>
        </I18nProvider>
      </Providers>
    </LoadAssets>
  );
};

export default App;
