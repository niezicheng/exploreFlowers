import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, TextInput, ScrollView, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { ActionSheet } from 'teaset';
import NavHeader from '../../../../components/NavHeader';
import Icon from '../../../../components/Icon';
import Emotion from '../../../../components/Emotion';
import Toast from '../../../../utils/Toast';
import Geo from '../../../../utils/Geo';
import request from '../../../../utils/request';
import { QZ_IMG_UPLOAD, QZ_DT_PUBLISH } from '../../../../utils/pathMap';
import { pxToDp } from '../../../../utils/stylesKits';
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

// 发帖动态信息
const Publish = (props) => {
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

  const [showEmotion, setShowEmotion] = useState(false); // 是否显示表情节点

  // 上传图片
  const uploadImage = async () => {
    // 将选择的图片上传到对应的接口，接口返回图片在线地址
    const params = new FormData();
    if (tempImgList.length) {
      tempImgList.forEach(v => {
        const imgObj = {
          uri: `file://${v.path}`,
          name: v.fileName,
          type: 'application/octet-stream'
        };
        params.append('images', imgObj);
      })

      // 将数据结合图片提交给后台发帖接口 --- [Error: Network Error]
      // const res = await request.privatePost(QZ_IMG_UPLOAD, params, {
      //   headers: { 'Content-type': 'multipart/form-data;charset=utf-8' }
      // });

      // 目前接口好像有错误不能获取对应的结果信息
      // if (res && res.code === '10000') {
      //   return Promise.resolve(res.data.map(v => ({
      //     headImgShortPath: v.headImgShortPath
      //   })));
      // } else {
        return Promise.resolve([]);
      // }
    } else {
      return Promise.resolve([]);
    }
  }

  // 发布动态信息
  const handlePublish = async () => {
    // 对数据(文本内容、图片、位置信息)做验证
    const { location, longitude, latitude } = data;
    if (!inputValue) {
      Toast.message('发布内容不能为空', 1000, 'center');
      return;
    }
    if (!location || !longitude || !latitude) {
      Toast.message('请获取当前定位信息', 1000, 'center');
      return;
    }

    // const imageContent = await uploadImage();

    // 内部更新 imageContent 状态是异步的
    // setData({
    //   ...data,
    //   textContent: inputValue,
    //   imageContent,
    // });

    // const res = request.privatePost(QZ_DT_PUBLISH, {
    //   ...data,
    //   textContent: inputValue,
    //   imageContent,
    // });
    // // 目前后台接口返回 status 404 报错
    // if (res && res.code === '10000') {
      // 发帖成功，返回推荐页面
      Toast.smile('发布动态成功');
      setTimeout(() => {
        // native 或 goBack 跳转都是错误的
        // 返回上一页或之前打开的路由页面是不会重新获取最新的数据请求信息
        props.navigation.reset({
          routes: [{ name: 'Tabbar', params: { pagename: 'group' } }]
        });
      }, 2000);
    // }
  }

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
      const {data, ...other }  = response
      console.log('Response = ', other);
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
      Toast.smile('删除成功');
    }

    const options = [{
      title: '删除',
      onPress: imgDelete,
    }];
    ActionSheet.show(options, {
      title: '取消',
    })
  }

  // 选择表情
  const handlePressEmotion = ({ key }) => {
    setInputValue(`${inputValue}${key}`);
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
          onPress={() => setShowEmotion(!showEmotion)}
          style={styles.iconWrap}
        >
          <Icon type='iconbiaoqing' color={showEmotion ? '#FEAB00' : '#666'} size={pxToDp(24)} />
        </TouchableOpacity>
      </View>
      {showEmotion && (
        <Emotion onPress={handlePressEmotion} />
      )}
    </View>
  );
}

export default Publish;
