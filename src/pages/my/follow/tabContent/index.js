import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import SearchBar from '../../../../components/SearchBar';
import UserCard from '../../components/userCard';
import styles from './style';

const TabContent = (props) => {
  const { data, rightExtra } = props;

  const [inputValue, setInputValue] = useState();

  // 搜索输入框改变事件
  const handleChange = (text) => {
    setInputValue(text);
  }

  // 搜索功能过滤
  const listData = inputValue ? data.filter(user => user.nick_name.includes(inputValue)) : data;

  return (
    <>
      <SearchBar
          placeholder='搜索用户'
          value={inputValue}
          onChangeText={handleChange}
          style={styles.searchBarWrap}
        />
      <ScrollView contentContainerStyle={styles.container}>
        {listData.map((user, key) => (
          <UserCard
            key={key}
            user={user}
            showCity
            rightExtra={rightExtra}
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
      </ScrollView>
    </>
  );
}

export default TabContent;
