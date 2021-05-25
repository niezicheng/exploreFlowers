import React from 'react';
import { View, StatusBar } from 'react-native';
import HeaderImageScrollView from 'react-native-image-header-scroll-view';
import { pxToDp } from '../../utils/stylesKits';
import Header from './components/header';

const Friend = () => {
  return (
    <HeaderImageScrollView
      maxHeight={pxToDp(150)}
      minHeight={44}
      headerImage={require("../../images/headfriend.png")}
      renderForeground={() => (
        <View style={{ height: pxToDp(150), justifyContent: "center", alignItems: "center" }} >
          <StatusBar
            backgroundColor="transparent"
            translucent
          />
          <Header />
        </View>
      )}
    >
      <View style={{ height: 1000 }}>
        
      </View>
    </HeaderImageScrollView>
  )
}

export default Friend;
