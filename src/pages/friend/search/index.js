import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, ImageBackground, Image, TouchableOpacity } from 'react-native';
import request from '../../../utils/request';
import { FRIENDS_SEARCH, BASE_URI } from '../../../utils/pathMap';
import styles from './style';
import { pxToDp, screenWidth, screenHeight } from '../../../utils/stylesKits';

// uid: 7,
// header: '/upload/13828459788.jpg',
// nick_name: '瑶瑶公主',
// dist: 0

const WHMap = {
  'wh1': { width: pxToDp(70), height: pxToDp(100) },
  'wh2': { width: pxToDp(60), height: pxToDp(90) },
  'wh3': { width: pxToDp(50), height: pxToDp(80) },
  'wh4': { width: pxToDp(40), height: pxToDp(70) },
  'wh5': { width: pxToDp(30), height: pxToDp(60) },
  'wh6': { width: pxToDp(10), height: pxToDp(50) },
}

const Search = () => {
  const [params, setParams] = useState({
    gender: '男',
    distance: 10000,
  });
  const [list, setList] = useState([]);

  useEffect(() => {
    getList();
  }, []);

  // 获取最近到数据信息
  const getList = async () => {
    const res = await request.privateGet(FRIENDS_SEARCH, params);
    if (res && res.data) {
      setList(res.data);
    }
  }

  // 根据用户信息距离获取相应展示到宽高对象
  const getWidthHeight = (dist) => {
    let distStr = 'wh6';
    switch(true) {
      case (dist < 200):
        distStr = 'wh1';
        break;
      case dist < 400:
        distStr = 'wh2';
        break;
      case dist < 600:
        distStr = 'wh3';
        break;
      case dist < 800:
        distStr = 'wh4';
        break;
      case dist < 1000:
        distStr = 'wh5';
        break;
      default:
        distStr = 'wh6';
        break;
    };

    return distStr;
  }

  return (
    <ImageBackground
      source={require('../../../images/search.gif')}
      style={styles.container}
    >
      <StatusBar
        backgroundColor="transparent"
        translucent
      />
      {list.map((data, index) => {
        const whMap = WHMap[getWidthHeight(data.dist)];
        const tx = Math.random() * (screenWidth - whMap.width);
        const ty = Math.random() * (screenHeight - whMap.height);

        return (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            style={[styles.imageWrap, { left: tx, top: ty }]}
          >
            <ImageBackground
              source={require('../../../images/showfirend.png')}
              resizeMode='stretch'
              style={{ ...whMap, position: 'relative', alignItems: 'center' }}
            >
              <Text
                style={styles.nameText}
                numberOfLines={1}
              >
                  {data.nick_name}
              </Text>
              <Image
                source={{ uri: `${BASE_URI}${data.header}` }}
                style={{
                  width: whMap.width,
                  height: whMap.width,
                  borderRadius: whMap.width / 2
                }}
              />
            </ImageBackground>
          </TouchableOpacity>
        )
      })}
      <View style={styles.tipMessage}>
        <Text style={styles.tipText}>
          你附近有
          <Text style={styles.numText}>{list.length}</Text>
          个好友
        </Text>
        <Text style={styles.tipText}>选择聊聊吧!</Text>
      </View>
    </ImageBackground>
  );
}

export default Search;
