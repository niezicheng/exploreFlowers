import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { NavigationContext } from '@react-navigation/native'
import request from '../../../../utils/request';
import { FRIENDS_VISITORS, BASE_URI } from '../../../../utils/pathMap';
import styles from './style';

// target_uid: 7
// uid: 8
// nick_name: "雾霭朦胧"
// age: 21
// xueli: "大专"
// marry: "未婚"
// gender: "女"
// Distance: 9666804.2
// header: "/upload/13828459782.png"
// agediff: -2
// fateValue: 62

const Visitors = (props) => {
  const {
    showRightArrow = true,
    isSkip = false,
  } = props;
  const [visitors, setVisitors] = useState([]);
  const context = useContext(NavigationContext)

  useEffect(() => {
    (async () => {
      const res = await request.privateGet(FRIENDS_VISITORS);
      setVisitors(res.data);
    })()
  }, [])

  return (
    <TouchableOpacity
      activeOpacity={isSkip ? 0.8 : 1}
      onPress={isSkip ? () => context.navigate('Visitors') : () => {}}
      style={styles.container}
    >
      <Text style={styles.descText}>最近有{visitors.length}人来访问, 快去查看...</Text>
      <View style={styles.imgWrap}>
        {visitors.map((visitor, index) => (
          <Image
            key={index}
            style={styles.img}
            source={{ uri: `${BASE_URI}${visitor.header}` }}
          />
        ))}
        {showRightArrow && (
          <Text style={styles.rightArrow}>&gt;</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

export default Visitors;
