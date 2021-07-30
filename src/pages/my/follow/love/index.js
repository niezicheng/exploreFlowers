import React from 'react';
import { View, Text } from 'react-native';
import SearchBar from '../../../../components/SearchBar';
import styles from './style';

const Love = () => {
  return (
    <View style={styles.container}>
      <View style={styles.searchBarWrap}>
        <SearchBar
          placeholder='搜索用户'
        />
      </View>
      <Text>Love</Text>
    </View>
  );
}

export default Love;
