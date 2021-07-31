import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { inject, observer } from 'mobx-react';
import { NavigationContext } from '@react-navigation/native';
import NavHeader from '../../../components/NavHeader';
import Icon from '../../../components/Icon';
import LoadingText from '../../../components/loadingText';
import request from '../../../utils/request';
import { QZ_DT_DZ, MY_TRENDS  } from '../../../utils/pathMap';
import { pxToDp } from '../../../utils/stylesKits';
import Toast from '../../../utils/Toast';
import JMessage from '../../../utils/JMessage';
import DynamicCard from '../../group/components/dynamicCard';
import styles from './style';

const Trends = (props) => {
  const context = useContext(NavigationContext);
  const { user } = props.UserStore;

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
    const res = await request.privateGet(MY_TRENDS, paramsData || params);
    if (res.code === '10000') {
      const prevData = prevListData || listData
      setListData([ ...prevData, ...res.data ]);
      setTotalPages(res.pages);
      setIsLoading(false);
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
          owner={user}
          isRenderRichText
          handelMore={false}
        />
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon type="icondianzan-o" size={18} color={currentUserIndex === index ? starColor : '#666'} />
            <Text style={{ color: currentUserIndex === index ? starColor : '#666', marginLeft: pxToDp(2) }}>{item.star_count}</Text>
          </View>
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
    <>
      <NavHeader
        title="我的动态"
        isShowBackText={false}
      />
      <FlatList
        data={listData}
        keyExtractor={(item, index) => `${item.tid}-${index}`}
        renderItem={renderItem}
        onEndReachedThreshold={0.1}
        onEndReached={onEndReached}
      />
    </>
  );
}

export default inject('UserStore')(observer(Trends));

