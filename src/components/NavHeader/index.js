import React, { isValidElement, useContext } from 'react';
import { View, Text, ImageBackground, StatusBar, TouchableOpacity } from 'react-native';
import { NavigationContext } from '@react-navigation/native';
import Icon from '../Icon';
import styles from './style';

const NavHeader = (props) => {
  const {
    title = '标题',
    leftExtra = '返回',
    rightExtra,
    isShowBackText = true,
    leftOnPress,
    rightOnPress,
    backTextStyle,
    titleTextStyle,
    rightTextStyle,
    style,
  } = props;

  const navigation = useContext(NavigationContext);

  const handleGoBack = () => {
    navigation.goBack();
    if (leftOnPress && typeof leftOnPress === 'function') {
      leftOnPress();
    }
  }

  const handleRightOnPress = () => {
    if (rightOnPress && typeof rightOnPress === 'function') {
      rightOnPress();
    }
  }

  return (
    <View style={[styles.container, style]}>
      <StatusBar backgroundColor='transparent' translucent />
      <ImageBackground
        source={require('../../images/headbg.png')}
        style={styles.imageBg}
      >
        {leftExtra && isValidElement(leftExtra) ? leftExtra : (
          <TouchableOpacity onPress={handleGoBack} activeOpacity={0.8} style={styles.leftWrap}>
            <Icon type='iconfanhui' color='#fff' size={20} />
            {isShowBackText && (
              <Text style={[styles.textStyle, backTextStyle]}>{leftExtra}</Text>
            )}
          </TouchableOpacity>
        )}
        <Text style={[styles.textStyle, styles.title, titleTextStyle]}>{title}</Text>
        {(rightExtra && isValidElement(rightExtra) ? rightExtra : (
          <Text style={[styles.textStyle, rightTextStyle]} onPress={handleRightOnPress}>{rightExtra}</Text>
        ))}
      </ImageBackground>
    </View>
  );
}

export default NavHeader;
