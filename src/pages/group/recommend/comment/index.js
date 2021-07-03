import React from 'react';
import { View, Text } from 'react-native';
import styles from './style';

const Comment = (props) => {
  const { route: { params } } = props;
  console.log(params, 'params---=-=---=-===')

  return (
    <View style={styles.container}>
      <Text>Comment</Text>
    </View>
  );
}

export default Comment;
