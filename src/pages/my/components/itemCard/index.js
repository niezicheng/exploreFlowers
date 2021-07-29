import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text } from 'react-native';
import styles from './style';

const DynamicCard = (props) => {
  const {
    data,
    style,
  } = props;

  return (
    <View style={[styles.container, style]}>
      {data.map((item, index) => (
        <TouchableOpacity
          key={index}
          activeOpacity={0.8}
          onPress={item.onPress}
          style={styles.itemWrap}
        >
          <Text style={[styles.text, styles.numText]}>{item.count}</Text>
          <Text style={styles.text}>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

export default DynamicCard;
