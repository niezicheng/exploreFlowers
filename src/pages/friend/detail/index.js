import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import HeaderImageScrollView from 'react-native-image-header-scroll-view';
import { Carousel } from 'teaset';
import LinearGradient from 'react-native-linear-gradient';
import Icon from '../../../components/Icon';
import request from '../../../utils/request';
import { pxToDp } from '../../../utils/stylesKits';
import { FRIENDS_PERSONALINFO, BASE_URI } from '../../../utils/pathMap';
import UserInfoCard from './userInfoCard';
import DynamicCard from './dynamicCard';
import styles from './style';

const Detail = (props) => {
  const { route } = props;

  const [params, setParams] = useState({
    page: 1,
    pagesize: 10,
  });
  const [detail, setDetail] = useState({});
  // 当前用户动态数组
  const [trends, setTrends] = useState([]);
  // 总的页面数
  const [totalPages, setTotalPages] = useState(1);
  // 当前是否正在请求数据(滚动事件分页中节流操作)
  const [isLoading, setIsLoading] = useState(false);

  const getDetail = async (data) => {
    const url = FRIENDS_PERSONALINFO.replace(':id', route.params.id);
    const res = await request.privateGet(url, data || params);

    if (res && res.data) {
      setDetail(res.data);
      setTotalPages(res.pages);
      setIsLoading(false);
      // 使用用户动态数据分页后单独提取用户动态数据数组信息
      setTrends([...trends, ...res.data.trends])
    }
  }

  useEffect(() => {
    getDetail();
  }, [])

  // 列表滚动事件
  const handleScroll = ({ nativeEvent }) => {
    const {
      contentSize,
      layoutMeasurement,
      contentOffset
    } = nativeEvent;

    // 滚动条触底
    const isReachBottom = (contentSize.height - layoutMeasurement.height - contentOffset.y) < 10;

    // 是否存在下一页数据
    const hasMore = params.page < totalPages;
    if (isReachBottom && hasMore && !isLoading) {
      const data = {
        ...params,
        page: params.page + 1,
      };
      setIsLoading(true);
      setParams(data);
      getDetail(data);
    }
  }

  if (!detail.silder) {
    return null;
  }

  return (
    <HeaderImageScrollView
      onScroll={handleScroll}
      maxHeight={pxToDp(220)}
      minHeight={pxToDp(40)}
      renderForeground={() => (
        <Carousel
          control
          style={{ height: pxToDp(220) }}
        >
          {detail.silder.map((page, index) => (
            <Image
              key={index}
              source={{ uri: `${BASE_URI}${page.thum_img_path}` }}
              style={{ width: '100%', height: '100%' }}
            />
          ))}
        </Carousel>
      )}
    >
      <View>
        <UserInfoCard userDetail={detail} />
        <View style={styles.dynamicTop}>
          <View style={styles.dynamicTopLeft}>
            <Text style={styles.title}>动态</Text>
            <View style={styles.messageWrap}>
              <Text style={styles.messageNum}>{trends.length}</Text>
            </View>
          </View>
          <View style={styles.dynamicTopRight}>
            <TouchableOpacity
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#f2ab5a', '#ec7c50']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.btnWrap}
              >
                <Icon type='iconliaotian' color='#fff' />
                <Text style={styles.btnText}>聊一下</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#6d47f8', '#e56b7f']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.btnWrap}
              >
                <Icon type='iconxihuan-o' color='#fff' />
                <Text style={styles.btnText}>喜欢</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.dynamicBody}>
          {trends.map((user, index) => (
            <DynamicCard
              key={index}
              userDetail={detail}
              userInfo={user}
              currentUser={index}
            />
          ))}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: pxToDp(10) }}>
          <View style={{ flex: 1, height: 1, backgroundColor: '#CCCCCC' }} />
          <Text style={{ color: '#CCCCCC', marginHorizontal: pxToDp(10) }}>
            { params.page < totalPages ? '加载更多' :  '没有更多了'}
          </Text>
          <View style={{ flex: 1, height: 1, backgroundColor: '#CCCCCC' }} />
        </View>
        </View>
      </View>
    </HeaderImageScrollView>
  );
}

export default Detail;
