import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import NavHeader from '../../../components/NavHeader';
import LoadingText from '../../../components/loadingText';
import request from '../../../utils/request';
import { FRIENDS_VISITORS } from '../../../utils/pathMap';
import Visitors from '../../friend/components/visitors';
import ItemCard from '../../friend/components/itemCard';

const MyVisitors = () => {
  // 筛选接口获取数据参数
  const [params, setParams] = useState({
    page: 1,
    pagesize: 10,
  });

  // 推荐朋友数据
  const [recommends, setRecommends] = useState([]);
  // 总的页面数
  const [totalPages, setTotalPages] = useState(0);
  // 当前是否正在请求数据(滚动事件分页中节流操作)
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getRecommends();
  }, [])

  // 获取用户列表数据信息
  const getRecommends = async (filterParams = {}) => {
    const res = await request.privateGet(FRIENDS_VISITORS, { ...params, ...filterParams });
    if (res && res.data) {
      setRecommends([...recommends, ...res.data]);
      // setTotalPages(4) // res.pages 后端目前一直返回 1, 总数量 res.count 也是一直返回 5
      setIsLoading(false);
    }
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
    <>
      <NavHeader title="谁看过我" isShowBackText={false} />
      <Visitors
        showRightArrow={false}
      />
      <ScrollView
        style={{ flex: 1 }}
        onScroll={handleScroll}
      >
        {recommends.map((recommend, i) => (
          <ItemCard
            key={i}
            recommend={recommend}
          />
        ))}
        <LoadingText isMore={(params.page < totalPages) && !isLoading} />
      </ScrollView>
    </>
  )
}

export default MyVisitors;
