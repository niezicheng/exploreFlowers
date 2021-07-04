import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, TextInput } from 'react-native';
import NavHeader from '../../../../components/NavHeader';
import Icon from '../../../../components/Icon';
import { pxToDp } from '../../../../utils/stylesKits';
import Geo from '../../../../utils/Geo';
import styles from './style';

// 发布内容接口参数信息
// {
//   "textContent": "发布内容",
//   "longitude": "113.428247",
//   "latitude": "23.129183",
//   "location": "天河区珠吉津安创意园(吉山西新村新街西)",
//   "imageContent": [
//     {
//       "headImgShortPath": "/upload/album/18665711978/1576633170560_0.9746430185850421.jpg"
//     }
//   ]
// }

const Publish = () => {
  const [inputValue, setInputValue] = useState(''); // 输入框内容
  const [data, setData] = useState({
    textContent: '', // 发布内容
    longitude: '', // 纬度
    latitude: '', // 经度
    location: '', // 详细地址
    imageContent: [], // 图片数组内容
  }); // 发布信息参数

  const [locationText, setLocationText] = useState('获取定位');

  // 发布动态信息
  const handlePublish = () => {}

  // 获取当前定位信息
  const getLocation = async () => {
    const res = await Geo.getCityByLocation();
    const { addressComponent: { province, city, district, township, streetNumber }, formatted_address } = res.regeocode;
    const { location } = streetNumber;

    const text = `${province}${city}${district}${township}`;
    setLocationText(text);
    setData({
      ...data,
      location: formatted_address,
      longitude: location.split(',')[0],
      latitude: location.split(',')[1],
    });
  }

  return (
    <View style={styles.container}>
      <NavHeader
        title='发动态'
        rightExtra='发帖'
        rightOnPress={handlePublish}
      />
      <TextInput
        placeholder='请填写动态（140字以内）'
        multiline
        maxLength={140}
        value={inputValue}
        onChangeText={(value) => setInputValue(value)}
        style={styles.input}
      />
      <View style={styles.locationWrap}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={getLocation}
          style={styles.locationContainer}
        >
          <Icon type="iconlocation" color="#666" size={pxToDp(16)} />
          <Text style={styles.locationText}>{locationText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Publish;
