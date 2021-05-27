import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Picker from 'react-native-picker';
import { Slider } from 'react-native-elements';
import Icon from '../../../../components/Icon';
import Button  from '../../../../components/LGButton';
import cityJson from '../../../../city.json';
import styles from './style';
import style from '../header/style';

const sexArray = ['男', '女'];
const MapSex = {
  '男': 'male',
  '女': 'female',
}

const FilterPanel = (props) => {
  const {
    params,
    onClose,
    onConfirm,
  } = props;
  const [state, setState] = useState(params);

  const {gender, distance, lastLogin, city, education } = state;

  // 选择性别
  const handleChangeSex = (gender) => {
    setState({ ...state, gender });
  }

  // 选择近期登录时间
  const handleSelectLastLogin = () => {
    Picker.init({
      pickerData: ['15分钟', '1小时', '1天', '不限制'],
      selectedValue: [lastLogin],
      wheelFlex: [1, 0, 0], // 显示省和市
      pickerConfirmBtnText: "确定",
      pickerCancelBtnText: "取消",
      pickerTitleText: "选择近期登录时间",
      onPickerConfirm: data => {
        setState({ ...state, lastLogin: data[0] })
      }
    });
    Picker.show();
  };

  // 选择距离
  const handleChangeDistance = (distance) => {
    setState({ ...state, distance })
  }

  // 选择城市
  const handleSelectCity = () => {
    Picker.init({
      pickerData: cityJson,
      selectedValue: ["北京", "北京"],
      wheelFlex: [1, 1, 0], // 显示省和市
      pickerConfirmBtnText: "确定",
      pickerCancelBtnText: "取消",
      pickerTitleText: "选择城市",
      onPickerConfirm: data => {
        setState({ ...state, city: data[1] })
      }
    });
    Picker.show();
  }

  // 选择学历
  const handleSelectEducation = () => {
    Picker.init({
      pickerData: ['博士后', '博士', '硕士', '本科', '大专', '高中', '留学', '其他'],
      selectedValue: [education],
      wheelFlex: [1, 0, 0],
      pickerConfirmBtnText: "确定",
      pickerCancelBtnText: "取消",
      pickerTitleText: "选择近期登录时间",
      onPickerConfirm: data => {
        setState({ ...state, education: data[0] })
      }
    });
    Picker.show();
  }

  // 提交数据信息
  const handleSubmit = () => {
    onConfirm(state);
    onClose();
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text />
        <Text style={styles.title}>筛选</Text>
        <TouchableOpacity activeOpacity={0.8} onPress={onClose}>
          <Icon type='iconshibai' size={18} color='#999' />
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <View style={styles.itemStyle}>
          <Text style={styles.label}>性别:</Text>
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
              <Icon svg type={MapSex[item]} size={20} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.itemStyle}>
          <Text style={styles.label}>近期登录时间:</Text>
          <TouchableOpacity
            onPress={handleSelectLastLogin}
            activeOpacity={0.8}
          >
            <Text style={styles.valueText}>{lastLogin || '请选择近期登录时间'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.distance}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.label}>距离:</Text>
            <Text style={styles.valueText}>{`${distance}km`}</Text>
          </View>
          <Slider
            value={distance}
            minimumValue={0}
            maximumValue={10}
            step={0.5}
            onValueChange={handleChangeDistance}
          />
        </View>
        <View style={styles.itemStyle}>
          <Text style={styles.label}>居住地:</Text>
          <TouchableOpacity
            onPress={handleSelectCity}
            activeOpacity={0.8}
          >
            <Text style={styles.valueText}>{city || '请选择居住地'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.itemStyle}>
          <Text style={styles.label}>学历:</Text>
          <TouchableOpacity
            onPress={handleSelectEducation}
            activeOpacity={0.8}
          >
            <Text style={styles.valueText}>{education || '请选择学历'}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Button onPress={handleSubmit}>确认</Button>
    </View>
  );
}

export default FilterPanel;
