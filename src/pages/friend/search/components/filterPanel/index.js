import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Slider } from 'react-native-elements';
import Icon from '../../../../../components/Icon';
import Button  from '../../../../../components/LGButton';
import styles from './style';

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

  const {gender, distance } = state;

  // 选择性别
  const handleChangeSex = (genderParams) => {
    // 性别为接口非必提交参数数据，可以不进行筛选选择
    if (genderParams === gender) {
      genderParams = '';
    }
    setState({ ...state, gender: genderParams });
  }

  // 选择距离
  const handleChangeDistance = (distance) => {
    setState({ ...state, distance })
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
        <View style={styles.distance}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.label}>距离:</Text>
            <Text style={styles.valueText}>{`${distance}M`}</Text>
          </View>
          <Slider
            value={distance}
            minimumValue={0}
            maximumValue={100000}
            step={1}
            onValueChange={handleChangeDistance}
          />
        </View>
      </View>
      <Button onPress={handleSubmit}>确认</Button>
    </View>
  );
}

export default FilterPanel;
