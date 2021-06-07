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
    pagesize: 5,
  });
  const [detail, setDetail] = useState({});

  useEffect(() => {
    (async () => {
      const url = FRIENDS_PERSONALINFO.replace(':id', route.params.id);
      const res = await request.privateGet(url, params);

      if (res && res.data) {
        setDetail(res.data);
      }
    })()
  }, [])

  if (!detail.silder) {
    return null;
  }

  return (
    <HeaderImageScrollView
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
              <Text style={styles.messageNum}>3</Text>
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
          {detail.trends.map((user, index) => (
            <DynamicCard
              key={index}
              userDetail={detail}
              userInfo={user}
              currentUser={index}
            />
          ))}
        </View>
      </View>
    </HeaderImageScrollView>
  );
}

export default Detail;
