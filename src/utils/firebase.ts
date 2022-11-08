import { Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';

let notificationListener;
let notificationOpenedListener;
let messageListener;
let refereshTokenListener;

class FCMService {
  register = (onRegister, onNotification, onOpenNotification) => {
    this.checkPermission(onRegister);
    this.createNotificationListeners(
      onRegister,
      onNotification,
      onOpenNotification,
    );
  };

  registerAppWithFCM = async () => {
    if (Platform.OS === 'ios') {
      // Earlier it's required.......
      // await messaging().registerDeviceForRemoteMessages();
      await messaging().setAutoInitEnabled(true);
      await messaging().requestPermission();
    }
  };

  checkPermission = onRegister => {
    messaging()
      .hasPermission()
      .then(enabled => {
        if (enabled) {
          this.getToken(onRegister);
        } else {
          this.requestpermission(onRegister);
        }
      })
      .catch(error => {});
  };

  getToken = onRegister => {
    messaging()
      .getToken()
      .then(fcmToken => {
        if (fcmToken) {
          onRegister(fcmToken);
        } else {
        }
      })
      .catch(error => {});
  };

  requestpermission = onRegister => {
    messaging()
      .requestPermission()
      .then(res => {
        this.getToken(onRegister);
      })
      .catch(error => {});
  };

  deleteToken = () => {
    messaging()
      .deleteToken()
      .catch(error => {});
  };

  createNotificationListeners = (
    onRegister,
    onNotification,
    onOpenNotification,
  ) => {
    //When the applictaion is running,but in the background.
    notificationOpenedListener = messaging().onNotificationOpenedApp(
      remoteMessage => {
        if (remoteMessage) {
          const notification = remoteMessage.data;
          onOpenNotification(notification);
        }
      },
    );

    //When the applictaion is opened from a quit state.
    notificationListener = messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          const notification = remoteMessage.data;
          onOpenNotification(notification);
        }
      });

    //Foreground state messages
    messageListener = messaging().onMessage(async remoteMessage => {
      if (remoteMessage) {
        let notification = null;
        if (Platform.OS == 'ios') {
          notification = <any>remoteMessage.data;
        } else {
          notification = <any>remoteMessage.data;
        }
        onNotification(notification);
      }
    });

    //Triggered when have new token
    refereshTokenListener = messaging().onTokenRefresh(fcmToken => {
      onRegister(fcmToken);
    });
  };

  //Unsubscribe listeners.............
  unRegister = () => {
    // notificationListener();
    // notificationOpenedListener();
    // messageListener();
    // refereshTokenListener();
  };
}

export const fcmService = new FCMService();
