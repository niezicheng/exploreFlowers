import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, Image, Modal, TouchableOpacity } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import { ActionSheet } from 'teaset';
import { inject, observer } from 'mobx-react';
import { NavigationContext } from '@react-navigation/native';
import Icon from '../../../components/Icon';
import LoadingText from '../../../components/loadingText';
import request from '../../../utils/request';
import { QZ_TJDT, BASE_URI, QZ_DT_DZ, QZ_DT_XH, QZ_DT_BGXQ } from '../../../utils/pathMap';
import { pxToDp } from '../../../utils/stylesKits';
import date  from '../../../utils/date';
import styles from './style';
import Toast from '../../../utils/Toast';
import JMessage from '../../../utils/JMessage'


const Recommend = (props) => {
  const context = useContext(NavigationContext);

  const [params, setParams] = useState({
    page: 1,
    pagesize: 10,
  }); // 接口参数
  const [listData, setListData] = useState([]); // 数据数组
  const [visible, setVisible] = useState(false); // 显示预览图片 modal
  const [imgUrls, setImgUrls] = useState([]); // 预览的图片数组
  const [current, setCurrent] = useState(0); // 当前预览的图片索引

  const [totalPages, setTotalPages] = useState(2); // 数据总的页数
  const [isLoading, setIsLoading] = useState(false); // 是否正在请求数据信息

  const [currentUserIndex, setCurrentUserIndex] = useState(); // 动态数据用户对应的索引
  const [starColor, setStarColor] = useState('#666'); // 点赞图标颜色
  const [likeColor, setLickColor] = useState('#666'); // 喜欢图标颜色

  useEffect(() => {
    getList();
  }, [])

  // 获取展示的数据信息
  const getList = async(paramsData, prevListData) => {
    const res = await request.privateGet(QZ_TJDT, paramsData || params);
    if (res.code === '10000') {
      const prevData = prevListData || listData
      setListData([ ...prevData, ...res.data ]);
      setTotalPages(res.pages);
      setIsLoading(false);
    }
  }

  // 图片点击预览方法
  const handleShowImg = (images, index) => {
    const imgUrls = images.map(item => ({ url: `${BASE_URI}${item.thum_img_path}` }))
    setImgUrls(imgUrls);
    setVisible(true);
    setCurrent(index);
  }

  // 点赞图标点击事件
  const handleStar = async (user, index) => {
    // 1、发送点赞接口请求获取返回值：点赞成功还是去取消点赞
    const { tid, guid } = user;
    const url = QZ_DT_DZ.replace(':id', tid);
    setCurrentUserIndex(index);
    const res = await request.privateGet(url);

    if (res && res.code === '10000') {
      if (res.data.iscancelstar) {
        // 取消点赞
        Toast.message('取消成功', 500, 'center');
        setStarColor('#666');
      } else {
        // 点赞成功
        Toast.smile('点赞成功');
        setStarColor('#FEAB00');

        // 2、点赞成功通过极光通讯发送点赞信息
        const text = `${props.UserStore.user.nick_name} 点赞了你的动态`;
        const extras = { user: JSON.stringify(props.UserStore.user) }
        JMessage.sendTextMessage(guid, text, extras);
      }

      // 3、重新发送请求获取列表数据
      setParams({ ...params, page: 1 });
      // 注意重置 listData 数据需要将其作为函数参数传递，使用 setListData 异步赋值延时
      getList({ ...params, page: 1 }, []);
    }
  }


  // 喜欢图标点击事件
  const handleLike = async (user, index) => {
    // 1、发送喜欢接口请求获取返回值：喜欢成功还是去取消喜欢
    const { tid } = user;
    setCurrentUserIndex(index);
    const url = QZ_DT_XH.replace(':id', tid);
    const res = await request.privateGet(url);

    if (res && res.code === '10000') {
      if (res.data.iscancelstar) {
        // 取消喜欢
        Toast.message('取消成功', 500, 'center');
        setLickColor('#666');
      } else {
        // 喜欢成功
        Toast.smile('喜欢成功');
        setLickColor('red');
      }

      // 3、重新发送请求获取列表数据
      setParams({ ...params, page: 1 });
      // 注意重置 listData 数据需要将其作为函数参数传递，使用 setListData 异步赋值延时
      getList({ ...params, page: 1 }, []);
    }
  }

  // 动态卡片更多操作按钮
  const handelMore = async (user) => {
    const opts = [{
      title: '举报',
      onPress: () => alert('举报'),
    }, {
      title: '不感兴趣',
      onPress: () => noInterest(user),
    }];

    ActionSheet.show(opts, { title: '取消' });
  }

  // 不感兴趣的用户不会出现在信息展示列表
  const noInterest = async (user) => {
    const { tid } = user;
    const url = QZ_DT_BGXQ.replace(':id', tid);
    const res = await request.privateGet(url);

    if (res && res.code === '10000') {
      Toast.smile('操作成功');
      setParams({ ...params, page: 1 });
      getList({ ...params, page: 1 }, []);
    }
  }

  // 跳转到评论页面
  const goToComment = (user) => {
    context.navigate('Comment', user);
  }

  // 数据渲染卡片内容
  const renderItem = ({ item, index }) => (
    <React.Fragment key={item.tid}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={{ uri: `${BASE_URI}${item.header}` }}
            style={styles.avatar}
          />
          <View style={styles.headerRight}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: pxToDp(10) }}>
              <Text style={[styles.textColor, { fontWeight: 'bold'}]}>{item.nick_name}</Text>
              <Icon
                type={item.gender === '男' ? 'icontanhuanan' : 'icontanhuanv'}
                color={item.gender === '男' ? 'red' : '#b564bf'}
                size={18}
                style={styles.genderIcon}
              />
              <Text style={[styles.textColor, { fontWeight: 'bold', }]}>{`${item.age}岁`}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.textColor}>{item.marry}</Text>
              <Text style={styles.textColor}> | </Text>
              <Text style={styles.textColor}>{item.xueli}</Text>
              <Text style={styles.textColor}> | </Text>
              <Text style={styles.textColor}>{item.agediff < 10 ? '年龄相仿' : '有点代沟'}</Text>
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handelMore(item)}
          >
            <Icon type="icongengduo" size={18} color="#666" />
          </TouchableOpacity>
        </View>

        <Text style={styles.contentText}>{item.content}</Text>
        <View style={styles.imgWrap}>
          {item.images.map((imgScr, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleShowImg(item.images, index)}
            >
              <Image
                source={{ uri: `${BASE_URI}${imgScr.thum_img_path}`}}
                style={styles.dynamicImg}
              />
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: pxToDp(5) }}>
          <Text style={{ color: '#666', marginRight: pxToDp(10) }}>距离 {item.dist} km</Text>
          <Text style={{ color: '#666' }}>{date(item.create_time).fromNow()}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handleStar(item, index)}
            style={{ flexDirection: 'row', alignItems: 'center' }}
          >
            <Icon type="icondianzan-o" size={18} color={currentUserIndex === index ? starColor : '#666'} />
            <Text style={{ color: currentUserIndex === index ? starColor : '#666', marginLeft: pxToDp(2) }}>{item.star_count}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => goToComment(item)}
            style={{ flexDirection: 'row', alignItems: 'center' }}
          >
            <Icon type="iconpinglun" size={18} color="#666" style={{ marginTop: pxToDp(4) }} />
            <Text style={{ color: '#666', marginLeft: pxToDp(2) }}>{item.comment_count}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handleLike(item, index)}
            style={{ flexDirection: 'row', alignItems: 'center' }}
          >
            <Icon type="iconxihuan-o" size={18} color={currentUserIndex === index ? likeColor : '#666'} />
            <Text style={{ color: currentUserIndex === index ? likeColor : '#666', marginLeft: pxToDp(2) }}>{item.like_count}</Text>
          </TouchableOpacity>
        </View>
        <Modal visible={visible} transparent>
          <ImageViewer
            imageUrls={imgUrls}
            index={current}
            onClick={() => setVisible(false)}
          />
        </Modal>
      </View>
      {
        index === listData.length - 1 && (
          <LoadingText isMore={(params.page < totalPages) && !isLoading} moreText='' />
        )
      }
    </React.Fragment>
  )

  // 触发触底事件
  const onEndReached = () => {
    const { page } = params;
    // 是否存在下一页数据信息
    if (page >= totalPages || isLoading) {
      return;
    } else {
      setIsLoading(true);
      setParams({
        ...params,
        page: page + 1
      });
      getList({ ...params, page: page + 1 });
    }
    // 节流阀
  }

  return (
    <FlatList
      data={listData}
      keyExtractor={(item, index) => `${item.tid}-${index}`}
      renderItem={renderItem}
      onEndReachedThreshold={0.1}
      onEndReached={onEndReached}
    />
  );
}

export default inject('UserStore')(observer(Recommend));
