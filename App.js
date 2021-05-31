import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import { Provider} from 'mobx-react';
import Nav from './src/nav';
import Geo from './src/utils/Geo';
import RootStore from './src/mobx';
import UserStore from './src/mobx/userStore';
import JMessage from './src/utils/JMessage';

export default class App extends Component {
  state = {
    isInitGeo: false,
  }

  async componentDidMount() {
    // 获取本地缓存中的用户数据信息
    const strUserInfo = await AsyncStorage.getItem('userinfo');
    const userInfo = strUserInfo ? JSON.parse(strUserInfo) : {};
    // 判断是否含有 token
    if (userInfo.token) {
      // 将缓存中的数据存储一份到 mobx 中
      RootStore.setUserInfo(userInfo.mobile, userInfo.token, userInfo.userId);

      // 极光初始化
      JMessage.init();
    }

    await Geo.initGeo();
    this.setState({
      isInitGeo: true
    })
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Provider RootStore={RootStore} UserStore={UserStore}>
          {this.state.isInitGeo ?  <Nav /> : null}
        </Provider>
      </View>
    )
  }
}
