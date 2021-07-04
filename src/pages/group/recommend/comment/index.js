import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import NavHerder from '../../../../components/NavHeader';
import Button from '../../../../components/LGButton';
import Icon from '../../../../components/Icon';
import DynamicCard from '../../components/dynamicCard';
import request from '../../../../utils/request';
import { QZ_DT_PL, BASE_URI, QZ_DT_PL_DZ } from '../../../../utils/pathMap';
import { pxToDp } from '../../../../utils/stylesKits';
import date from '../../../../utils/date';
import styles from './style';
import Toast from '../../../../utils/Toast';

// {
//   "cid":253,
//   "content":"Jjjjj",
//   "create_time":"2021-06-15T14:27:28.000Z",
//   "header":"/upload/162346982772318202080079.jpg",
//   "nick_name":"undefined",
//   "parent_cid":0,
//   "star":0,
//   "tid":313,
//   "uid":2185
// }

const Comment = (props) => {
  const { route: { params: user } } = props;

  const [params, setParams] = useState({
    page: 1,
    pagesize: 10
  });  // 分页参数

  const [commentList, setCommentList] = useState([]); // 评论数据
  const [total, setTotal] = useState(0); // 总评论条数

  useEffect(() => {
    getCommentList();
  }, [])

  // 获取评论信息
  const getCommentList = async (paramsData) => {
    const { tid } = user;
    const url = QZ_DT_PL.replace(':id', tid);

    const res = await request.privateGet(url, paramsData || params);

    if (res && res.code === '10000') {
      console.log(res)
      setCommentList(res.data);
      setTotal(res.counts);
    }
  }

  // 点赞事件
  const handleStar = async (comment) => {
    const { cid } = comment;
    const url = QZ_DT_PL_DZ.replace(':id', cid);
    await request.privateGet(url);

    Toast.smile('点赞成功');
    setParams({ ...params, page: 1 });
    getCommentList({ ...params, page: 1 });
  }

  return (
    <>
      <NavHerder title='最新评论' />
      <View style={styles.container}>
        <DynamicCard user={user} />
        <View style={styles.newCommentWrap}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text>最新评论</Text>
            <Text style={styles.badge}>{total}</Text>
          </View>
          <Button
            style={styles.btn}
            textStyle={styles.btnText}
          >
            发表评论
          </Button>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          {commentList.map((item, index) => (
            <View key={index} style={styles.commWrap}>
              <Image source={{ uri: `${BASE_URI}${item.header}` }} style={ styles.headerImg } />
              <View style={{ flex: 1 }}>
                <Text style={styles.commText}>{item.nick_name}</Text>
                <Text style={styles.commText}>{date(item.create_time).format('YYYY-MM-DD HH:mm:ss')}</Text>
                <Text>{item.content}</Text>
              </View>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => handleStar(item)}
                style={{ flexDirection: 'row', alignItems: 'center' }}
              >
                <Icon type="icondianzan-o" size={18} color='#666' />
                <Text style={{ color: '#666', marginLeft: pxToDp(2) }}>{item.star}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    </>
  );
}

export default Comment;
