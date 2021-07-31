import { inject, observer } from 'mobx-react';
import React from 'react';
import { View, Image, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import NavHeader from '../../../components/NavHeader';
import date from '../../../utils/date';
import { BASE_URI } from '../../../utils/pathMap';
import styles from './style';

const defaultUser = {
  id: 7,
  vcode: "888888",
  mobile: "18665711978",
  email: null,
  header: "/upload/162151615708018665711978.jpg",
  nick_name: "admin",
  age: 23,
  gender: "男",
  birthday: "1995-03-03T16:00:00.000Z",
  city: "哈尔滨",
  address: "fjdskjfdvdksjkfkjksjkcjdkjvk",
  xueli: "本科",
  amount: null,
  status: 0,
  lng: 110,
  lat: 110,
  Distance: 9666804.2,
  login_time: "2021-07-31T07:15:33.000Z",
  marry: "单身",
  guid: "186657119781591501526289"
}

const EditMessage = (props) => {
  const { user = defaultUser } = props.UserStore;

  const data = [{
    title: '头像',
    rightElement: (
      <Image
        source={{ uri: `${BASE_URI}${user.header || '/upload/13828459788.jpg'}` }}
        style={styles.avatar}
      />
    )
  }, {
    title: '昵称',
    rightElement: (
      <Text style={styles.textStyle}>{user.nick_name}</Text>
    )
  }, {
    title: '生日',
    rightElement: (
      <Text style={styles.textStyle}>{date(user.birthday).format('YYYY-MM-DD')}</Text>
    )
  }, {
    title: '性别',
    rightElement: (
      <Text style={styles.textStyle}>{user.gender}</Text>
    )
  }, {
    title: '现居城市',
    rightElement: (
      <Text style={styles.textStyle}>{user.city}</Text>
    )
  }, {
    title: '学历',
    rightElement: (
      <Text style={styles.textStyle}>{user.xueli}</Text>
    )
  }, {
    title: '月收录',
    rightElement: (
      <Text style={styles.textStyle}>15K-25K</Text>
    )
  }, {
    title: '行业',
    rightElement: (
      <Text style={styles.textStyle}>全栈开发工程师</Text>
    )
  }, {
    title: '婚姻状况',
    rightElement: (
      <Text style={styles.textStyle}>{user.marry}</Text>
    )
  }, ]

  return (
    <View style={styles.container}>
      <NavHeader title="编辑资料" isShowBackText={false} />
      {data.map((v, i) => (
        <ListItem
          key={i}
          title={v.title}
          rightElement={v.rightElement}
          bottomDivider={i !== data.length - 1}
          chevron
          titleStyle={styles.textStyle}
        />
      ))}
    </View>
  );
}

export default inject('UserStore')(observer(EditMessage));
