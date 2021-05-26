import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, TouchableOpacity, Image } from 'react-native';
import HeaderImageScrollView from 'react-native-image-header-scroll-view';
import { pxToDp } from '../../utils/stylesKits';
import request from '../../utils/request';
import { FRIENDS_RECOMMEND } from '../../utils/pathMap';
import Header from './components/header';
import Visitors from './components/visitors';
import PerfectPerson from './components/perfect';
import Icon from '../../components/Icon';
import ItemCard from './components/itemCard';
import styles from './style';

// id: 7
// header: "/upload/162151615708018665711978.jpg"
// nick_name: "admin"
// gender: "男"
// age: 23
// marry: "单身"
// xueli: "本科"
// dist: 0
// agediff: 0
// fateValue: 40

const Friend = () => {
  // 筛选接口获取数据参数
  const [params, setParams] = useState({
    page: 1,
    pagesize: 10,
    gender: '男',
    distance: 2,
    lastLogin: '',
    city: '',
    education: '',
  });

  // 推荐朋友数据
  const [recommends, setRecommends] = useState([]);

  useEffect(() => {
    getRecommends();
  }, [])

  const getRecommends = async () => {
    const res = await request.privateGet(FRIENDS_RECOMMEND, params);
    console.log(res)
    if (res && res.data) {
      setRecommends(res.data);
    }
  }

  return (
    <HeaderImageScrollView
      maxHeight={pxToDp(150)}
      minHeight={44}
      headerImage={require("../../images/headfriend.png")}
      renderForeground={() => (
        <View style={styles.foregroundWrap} >
          <StatusBar
            backgroundColor="transparent"
            translucent
          />
          <Header />
        </View>
      )}
    >
      <>
        <Visitors />
        <View style={styles.container}>
          <PerfectPerson />
          <View style={styles.recommendWrap}>
            <Text style={styles.textColor}>推荐</Text>
            <TouchableOpacity>
              <Icon type='iconshaixuan' size={14} color='#666' />
            </TouchableOpacity>
          </View>
        </View>
        {recommends.map((recommend, i) => (
          <ItemCard
            key={i}
            recommend={recommend}
          />
        ))}
      </>
    </HeaderImageScrollView>
  )
}

export default Friend;
