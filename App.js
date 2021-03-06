import React, {useEffect} from 'react';
import {Image, StyleSheet, View, LogBox} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {
  TransitionSpecs,
  HeaderStyleInterpolators,
} from '@react-navigation/stack';

const MyTransition = {
  gestureDirection: 'vertical',
  transitionSpec: {
    open: TransitionSpecs.RevealFromBottomAndroidSpec,
    close: TransitionSpecs.RevealFromBottomAndroidSpec,
  },

  headerStyleInterpolator: HeaderStyleInterpolators.forNoAnimation,
};

// AUTH
import Login from './screens/Login';
import Register from './screens/Register';
import ForgotPassword from './screens/ForgotPassword';
import CodeVerification from './screens/CodeVerification';
import CreateNewPassword from './screens/CreateNewPassword';

// PRIVATE SCREEN
import Home from './screens/Home';
import News from './screens/News';

// Activity
import ActivityDashboard from './screens/Activity';
import MyClass from './screens/MyClass';
import ClassDetail from './screens/ClassDetail';
import EditMyClass from './components/MyClass/EditMyClass';

// Chat
import Chat from './screens/Chat';
import CreateNewChat from './screens/ChatNew';
import ChatRoom from './screens/ChatRoom';
import ChatGroupDetail from './screens/ChatGroupDetail';

// Profile
import Profile from './screens/Profile';
import BasicInfo from './components/Profile/BasicInfo';
import ChangePassword from './components/Profile/ChangePassword';

import Notification from './components/Notification';

import {connect} from 'react-redux';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          let topBorder;

          if (route.name === 'Home') {
            iconName = focused
              ? require('./assets/images/home-active.png')
              : require('./assets/images/home-off.png');
            topBorder = focused ? <View style={styles.activeBorder} /> : null;
          } else if (route.name === 'Activity') {
            iconName = focused
              ? require('./assets/images/activity-active.png')
              : require('./assets/images/activity-off.png');
            topBorder = focused ? <View style={styles.activeBorder} /> : null;
          } else if (route.name === 'Chat') {
            iconName = focused
              ? require('./assets/images/chat-active.png')
              : require('./assets/images/chat-off.png');
            topBorder = focused ? <View style={styles.activeBorder} /> : null;
          } else if (route.name === 'Profile') {
            iconName = focused
              ? require('./assets/images/profile-active.png')
              : require('./assets/images/profile-off.png');
            topBorder = focused ? <View style={styles.activeBorder} /> : null;
          }

          return (
            <>
              {topBorder}
              <Image source={iconName} size={size} color={color} />
            </>
          );
        },
      })}
      tabBarOptions={{
        showLabel: false,
      }}>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Activity" component={ActivityStack} />
      <Tab.Screen name="Chat" component={Chat} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="HomeDashboard" component={Home} />
      <Stack.Screen name="News" component={News} />
    </Stack.Navigator>
  );
}

function ActivityStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ActivityDashboard" component={ActivityDashboard} />
      <Stack.Screen name="MyClass" component={MyClass} />
      <Stack.Screen name="ClassDetail" component={ClassDetail} />
      <Stack.Screen name="EditMyClass" component={EditMyClass} />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ProfileDashboard" component={Profile} />
      <Stack.Screen name="BasicInfo" component={BasicInfo} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
    </Stack.Navigator>
  );
}

function App(props) {
  LogBox.ignoreAllLogs();
  // console.log(props.isLogin);
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}>
        {!props.token ? (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen
              name="CodeVerification"
              component={CodeVerification}
            />
            <Stack.Screen
              name="CreateNewPassword"
              component={CreateNewPassword}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="Home" component={HomeTabs} />
            <Stack.Screen name="CreateNewChat" component={CreateNewChat} />
            <Stack.Screen name="ChatRoom" component={ChatRoom} />
            <Stack.Screen name="ChatGroupDetail" component={ChatGroupDetail} />
            <Stack.Screen
              name="Notification"
              component={Notification}
              options={{
                title: 'Custom animation',
                ...MyTransition,
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  activeBorder: {
    position: 'absolute',
    top: 0,
    width: '70%',
    height: 6.6,
    borderBottomWidth: 6.6,
    borderBottomColor: '#5784BA',
    borderBottomStartRadius: 30,
    borderBottomEndRadius: 30,
  },
});
const mapStateToProps = state => {
  return {isLogin: state.auth.isLogin, token: state.auth.resultLogin.token};
};
export default connect(mapStateToProps)(App);
