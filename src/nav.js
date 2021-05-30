import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { inject, observer } from 'mobx-react';
import Login from './pages/account/login';
import UserInfo from './pages/account/userInfo';
import Demo from './pages/account/Demo';
import TanHua from './pages/friend/tanhua';
import Search from './pages/friend/search';
import Tabbar from './tabbar';

const Stack = createStackNavigator();

// login user to: 15915954324 - 15915954324
function Nav(props) {
  // 判断 mobx 中是否存在 token, 存在 -> tabbar, 不存在 -> Login
  const initRouteName = props.RootStore.token ? 'Search' : 'Login';

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" initialRouteName={initRouteName}>
        <Stack.Screen name="Tabbar" component={Tabbar} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="TanHua" component={TanHua} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="UserInfo" component={UserInfo} />
        <Stack.Screen name="Demo" component={Demo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default inject('RootStore')(observer(Nav));
