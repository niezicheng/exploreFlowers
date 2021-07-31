import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import Icon from '../../../../components/Icon';
import { BASE_URI } from '../../../../utils/pathMap';
import { pxToDp } from '../../../../utils/stylesKits';
import Geo from '../../.././../utils/Geo';
import styles from './style';

const defaultUser = {
  header: '/upload/13828459788.jpg',
  nick_name: '清香的 orange',
  gender: '男',
  age: 18,
  marry: '未婚',
  xueli: '本科',
  agediff: 3,
}

const DynamicCard = (props) => {
  const {
    user = defaultUser,
    middleBottom,
    showCity,
    rightExtra,
    cityIconColor,
    cityTextStyle,
    nickNameStyle,
    genAgeWrapStyle,
    style,
  } = props;
  const [city, setCity] = useState();

  useEffect(() => {
    getCityByLocation();
  }, [])

  /**
   * 获取当前定位信息
   */
  const getCityByLocation = async() => {
    const res = await Geo.getCityByLocation();
    setCity(res.regeocode.addressComponent.city);
  }

  return (
    <View style={[styles.container, style]}>
      <Image
        source={{ uri: `${BASE_URI}${user.header || '/upload/13828459788.jpg'}` }}
        style={styles.avatar}
      />
      <View style={styles.headerMiddle}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: pxToDp(10)
          }}>
          <Text style={[styles.textColor, styles.nickName, nickNameStyle]}>{user.nick_name}</Text>
          <View style={[styles.genderAge, genAgeWrapStyle]}>
            <Icon
              type={user.gender === '男' ? 'icontanhuanan' : 'icontanhuanv'}
              color={user.gender === '男' ? 'red' : '#b564bf'}
              size={18}
              style={styles.genderIcon}
            />
            <Text style={[styles.textColor, { fontWeight: 'bold', }]}>{user.age}</Text>
          </View>
        </View>
        {middleBottom ? middleBottom : (
          showCity ? (
            <View style={styles.cityWrap}>
              <Icon type='iconlocation' color={cityIconColor || '#FFF'} size={pxToDp(14)} />
              <Text style={[styles.cityText, cityTextStyle]}>{city}</Text>
            </View>
          ) : (
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.textColor}>{user.marry}</Text>
            <Text style={styles.textColor}> | </Text>
            <Text style={styles.textColor}>{user.xueli}</Text>
            <Text style={styles.textColor}> | </Text>
            <Text style={styles.textColor}>{user.agediff < 10 ? '年龄相仿' : '有点代沟'}</Text>
          </View>
        ))}
      </View>
      {rightExtra}
    </View>
  )
}

export default DynamicCard;
