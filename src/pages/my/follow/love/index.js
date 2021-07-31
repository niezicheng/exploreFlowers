import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import SearchBar from '../../../../components/SearchBar';
import Icon from '../../../../components/Icon';
import UserCard from '../../components/userCard';
import styles from './style';
import { pxToDp } from '../../../../utils/stylesKits';

const Love = (props) => {
  const { data } = props;

  const [inputValue, setInputValue] = useState();

  // const rightExtra = () => {
  //   return (
  //     <Icon
  //       type="iconxihuan"
  //       size={40}
  //       color='red'
  //       style={styles.likeIcon}
  //     />
  //   );
  // }

  const rightExtra = () => {
    return (
      <TouchableOpacity activeOpacity={0.8} style={styles.eachLikeWrap}>
        <Icon type="iconjia" size={pxToDp(16)} color="#666" />
        <Text style={styles.textStyle}>已关注</Text>
      </TouchableOpacity>
    );
  }

  // 搜索输入框改变事件
  const handleChange = (text) => {
    setInputValue(text);
  }

  // 搜索功能过滤
  const listData = data.filter(user => user.nick_name.includes(inputValue));

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder='搜索用户'
        value={inputValue}
        onChangeText={handleChange}
        style={styles.searchBarWrap}
      />
      {listData.map((user, key) => (
        <UserCard
          key={key}
          user={user}
          showCity
          rightExtra={rightExtra()}
          cityIconColor='#666'
          cityTextStyle={{ color: '#666' }}
          style={[
            styles.userCard,
            key !== (listData.length - 1) && {
              borderBottomWidth: 1,
              borderBottomColor: '#CCC',
            }
          ]}
        />
      ))}
    </View>
  );
}

export default Love;
