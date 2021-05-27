import React from 'react';
import { View, Text } from 'react-native';
import NavHeader from '../../../components/NavHeader';
import styles from './style';

const TanHua = () => {
  return (
    <View style={styles.container}>
      <NavHeader title='探花' />
    </View>
  );
}

export default TanHua;
