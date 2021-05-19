import React from 'react';
import { View, Text } from "react-native";
import JMessage from '../../utils/JMessage';

class Demo extends React.Component {
  componentDidMount() {
    JMessage.init();
    JMessage.register('11111', '1111111')
  }
  render() {
    return (
      <View>
        <Text>goods</Text>
      </View>
    );
  }
}
export default Demo;