import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Icon from '../../../components/Icon';
import { pxToDp } from '../../../utils/stylesKits';
import { MY_LIKELIST } from '../../../utils/pathMap';
import request from '../../../utils/request';
import CustomerBar from '../../group/components/customerBar';
import TabContent from './tabContent';
import styles from './style';

export default (props) => {
  const { route: { params } } = props;
  const [data, setData] = useState({
    likeeachlist: [], // 互相关注数据
    ilikelist: [], // 喜欢数据
    likemelist: [], // 粉丝数据
  });

  // 喜欢各项卡片右边展示信息
  const likeExtra = () => {
    return (
      <Icon
        type="iconxihuan"
        size={40}
        color='red'
        style={styles.likeIcon}
      />
    );
  }

  // 相互关注各项卡片右边展示信息
  const eachLikeExtra = () => {
    return (
      <TouchableOpacity activeOpacity={0.8} style={styles.eachLikeWrap}>
        <Icon type="iconjia" size={pxToDp(16)} color="#666" />
        {/* <Icon type="iconhuxiangguanzhu" size={pxToDp(16)} color="#666" /> */}
        <Text style={styles.textStyle}>已关注</Text>
      </TouchableOpacity>
    );
  }

  const TabsContentData = [{
    label: '互相关注',
    data: data.likeeachlist,
    rightExtra: eachLikeExtra,
  }, {
    label: '喜欢',
    data: data.ilikelist,
    rightExtra: likeExtra,
  }, {
    label: '粉丝',
    data: data.likemelist,
  }]

  useEffect(() => {
    getMyLikesData();
  }, [])

  // 获取我的关注、喜欢和粉丝相关信息
  const getMyLikesData = async() => {
    const res = await request.privateGet(MY_LIKELIST);

    if (res && res.code === '10000') {
      setData(res.data);
    }
  }

  return (
    <ScrollableTabView
      initialPage={params}
      locked
      renderTabBar={() => <CustomerBar showBackIcon />}
    >
      {TabsContentData.map((tabContent, index) => (
        <TabContent
          key={index}
          tabLabel={tabContent.label}
          data={tabContent.data}
          rightExtra={tabContent.rightExtra}
        />
      ))}
    </ScrollableTabView>
  );
}