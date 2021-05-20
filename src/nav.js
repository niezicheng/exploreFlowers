import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './pages/account/login';
import UserInfo from './pages/account/userInfo';
import Demo from './pages/account/Demo';
import Tabbar from './tabbar';

const Stack = createStackNavigator();

// login user to: 15915954324 - 15915954324
function Nav() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" initialRouteName="Tabbar">
        <Stack.Screen name="Tabbar" component={Tabbar} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="UserInfo" component={UserInfo} />
        <Stack.Screen name="Demo" component={Demo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Nav;
