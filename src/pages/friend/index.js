import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, TouchableOpacity, Image } from 'react-native';
import HeaderImageScrollView from 'react-native-image-header-scroll-view';
import { Overlay } from 'teaset';
import { pxToDp } from '../../utils/stylesKits';
import request from '../../utils/request';
import { FRIENDS_RECOMMEND } from '../../utils/pathMap';
import Header from './components/header';
import Visitors from './components/visitors';
import PerfectPerson from './components/perfect';
import Icon from '../../components/Icon';
import ItemCard from './components/itemCard';
import FilterPanel from './components/filterPanel';
import styles from './style';

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

  // 获取用户列表数据信息
  const getRecommends = async (filterParams = {}) => {
    const res = await request.privateGet(FRIENDS_RECOMMEND, { ...params, ...filterParams });
    if (res && res.data) {
      setRecommends(res.data);
    }
  }

  // 筛选弹框提交函数
  const handleConfirm = (paramsData) => {
    getRecommends(paramsData);
    setParams({ ...params, ...paramsData });
  }

  // 显示筛选弹框
  const recommendFilterShow = () => {
    const { page, pagesize, ...restParams } = params;
    let overlayRef = null;
    let overlayView = (
      <Overlay.View
        modal={true}
        overlayOpacity={0.3}
        ref={v => overlayRef = v}
        >
        <FilterPanel
          params={restParams}
          onClose={() => overlayRef.close()}
          onConfirm={handleConfirm}
        />
      </Overlay.View>
    );
    Overlay.show(overlayView);
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
            <TouchableOpacity activeOpacity={0.8} onPress={recommendFilterShow}>
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
