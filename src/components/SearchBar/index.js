import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { pxToDp } from '../../utils/stylesKits';
import Icon from '../Icon';
import styles from './style';

const SearchBar = (props) => {
  const {
    inputStyle,
    style,
    placeholder,
    ...restProps
  } = props;

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity activeOpacity={0.8} onPress={() => {}}>
        <Icon type='iconsousuo' color='#666' size={pxToDp(18)} />
      </TouchableOpacity>
      <TextInput
        {...restProps}
        placeholder={placeholder || '请输入'}
        style={[styles.input, inputStyle]}
      />
    </View>
  )
}

export default SearchBar;