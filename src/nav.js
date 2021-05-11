import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './pages/account/login';
import UserInfo from './pages/account/userInfo';

const Stack = createStackNavigator();

function Nav() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" initialRouteName="UserInfo">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="UserInfo" component={UserInfo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Nav;
