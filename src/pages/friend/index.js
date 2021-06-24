import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StatusBar, TouchableOpacity, Image } from 'react-native';
import HeaderImageScrollView from 'react-native-image-header-scroll-view';
import { Overlay } from 'teaset';
import { NavigationContext } from '@react-navigation/native';
import LoadingText from '../../components/loadingText';
import { pxToDp } from '../../utils/stylesKits';
import request from '../../utils/request';
import { FRIENDS_RECOMMEND } from '../../utils/pathMap';
import Header from './components/header';
import Visitors from './components/visitors';
import PerfectPerson from './components/perfect';
import Icon from '../../components/Icon';
import ItemCard from './components/itemCard';
import FilterPanel from './components/filterPanel';
import styles from './style';

const Friend = () => {
  // 筛选接口获取数据参数
  const [params, setParams] = useState({
    page: 1,
    pagesize: 10,
    gender: '男',
    distance: 2,
    lastLogin: '',
    city: '',
    education: '',
  });

  // 推荐朋友数据
  const [recommends, setRecommends] = useState([]);
  // 总的页面数
  const [totalPages, setTotalPages] = useState(10);
  // 当前是否正在请求数据(滚动事件分页中节流操作)
  const [isLoading, setIsLoading] = useState(false);

  // 获取路由 navigation 对象
  const navigation = useContext(NavigationContext);

  useEffect(() => {
    getRecommends();
  }, [])

  // 获取用户列表数据信息
  const getRecommends = async (filterParams = {}) => {
    const res = await request.privateGet(FRIENDS_RECOMMEND, { ...params, ...filterParams });
    if (res && res.data) {
      setRecommends([...recommends, ...res.data]);
      // setTotalPages(4) // res.pages 后端目前一直返回 1, 总数量 res.count 也是一直返回 5
      setIsLoading(false);
    }
  }

  // 筛选弹框提交函数
  const handleConfirm = (paramsData) => {
    getRecommends(paramsData);
    setParams({ ...params, ...paramsData });
  }

  // 显示筛选弹框
  const recommendFilterShow = () => {
    const { page, pagesize, ...restParams } = params;
    let overlayRef = null;
    let overlayView = (
      <Overlay.View
        modal={true}
        overlayOpacity={0.3}
        ref={v => overlayRef = v}
        >
        <FilterPanel
          params={restParams}
          onClose={() => overlayRef.close()}
          onConfirm={handleConfirm}
        />
      </Overlay.View>
    );
    Overlay.show(overlayView);
  }

  // 滚动加载分页
  const handleScroll = ({ nativeEvent }) => {
    const {
      contentSize,
      layoutMeasurement,
      contentOffset,
    } = nativeEvent;

    /**
     * 滚动条触底
     * contentSize.height 滚动列表的高度
     * layoutMeasurement.height 可视区域的高度(可以看作屏幕的高度)
     * contentOffset.y 滚动条距离顶部的距离
     */
    const isReachBottom = (contentSize.height - layoutMeasurement.height - contentOffset.y) < 10;

    const hasMore = params.page < totalPages;
    if (isReachBottom && hasMore && !isLoading) {
      const data = {
        ...params,
        page: params.page + 1,
      }
      setIsLoading(true);
      setParams(data);
      getRecommends(data);
    }
  }

  return (
    <HeaderImageScrollView
      onScroll={handleScroll}
      maxHeight={pxToDp(150)}
      minHeight={44}
      headerImage={require("../../images/headfriend.png")}
      renderForeground={() => (
        <View style={styles.foregroundWrap} >
          <StatusBar
            backgroundColor="transparent"
            translucent
          />
          <Header />
        </View>
      )}
    >
      <>
        <Visitors />
        <View style={styles.container}>
          <PerfectPerson />
          <View style={styles.recommendWrap}>
            <Text style={styles.textColor}>推荐</Text>
            <TouchableOpacity activeOpacity={0.8} onPress={recommendFilterShow}>
              <Icon type='iconshaixuan' size={14} color='#666' />
            </TouchableOpacity>
          </View>
        </View>
        {recommends.map((recommend, i) => (
          <TouchableOpacity
            key={i}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Detail', { id: recommend.id })}
          >
            <ItemCard
              recommend={recommend}
            />
          </TouchableOpacity>
        ))}
        <LoadingText isMore={(params.page < totalPages) && !isLoading} />
      </>
    </HeaderImageScrollView>
  )
}

export default Friend;
