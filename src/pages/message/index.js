import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { NavigationContext } from '@react-navigation/native'
import NavHeader from '../../components/NavHeader';
import Icon from '../../components/Icon';
import { pxToDp } from '../../utils/stylesKits';
import JMessage from '../../utils/JMessage';
import { FRIENDS_PERSONALINFO_GUID, BASE_URI, DEFAULT_IMG } from '../../utils/pathMap';
import request from '../../utils/request';
import date from '../../utils/date';
import styles from './style';

const Message = () => {
  const [list, setList] = useState([]);
  const context = useContext(NavigationContext);

  useEffect(() => {
    (async () => {
      const res = await JMessage.getConversations();
      if (res.length) {
        const idArr = res.map(v => v.target.username);

        const url = FRIENDS_PERSONALINFO_GUID.replace(':ids', idArr.join(','));
        const users = await request.privateGet(url);

        if (users && users.code === '10000') {
          // 极光数据与接口数据结合
          setList(res.map((v, i) => ({ ...v, user: users.data[i] })));
        }
      }
    })()
  }, [])

  const rightExtra = () => {
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={() => {}}>
        <Icon type="icontongxunlu" color="#FFF" size={pxToDp(20)} />
      </TouchableOpacity>
    )
  }

  // 头部内容映射
  const topMessage = [{
    iconType: 'icongonggao',
    bgColor: '#ebc969',
    text: '全部',
    onPress: () => {},
  }, {
    iconType: 'icondianzan-o',
    bgColor: '#ff5314',
    text: '点赞',
    onPress: () => {},
  }, {
    iconType: 'iconpinglun',
    bgColor: '#2fb4f9',
    text: '评论',
    onPress: () => {},
  }, {
    iconType: 'iconxihuan',
    bgColor: '#1adbde',
    text: '喜欢',
    onPress: () => {},
  }]

  return (
    <View style={{ flex: 1 }}>
      <NavHeader
        leftExtra={<View />}
        rightExtra={rightExtra()}
      />
      <View style={styles.topContainer}>
        {topMessage.map((v, i) => (
          <View key={i} style={styles.topItemWrap}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={v.onPress}
              style={[styles.all, { backgroundColor: v.bgColor }]}
            >
              <Icon type={v.iconType} size={pxToDp(28)} color="#FFF" />
            </TouchableOpacity>
            <Text style={styles.labelText}>{v.text}</Text>
          </View>
        ))}
      </View>
      <ScrollView style={{ flex: 1 }}>
        {list.map((v, i) => (
          <TouchableOpacity
            activeOpacity={0.8}
            key={i} style={styles.itemWrap}
            onPress={() => context.navigate('Chat', v.user)}
          >
            <Image
              source={{ uri: `${BASE_URI}${v.user.header}` || DEFAULT_IMG }}
              style={styles.avatar}
            />
            <View style={styles.itemMiddle}>
              <Text style={styles.text}>{v.user.nick_name}</Text>
              <Text style={styles.text}>{v.latestMessage.text}</Text>
            </View>
            <View style={styles.itemRight}>
              <Text style={styles.text}>{date(v.latestMessage.createTime).fromNow()}</Text>
              <View style={styles.badge}>
                <Text style={{ color: '#FFF' }}>{v.unreadCount}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}

export default Message;
