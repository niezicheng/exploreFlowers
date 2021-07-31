import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { inject, observer } from 'mobx-react';
import Login from './pages/account/login';
import UserInfo from './pages/account/userInfo';
import Demo from './pages/account/Demo';
import TanHua from './pages/friend/tanhua';
import Search from './pages/friend/search';
import Soul from './pages/friend/soul';
import TestQA from './pages/friend/soul/testQA';
import TestResult from './pages/friend/soul/testResult';
import Detail from './pages/friend/detail';
import Chat from './pages/message/chat';
import Comment from './pages/group/recommend/comment';
import Publish from './pages/group/recommend/publish';
import Follow from './pages/my/follow';
import Trends from './pages/my/trends';

import Tabbar from './tabbar';

const Stack = createStackNavigator();

// login user to: 15915954324 - 15915954324
function Nav(props) {
  // 判断 mobx 中是否存在 token, 存在 -> tabbar, 不存在 -> Login
  const initRouteName = props.RootStore.token ? 'Tabbar' : 'Login';

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" initialRouteName={initRouteName}>
        <Stack.Screen name="Tabbar" component={Tabbar} />
        <Stack.Screen name="Trends" component={Trends} />
        <Stack.Screen name="Follow" component={Follow} />
        <Stack.Screen name="Comment" component={Comment} />
        <Stack.Screen name="Publish" component={Publish} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="Detail" component={Detail} />
        <Stack.Screen name="TestResult" component={TestResult} />
        <Stack.Screen name="TestQA" component={TestQA} />
        <Stack.Screen name="Soul" component={Soul} />
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
