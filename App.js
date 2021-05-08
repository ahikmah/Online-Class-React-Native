import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Login from './screens/Login';
import Register from './screens/Register';
import ForgotPassword from './screens/ForgotPassword';
import CodeVerification from './screens/CodeVerification';
import CreateNewPassword from './screens/CreateNewPassword';

function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const {Navigator, Screen} = createStackNavigator();

  return (
    <NavigationContainer>
      <Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}>
        <Screen name="Login" component={Login} />
        <Screen name="Register" component={Register} />
        <Screen name="ForgotPassword" component={ForgotPassword} />
        <Screen name="CodeVerification" component={CodeVerification} />
        <Screen name="CreateNewPassword" component={CreateNewPassword} />
      </Navigator>
    </NavigationContainer>
  );
}

export default App;
