import React from 'react';
import { View, Text, StatusBar } from 'react-native';
import { inject, observer } from 'mobx-react';
import { ListItem } from 'react-native-elements';
import Icon from '../../components/Icon';
import { pxToDp } from '../../utils/stylesKits';
import UserCard from './components/userCard';
import ItemCard from './components/itemCard';
import styles from './style';

const My = (props) => {
  const user = props.UserStore.user;
  const data = [{
    count: 1,
    name: '相互关注',
    onPress: () => {},
  }, {
    count: 6,
    name: '喜欢',
    onPress: () => {},
  }, {
    count: 300,
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
  }]

  const getMidBtm = () => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icon type='iconlocation' color='#FFF' size={pxToDp(14)} />
        <Text style={{ fontSize: pxToDp(14), color: '#FFF', marginLeft: pxToDp(5) }}>杭州</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
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
    </View>
  )
}

export default inject('UserStore')(observer(My));

