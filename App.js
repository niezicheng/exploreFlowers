import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider} from 'mobx-react';
import Nav from './src/nav';
import Geo from './src/utils/Geo';
import RootStore from './src/mobx';
import JMessage from './src/utils/JMessage';

export default class App extends Component {
  state = {
    isInitGeo: false,
  }

  async componentDidMount() {
    // 极光初始化
    JMessage.init();
    await Geo.initGeo();
    this.setState({
      isInitGeo: true
    })
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Provider RootStore={RootStore}>
          {this.state.isInitGeo ?  <Nav /> : null}
        </Provider>
      </View>
    )
  }
}
