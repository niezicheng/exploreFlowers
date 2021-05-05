import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Input } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import Picker from 'react-native-picker';
import ImagePicker from 'react-native-image-crop-picker';
import { Overlay } from 'teaset';
import Icon from '../../../components/Icon';
import LGButton from '../../../components/LGButton';
import { formatDate } from '../../../utils';
import { pxToDp } from '../../../utils/stylesKits';
import Geo from '../../../utils/Geo';
import CityJson from '../../../city.json';
import Toast from '../../../utils/Toast';
import styles from './style';

const sexArray = ['男', '女'];
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

  useEffect(() => {
    (async () => {
      const res = await Geo.getCityByLocation();
      // console.log(res);
      if (res) {
        const address = res.regeocode.formatted_address;
        const city = res.regeocode.addressComponent.city.replace('市', '');
        setState({ ...state, address, city })
      }
    })();
  }, [])

  // 选择性别
  const handleChangeSex = (gender) => {
    setState( {...state, gender });
  }

  // 选择城市
  const handlePickerCity = () => {
    Picker.init({
      pickerData: CityJson,
      selectedValue: ['北京', '北京'],
      wheelFlex: [1, 1, 1], // 显示省、市和区
      pickerConfirmBtnText: '确定',
      pickerCancelBtnText: '取消',
      pickerTitleText: '选择城市',
      onPickerConfirm: data => {
        // data =  [广东，广州，天河]
        setState({ ...state, city: data[1] })
      }
    });
    Picker.show();
  }

  let overlayViewRef = null

  // 设置头像
  const handleSetAvatar = async () => {
    /**
     * 1. 校验 昵称 生日 当前地址city
     * 2. 使用图片裁剪插件
     * 3. 将选择好的图片上传至后台
     *  - rn 中显示动态图片需要进行配置
     * 4. 昵称 生日 当前地址city... 信息提交至后台完善信息填写
     * 5. 成功
     *  - 执行 极光注册 极光登录
     *  - 跳转至交友首页
     */
    const { nickname, birthday, city } = state;

    if (!nickname || !birthday || !city) {
      Toast.sad('昵称或者生日或者城市不合法!!!', 2000, 'center');
      return;
    }

    // 获取选中后的图片
    const image = await ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    })

    // 显示审核中效果
    const overlayView = (
      <Overlay.View
        style={{ flex: 1, backgroundColor: '#000' }}
        modal={true}
        overlayOpacity={0}
        ref={v => overlayViewRef = v}
      >
        <View
          style={{
            marginTop: pxToDp(30),
            alignSelf: 'center',
            width: pxToDp(334),
            height: pxToDp(334),
            position: 'relative',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              left: 0,
              top: 0,
              zIndex: 100
            }}
            source={require('../../../images/scan.gif')}
          />
          <Image
            source={{ uri: image.path }}
            style={{ width: '60%', height: '60%' }}
          />
        </View>
      </Overlay.View>
    );
    Overlay.show(overlayView);

    setTimeout(() => {
      overlayViewRef.close();
    }, 3000)
  }

  const { gender, nickname, birthday, city } = state;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>填写资料</Text>
      <Text style={styles.intro}>提升我的魅力</Text>
      <View style={styles.avatarWrap}>
        <View style={styles.avatarContainer}>
          {sexArray.map((item, index) => (
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
        <Input
          value={nickname}
          placeholder='设置昵称'
          inputStyle={{ color: '#86939e' }}
          onChangeText={(nickname) => setState({ ...state, nickname })}
        />
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
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handlePickerCity}
        style={{ marginTop: pxToDp(20) }}
      >
        <Input
          disabled={true}
          value={`当前定位: ${city}`}
          placeholder='设置昵称'
          inputStyle={{ color: '#333' }}
        />
      </TouchableOpacity>
      <LGButton
        onPress={handleSetAvatar}
        style={styles.selectAvatar}
        >
          设置头像
        </LGButton>
    </View>
  )
}