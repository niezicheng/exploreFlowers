import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, TextInput, ScrollView, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { ActionSheet } from 'teaset';
import NavHeader from '../../../../components/NavHeader';
import Icon from '../../../../components/Icon';
import { pxToDp } from '../../../../utils/stylesKits';
import Geo from '../../../../utils/Geo';
import styles from './style';
import Toast from '../../../../utils/Toast';

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
  const [tempImgList ,setTempImgList] = useState([]); // 选择的临时图片数组

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

  // 选择图片
  const handlePickImage = () => {
    const options = {
      title: '选择图片',
      cancelButtonTitle: '取消',
      takePhotoButtonTitle: '拍照',
      chooseFromLibraryButtonTitle: '相册',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('===============');
      console.log('Response = ', response);
      console.log('===============');

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // 图片数量不能超过 9 张
        if (tempImgList.length > 9) {
          Toast.message('图片数量不能超过 9 张', 1000, 'center');
          return;
        }
        setTempImgList([...tempImgList, response]);
      }
    });
  }

  // 点击移除图片
  const removeImage = (index) => {
    const imgDelete = () => {
      tempImgList.splice(index, 1);
      setTempImgList(tempImgList);
      Toast.small('删除成功');
    }

    const options = [{
      title: '删除',
      onPress: imgDelete,
    }];
    ActionSheet.show(options, {
      title: '取消',
    })
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
      <View style={styles.imgContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {tempImgList.map((image, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.8}
              onPress={() => removeImage(index)}
            >
              <Image
                source={{ uri: image.uri }}
                style={styles.image}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={styles.pickWrap}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handlePickImage}
          style={styles.iconWrap}
        >
          <Icon type='icontupian' color='#666' size={pxToDp(20)} />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {}}
          style={styles.iconWrap}
        >
          <Icon type='iconbiaoqing' color='#666' size={pxToDp(20)} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Publish;
