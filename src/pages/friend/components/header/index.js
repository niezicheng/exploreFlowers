import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from '../../../../components/Icon';
import styles from './style';

const Header = () => {
  const iconMap = [{
    title: '探花',
    iconType: 'tanhua',
    bgColor: 'red',
  }, {
    title: '搜附近',
    iconType: 'near',
    bgColor: '#2db3f8',
  }, {
    title: '测灵魂',
    iconType: 'testSoul',
    bgColor: '#ecc768',
  }];

  return (
    <View style={styles.wrap}>
      {iconMap.map((item, index) => (
        <TouchableOpacity key={index} style={styles.container}>
          <View style={[styles.iconWrap, { backgroundColor: item.bgColor }]}>
            <Icon type={item.iconType} size={40} />
          </View>
          <Text style={styles.iconTitle}>{item.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default Header;
