import React, { useState, useReducer } from 'react';
import { View, Image, Text, TextInput } from 'react-native';
import { inject, observer } from 'mobx-react';
import { ListItem, Overlay } from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import DatePicker from 'react-native-datepicker';
import Picker from 'react-native-picker';
import CityJson from '../../../city.json';
import NavHeader from '../../../components/NavHeader';
import date from '../../../utils/date';
import { BASE_URI, ACCOUNT_CHECKHEADIMAGE, MY_SUBMITUSERINFO, MY_INFO } from '../../../utils/pathMap';
import request from '../../../utils/request';
import Toast from '../../../utils/Toast';
import { formatDate } from '../../../utils';
import styles from './style';
import { pxToDp } from '../../../utils/stylesKits';

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

// {
//   "header": "/upload/13828459782.png",
//   "nickname": "雾霭朦胧",
//   "birthday": "1997-12-19",
//   "age": "21",
//   "gender": "女",
//   "city": "广州市",
//   "address": "广州市天河区珠吉路58号",
//   "xueli": "本科",
//   "marry": "单身"
// }

const EditMessage = (props) => {
  const { user = defaultUser } = props.UserStore;
  const [visible, setVisible] = useState(false); // 昵称 overlay 显隐
  const [genderVisible, setGenderVisible] = useState(false); // 昵称 overlay 显隐
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  // 更新头像
  const uploadHeadImage = (image) => {
    // 构造参数发送到后台，完成头像上传
    let formData = new FormData();
    formData.append('headPhoto', {
      // 本地图片地址
      uri: image.path,
      // 图片类型
      type: image.mime,
      // 图片名称 file:///store/com/pic/dsf/image.jpg
      name: image.path.split('/').pop(),
    });

    // 执行头像上传
    return request.privatePost(ACCOUNT_CHECKHEADIMAGE, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    })
  }

  // 选择图片
  const selectAvatar = async() => {
    // 获取选中后的图片
    const image = await ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    });

    try {
      const res = await uploadHeadImage(image);
      if (res && res.code === '10000') {
        onSubmit({ header: res.data.headImgShortPath });
      }

    } catch(e) {
      Toast.hideLoading();
      Toast.message('request error', 1000, 'center');
    }
  }

  // 更新昵称
  const updateNickName = async (e) => {
    const nickname  = e.nativeEvent.text;
    if (!nickname) return;
    await onSubmit({ nickname });
    setVisible(false);
  }

  // 更新生日
  const updateBirthday = (birthday) => {
    onSubmit({ birthday });
  }

  // 更新性别
  const updateGender = async(gender) => {
    await onSubmit({ gender });
    setGenderVisible(false)
  }

  // 更新城市
  const updateCity = () => {
    Picker.init({
      pickerData: CityJson,
      selectedValue: ['北京', '北京'],
      wheelFlex: [1, 1, 1], // 显示省、市和区
      pickerConfirmBtnText: '确定',
      pickerCancelBtnText: '取消',
      pickerTitleText: '选择城市',
      onPickerConfirm: data => {
        onSubmit({ city: data[1] });
      }
    });
    Picker.show();
  }

  // 更新学历
  const updateXueLi = () => {
    Picker.init({
      pickerData: ['博士后', '博士', '硕士', '本科', '大专', '高中', '留学', '其他'],
      selectedValue: [user.xueli],
      wheelFlex: [1, 0, 0],
      pickerConfirmBtnText: "确定",
      pickerCancelBtnText: "取消",
      pickerTitleText: "选择学历",
      onPickerConfirm: data => {
        onSubmit({ xueli: data[0] });
      }
    });
    Picker.show();
  }

  // 更新婚姻状况
  const updateMarry = () => {
    Picker.init({
      pickerData: ['单身', '订婚', '已婚'],
      selectedValue: [user.marry],
      wheelFlex: [1, 0, 0],
      pickerConfirmBtnText: "确定",
      pickerCancelBtnText: "取消",
      pickerTitleText: "选择婚姻",
      onPickerConfirm: data => {
        onSubmit({ marry: data[0] });
      }
    });
    Picker.show();
  }

  // 完成编辑进行更新操作
  const onSubmit = async(user) => {
    const res = await request.privatePost(MY_SUBMITUSERINFO, user);

    if (res && res.code === '10000') {
      Toast.smile('更新成功');

      // 刷新数据, 获取最新用户信息
      const res2 = await request.privateGet(MY_INFO);
      if (res2 && res2.code === '10000') {
        // 将用户信息存入 mobx 中
        props.UserStore.setUser(res2.data);
        // 刷新页面获取最新 UserStore 内的数据信息
        forceUpdate();
      }

      return Promise.resolve(res);
    }
  }

  // 生日弹框元素
  const birthdayDom = () => (
    <DatePicker
      androidMode="spinner"
      style={{ width: '100%' }}
      date={date(user.birthday).format('YYYY-MM-DD')}
      mode="date"
      placeholder="设置生日"
      format="YYYY-MM-DD"
      minDate="1990-01-01"
      maxDate={formatDate(new Date())}
      confirmBtnText="确认"
      cancelBtnText="取消"
      onDateChange={updateBirthday}
      style={{ position: 'absolute', width: '100%', opacity: 0 }}
    />
  );

  // 展示数据源信息
  const data = [{
    title: '头像',
    rightElement: (
      <Image
        source={{ uri: `${BASE_URI}${user.header || '/upload/13828459788.jpg'}` }}
        style={styles.avatar}
      />
    ),
    onPress: selectAvatar
  }, {
    title: '昵称',
    rightElement: (
      <Text style={styles.textStyle}>{user.nick_name}</Text>
    ),
    onPress: () => setVisible(true)
  }, {
    title: '生日',
    rightElement: birthdayDom(),
    rightTitle: date(user.birthday).format('YYYY-MM-DD'),
  }, {
    title: '性别',
    rightElement: (
      <Text style={styles.textStyle}>{user.gender}</Text>
    ),
    onPress: () => setGenderVisible(true)
  }, {
    title: '现居城市',
    rightElement: (
      <Text style={styles.textStyle}>{user.city}</Text>
    ),
    onPress: updateCity
  }, {
    title: '学历',
    rightElement: (
      <Text style={styles.textStyle}>{user.xueli}</Text>
    ),
    onPress: updateXueLi
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
    ),
    onPress: updateMarry
  }];

  return (
    <View style={styles.container}>
      <NavHeader title="编辑资料" isShowBackText={false} />
      {data.map((v, i) => (
        <ListItem
          key={i}
          title={v.title}
          rightElement={v.rightElement}
          rightTitle={v.rightTitle}
          bottomDivider={i !== data.length - 1}
          chevron
          onPress={v.onPress}
          rightTitleStyle={[styles.textStyle, { marginRight: -18 }]}
          titleStyle={styles.textStyle}
        />
      ))}
      <Overlay visible={visible} onBackdropPress={() => setVisible(false)}>
        <TextInput
          placeholder="修改昵称"
          onSubmitEditing={updateNickName}
          style={{ width: pxToDp(300) }}
        />
      </Overlay>
      <Overlay visible={genderVisible} onBackdropPress={() => setGenderVisible(false)}>
        <View style={{ width: pxToDp(300), height: pxToDp(60), justifyContent: 'space-evenly' }}>
          <Text style={styles.textStyle} onPress={() => updateGender('男')}>男</Text>
          <Text style={styles.textStyle} onPress={() => updateGender('女')}>女</Text>
        </View>
      </Overlay>
    </View>
  );
}

export default inject('UserStore')(observer(EditMessage));
