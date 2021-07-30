import React, { useContext } from 'react';
import { ImageBackground, TouchableOpacity, StatusBar } from 'react-native';
import { View, Text } from 'react-native';
import { NavigationContext } from '@react-navigation/native';
import { pxToDp } from '../../../../utils/stylesKits';
import Icon from '../../../../components/Icon';
import styles from './style';

const CustomerBar = (props) => {
  const {
    tabs,
    activeTab,
    goToPage,
    showBackIcon = false,
  } = props;

  const context = useContext(NavigationContext);

  return (
    <ImageBackground
      style={styles.imgBg}
      source={require('../../../../images/rectanglecopy.png')}
    >
      <StatusBar backgroundColor='transparent' translucent  />
      {showBackIcon && (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => context.goBack()}
          style={styles.iconWrap}
        >
          <Icon
            type='iconfanhui'
            color='#FFF' size={pxToDp(20)}
          />
        </TouchableOpacity>
      )}
      <View style={styles.tabsWrap}>
        {tabs.map((tab, i) => (
          <TouchableOpacity
            key={i}
            activeOpacity={0.8}
            onPress={() => goToPage(i)}
            style={[
              styles.tabContainer,
              activeTab === i && { borderBottomWidth: pxToDp(2) }]}
          >
            <Text
              style={[
                styles.tabTitle,
                activeTab === i && { fontSize: pxToDp(20) }
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ImageBackground>
  );
}

export default CustomerBar;
