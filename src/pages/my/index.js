import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, ScrollView, RefreshControl } from 'react-native';
import { inject, observer } from 'mobx-react';
import { ListItem } from 'react-native-elements';
import Icon from '../../components/Icon';
import { pxToDp } from '../../utils/stylesKits';
import UserCard from './components/userCard';
import ItemCard from './components/itemCard';
import Geo from '../../utils/Geo';
import { MY_COUNTS } from '../../utils/pathMap';
import request from '../../utils/request';
import styles from './style';

const My = (props) => {
  const user = props.UserStore.user;

  const [city, setCity] = useState();
  const [countObj, setCountObj] = useState({
    fanCount: 0, // 粉丝数量
    loveCount: 0, // 喜欢数量
    eachLoveCount: 0, // 相互关注数量
  });

  const [refreshing, setRefreshing] = useState(false);

  const data = [{
    count: countObj.eachLoveCount,
    name: '相互关注',
    onPress: () => {},
  }, {
    count: countObj.loveCount,
    name: '喜欢',
    onPress: () => {},
  }, {
    count: countObj.fanCount,
    name: '粉丝',
    onPress: () => {},
  }];

  const contentData = [{
    title: '我的动态',
    iconType: 'icondongtai',
    iconColor: 'green',
  }, {
    title: '谁看过我',
    iconType: 'iconshuikanguowo',
    iconColor: 'red',
  }, {
    title: '通用设置',
    iconType: 'iconshezhi',
    iconColor: 'purple',
  }, {
    title: '客服在线',
    iconType: 'iconkefu',
    iconColor: 'blue',
  }];

  useEffect(() => {
    getCityByLocation();
    getMyCount();
  }, [])

  /**
   * 获取当前定位信息
   */
  const getCityByLocation = async() => {
    const res = await Geo.getCityByLocation();
    setCity(res.regeocode.addressComponent.city);
  }

  /**
   * 获取关注、喜欢和粉丝等信息数量
   */
  const getMyCount = async() => {
    setRefreshing(true);
    const res = await request.privateGet(MY_COUNTS);

    if (res && res.code === '10000') {
      console.log(res)
      setCountObj({
        fanCount: res.data[0].cout,
        loveCount: res.data[1].cout,
        eachLoveCount: res.data[2].cout,
      });
      setRefreshing(false);
    }
  }

  /**
   * 下拉刷新事件
   */
  const onRefresh = async() => {
    getMyCount();
  }

  const getMidBtm = () => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icon type='iconlocation' color='#FFF' size={pxToDp(14)} />
        <Text style={{ fontSize: pxToDp(14), color: '#FFF', marginLeft: pxToDp(5) }}>{city}</Text>
      </View>
    );
  }

  return (
    <ScrollView
      refreshControl={(
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      )}
      contentContainerStyle={styles.container}
    >
      <View style={styles.headerWrap}>
        <StatusBar backgroundColor="transparent" translucent />
        <UserCard
          user={user}
          middleBottom={getMidBtm()}
          nickNameStyle={{ color: '#FFF' }}
          genAgeWrapStyle={{ backgroundColor: '#FFF', paddingHorizontal: pxToDp(5), borderRadius: pxToDp(20) }}
        />
        <Icon type="iconbianji" size={pxToDp(18)} color="#FFFFFF" style={styles.editIcon} />
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center' }}>
        <ItemCard
          data={data}
          style={styles.itemCardWrap}
        />
      </View>
      <View style={styles.content}>
        {contentData.map((v, i) => (
          <ListItem
            key={i}
            leftIcon={<Icon type={v.iconType} color={v.iconColor} />}
            title={v.title}
            titleStyle={{ color: '#666' }}
            bottomDivider={i !== contentData.length - 1}
            chevron
          />
        ))}
      </View>
    </ScrollView>
  )
}

export default inject('UserStore')(observer(My));

