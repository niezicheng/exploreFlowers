import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Modal, TextInput } from 'react-native';
import NavHerder from '../../../../components/NavHeader';
import Button from '../../../../components/LGButton';
import Icon from '../../../../components/Icon';
import LoadingText from '../../../../components/loadingText';
import DynamicCard from '../../components/dynamicCard';
import request from '../../../../utils/request';
import { QZ_DT_PL, BASE_URI, QZ_DT_PL_DZ, QZ_DT_PL_TJ } from '../../../../utils/pathMap';
import { pxToDp } from '../../../../utils/stylesKits';
import date from '../../../../utils/date';
import styles from './style';
import Toast from '../../../../utils/Toast';
import validator from '../../../../utils/validator';
import { EMOTIONS_DATA } from '../../../../components/Emotion/datasource';

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
  const [visible, setVisible] = useState(false); // 发表评论 modal 显/隐
  const [inputValue, setInputValue] = useState(''); // 发表评论内容值

  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState();

  useEffect(() => {
    getCommentList();
  }, [])

  // 获取评论信息
  const getCommentList = async (paramsData, commentListData) => {
    const { tid } = user;
    const url = QZ_DT_PL.replace(':id', tid);

    const res = await request.privateGet(url, paramsData || params);
    const prevData = commentListData || commentList;

    if (res && res.code === '10000') {
      setCommentList([...prevData, ...res.data]);
      setTotal(res.counts);
      setTotalPages(res.pages);
      setIsLoading(false);
    }
  }

  // 点赞事件
  const handleStar = async (comment) => {
    const { cid } = comment;
    const url = QZ_DT_PL_DZ.replace(':id', cid);
    await request.privateGet(url);

    Toast.smile('点赞成功');
    setParams({ ...params, page: 1 });
    getCommentList({ ...params, page: 1 }, []);
  }

  // 显示评论模态框
  const showCommentModal = () => {
    setVisible(true);
  }

  // 关闭评论模态框
  const closeCommentModal = () => {
    setVisible(false);
    setInputValue('');
  }

  // input change 事件
  const handleInputChange = (value) => {
    setInputValue(value);
  }

  // 发送评论信息
  const handleSendComment = async () => {
    // 评论非空判断是否发布评论
    if (!inputValue.trim()) {
      Toast.smile('评论内容不能为空!');
      return;
    }
    // 调用接口发布评论内容
    const data = { comment: inputValue }
    const url = QZ_DT_PL_TJ.replace(':id', user.tid);
    const res = await request.privatePost(url, data);

    if (res && res.code === '10000') {
      // 关闭 modal
      closeCommentModal();

      // 重新获取评论信息列表
      setParams({ ...params, page: 1 })
      getCommentList({ ...params, page: 1 }, []);

      Toast.smile(res.data);
    }
  }

  // 滚动分页功能
  const handleScroll = ({ nativeEvent }) => {
    const {
      contentSize,
      layoutMeasurement,
      contentOffset
    } = nativeEvent;

    // 滚动条触底
    const isReachBottom = (contentSize.height - layoutMeasurement.height - contentOffset.y) < 10;

    // 是否存在下一页数据, 添加节流操作 isLoading
    const hasMore = params.page < totalPages;
    if (isReachBottom && hasMore && !isLoading) {
      const data = {
        ...params,
        page: params.page + 1,
      };
      setIsLoading(true);
      setParams(data);
      getCommentList(data);
    }
  }

  // 渲染富文本内容
  const renderRichText = (text) => {
    const list = validator.renderRichText(text);

    return (list.map((v, i) => {
      if (v.text) {
        return (
          <Text key={i} style={{ color: '#666' }}>{v.text}</Text>
        );
      } else if (v.image) {
        return (
          <Image
            key={i}
            style={{ width: pxToDp(25), height: pxToDp(25) }}
            source={EMOTIONS_DATA[v.image]}
          />
        );
      } else {
        return null;
      }
    }))
  }

  return (
    <>
      <NavHerder title='最新评论' />
      <View style={styles.container}>
        <DynamicCard user={user} renderRichText={renderRichText} />
        <View style={styles.newCommentWrap}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text>最新评论</Text>
            <Text style={styles.badge}>{total}</Text>
          </View>
          <Button
            onPress={showCommentModal}
            style={styles.btn}
            textStyle={styles.btnText}
          >
            发表评论
          </Button>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
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
          <LoadingText isMore={(params.page < totalPages) && !isLoading} />
        </ScrollView>
        <Modal
          visible={visible}
          transparent={true}
          animationType="slide"
          onRequestClose={closeCommentModal}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={closeCommentModal}
            style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          >
            <View style={styles.modalContainer}>
              <TextInput
                value={inputValue}
                onChangeText={handleInputChange}
                autoFocus
                placeholder='请输入评论内容'
                onSubmitEditing={handleSendComment}
                style={styles.input}
              />
              <Text onPress={handleSendComment} style={styles.sendText}>发布</Text>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    </>
  );
}

export default Comment;
