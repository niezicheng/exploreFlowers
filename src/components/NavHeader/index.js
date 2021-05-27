import React, { useContext } from 'react';
import { View, Text, ImageBackground, StatusBar, TouchableOpacity } from 'react-native';
import { NavigationContext } from '@react-navigation/native';
import Icon from '../Icon';
import styles from './style';

const NavHeader = (props) => {
  const {
    title = '标题'
  } = props;

  const navigation = useContext(NavigationContext);

  const handleGoBack = () => {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='transparent' translucent />
      <ImageBackground
        source={require('../../images/headbg.png')}
        style={styles.imageBg}
      >
        <TouchableOpacity onPress={handleGoBack} activeOpacity={0.8} style={styles.leftWrap}>
          <Icon type='iconfanhui' color='#fff' size={20} />
          <Text style={styles.backText}>返回</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.rightWrap} />
      </ImageBackground>
    </View>
  );
}

export default NavHeader;
