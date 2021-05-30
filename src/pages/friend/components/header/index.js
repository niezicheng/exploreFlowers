import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationContext } from '@react-navigation/native';
import Icon from '../../../../components/Icon';
import styles from './style';

const Header = () => {
  const iconMap = [{
    title: '探花',
    iconType: 'tanhua',
    bgColor: 'red',
    routerName: 'TanHua',
  }, {
    title: '搜附近',
    iconType: 'near',
    bgColor: '#2db3f8',
    routerName: 'Search',
  }, {
    title: '测灵魂',
    iconType: 'testSoul',
    bgColor: '#ecc768',
    routerName: '',
  }];

  const navigation = useContext(NavigationContext);

  const goToPage = (routerName) => {
    navigation.navigate(routerName);
  }

  return (
    <View style={styles.wrap}>
      {iconMap.map((item, index) => (
        <TouchableOpacity
          key={index}
          activeOpacity={0.8}
          style={styles.container}
          onPress={() => goToPage(item.routerName)}
        >
          <View style={[styles.iconWrap, { backgroundColor: item.bgColor }]}>
            <Icon svg type={item.iconType} size={40} color='#fff' />
          </View>
          <Text style={styles.iconTitle}>{item.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default Header;
