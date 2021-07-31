import React, { useState, useEffect, useContext } from 'react';
import { View, StatusBar, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { inject, observer } from 'mobx-react';
import { ListItem } from 'react-native-elements';
import { NavigationContext } from '@react-navigation/native';
import Icon from '../../components/Icon';
import { pxToDp } from '../../utils/stylesKits';
import UserCard from './components/userCard';
import ItemCard from './components/itemCard';
import { MY_COUNTS } from '../../utils/pathMap';
import request from '../../utils/request';
import styles from './style';

const My = (props) => {
  const user = props.UserStore.user;
  const context = useContext(NavigationContext);

  const [countObj, setCountObj] = useState({
    fanCount: 0, // 粉丝数量
    loveCount: 0, // 喜欢数量
    eachLoveCount: 0, // 相互关注数量
  });
  const [refreshing, setRefreshing] = useState(false);

  const data = [{
    count: countObj.eachLoveCount,
    name: '互相关注',
    onPress: () => context.navigate('Follow', 0),
  }, {
    count: countObj.loveCount,
    name: '喜欢',
    onPress: () => context.navigate('Follow', 1),
  }, {
    count: countObj.fanCount,
    name: '粉丝',
    onPress: () => context.navigate('Follow', 2),
  }];

  const contentData = [{
    title: '我的动态',
    iconType: 'icondongtai',
    iconColor: 'green',
    onPress: () => context.navigate('Trends')
  }, {
    title: '谁看过我',
    iconType: 'iconshuikanguowo',
    iconColor: 'red',
    onPress: () => context.navigate('Visitors')
  }, {
    title: '通用设置',
    iconType: 'iconshezhi',
    iconColor: 'purple',
    onPress: () => context.navigate('Trends')
  }, {
    title: '客服在线',
    iconType: 'iconkefu',
    iconColor: 'blue',
    onPress: () => context.navigate('Trends')
  }];

  useEffect(() => {
    getMyCount();
  }, []);

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
          showCity
          nickNameStyle={{ color: '#FFF' }}
          genAgeWrapStyle={{ backgroundColor: '#FFF', paddingHorizontal: pxToDp(5), borderRadius: pxToDp(20) }}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => context.navigate('EditMessage')}
          style={styles.editIcon}
        >
          <Icon type="iconbianji" size={pxToDp(18)} color="#FFFFFF" />
        </TouchableOpacity>
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
            onPress={v.onPress}
          />
        ))}
      </View>
    </ScrollView>
  )
}

export default inject('UserStore')(observer(My));

