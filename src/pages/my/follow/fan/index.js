import React from 'react';
import { View, Text } from 'react-native';
import SearchBar from '../../../../components/SearchBar';
import styles from './style';

const Fan = () => {
  return (
    <View style={styles.container}>
      <SearchBar
        placeholder='搜索用户'
        style={styles.searchBarWrap}
      />
      <Text>Fan</Text>
    </View>
  );
}

export default Fan;
