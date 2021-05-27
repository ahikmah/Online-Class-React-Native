/**
 * @format
 */

import {AppRegistry, Platform} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import React from 'react';
// redux
import {store, persistor} from './redux/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import PushNotification from 'react-native-push-notification';

// PushNotification.configure({
//   onRegister: function (token) {
//     console.log('TOKEN:', token);
//   },
//   onNotification: function (notification) {
//     console.log('NOTIFICATION:', notification);
//   },
//   permissions: {
//     alert: true,
//     badge: true,
//     sound: true,
//   },
//   popInitialNotification: true,
//   // requestPermissions: Platform.OS === 'ios',
// });
const RNRedux = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

AppRegistry.registerComponent(appName, () => RNRedux);
