import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { inject, observer } from 'mobx-react';
import { NavigationContext } from '@react-navigation/native';
import Icon from '../../../components/Icon';
import LoadingText from '../../../components/loadingText';
import request from '../../../utils/request';
import { QZ_ZXDT, QZ_DT_DZ  } from '../../../utils/pathMap';
import { pxToDp } from '../../../utils/stylesKits';
import Toast from '../../../utils/Toast';
import JMessage from '../../../utils/JMessage';
import DynamicCard from '../components/dynamicCard';
import styles from './style';


const Recommend = (props) => {
  const context = useContext(NavigationContext);

  const [params, setParams] = useState({
    page: 1,
    pagesize: 10,
  }); // 接口参数

  const [listData, setListData] = useState([]); // 数据数组
  const [totalPages, setTotalPages] = useState(2); // 数据总的页数
  const [isLoading, setIsLoading] = useState(false); // 是否正在请求数据信息

  const [currentUserIndex, setCurrentUserIndex] = useState(); // 动态数据用户对应的索引
  const [starColor, setStarColor] = useState('#666'); // 点赞图标颜色

  useEffect(() => {
    getList();
  }, [])

  // 获取展示的数据信息
  const getList = async(paramsData, prevListData) => {
    const res = await request.privateGet(QZ_ZXDT, paramsData || params);
    if (res.code === '10000') {
      const prevData = prevListData || listData
      setListData([ ...prevData, ...res.data ]);
      setTotalPages(res.pages);
      setIsLoading(false);
    }
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

  // 跳转到评论页面
  const goToComment = (user) => {
    context.navigate('Comment', user);
  }

  // 数据渲染卡片内容
  const renderItem = ({ item, index }) => (
    <React.Fragment key={item.tid}>
      <View style={styles.container}>
        <DynamicCard
          user={item}
          isRenderRichText
          handelMore={false}
        />
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
          <View />
        </View>
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
      // 节流阀
      setIsLoading(true);
      setParams({
        ...params,
        page: page + 1
      });
      getList({ ...params, page: page + 1 });
    }
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
