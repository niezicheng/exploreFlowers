import React from 'react';
import { View, Text } from 'react-native';
import { pxToDp } from '../../utils/stylesKits';

export default (props) => {
  const {
    isMore = false,
    moMoreText = '没有更多了',
    moreText='加载更多'
  } = props;

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: pxToDp(10) }}>
      <View style={{ flex: 1, height: 1, backgroundColor: '#CCCCCC' }} />
      <Text style={{ color: '#CCCCCC', marginHorizontal: pxToDp(10) }}>
        { isMore ? moreText :  moMoreText}
      </Text>
      <View style={{ flex: 1, height: 1, backgroundColor: '#CCCCCC' }} />
    </View>
  )
}
