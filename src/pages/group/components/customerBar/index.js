import React from 'react';
import { ImageBackground, TouchableOpacity, StatusBar } from 'react-native';
import {  } from 'react-native';
import { Text } from 'react-native';
import { pxToDp } from '../../../../utils/stylesKits';
import styles from './style';

const CustomerBar = (props) => {
  const {
    tabs,
    activeTab,
    goToPage,
  } = props;

  return (
    <ImageBackground
      style={styles.imgBg}
      source={require('../../../../images/rectanglecopy.png')}
    >
      <StatusBar backgroundColor='transparent' translucent  />
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
    </ImageBackground>
  );
}

export default CustomerBar;
