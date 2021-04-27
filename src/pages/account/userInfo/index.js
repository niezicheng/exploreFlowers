import React, { useState } from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import { Input } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import Icon from '../../../components/Icon';
import { formatDate } from '../../../utils';
import { pxToDp } from '../../../utils/stylesKits';
import styles from './style';

const SexArray = ['男', '女'];
const MapSex = {
  '男': 'male',
  '女': 'female',
}

export default () => {
  const [state, setState] = useState({
    nickname: '', // 姓名
    gender: '男', // 性别
    birthday: '', // 生日
    city: '', // 城市
    header: '', // 头像
    lng: '', // 经度
    lat: '', // 纬度
    address: '' // 详细地址
  })

  const handleChangeSex = (gender) => {
    setState( {...state, gender });
  }

  const { gender, nickname, birthday } = state;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>填写资料</Text>
      <Text style={styles.intro}>提升我的魅力</Text>
      <View style={styles.avatarWrap}>
        <View style={styles.avatarContainer}>
          {SexArray.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleChangeSex(item)}
              activeOpacity={0.8}
              style={[
                styles.avatar,
                item === gender && styles.activeAvatar
              ]}
            >
              <Icon type={MapSex[item]} size={40} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View>
        <Input
          value={nickname}
          placeholder='设置昵称'
          onChangeText={(nickname) => setState({ ...state, nickname })}
        />
      </View>
      <View>
        <DatePicker
          androidMode="spinner"
          style={{ width: '100%' }}
          date={birthday}
          mode="date"
          placeholder="设置生日"
          format="YYYY-MM-DD"
          minDate="1990-01-01"
          maxDate={formatDate(new Date())}
          confirmBtnText="确认"
          cancelBtnText="取消"
          customStyles={{
            dateIcon: {
              display: 'none',
            },
            dateInput: {
              marginHorizontal: 10,
              borderWidth: 0,
              borderBottomWidth: pxToDp(1.1),
              borderBottomColor: '#86939e',
              alignItems: 'flex-start',
              paddingLeft: pxToDp(4),
            },
            placeholderText: {
              fontSize: pxToDp(15),
              color: '#86939e',
            }
          }}
          onDateChange={(birthday) => {setState({ ...state, birthday })}}
        />
      </View>
    </View>
  )
}