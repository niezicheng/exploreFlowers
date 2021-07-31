import React, { useEffect, useState } from 'react';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { MY_LIKELIST } from '../../../utils/pathMap';
import request from '../../../utils/request';
import CustomerBar from '../../group/components/customerBar';
import EachLove from './eachLove';
import Love from './love';
import Fan from './fan';

export default (props) => {
  const { route: { params } } = props;
  const [data, setData] = useState({
    likeeachlist: [], // 互相关注数据
    ilikelist: [], // 喜欢数据
    likemelist: [], // 粉丝数据
  });

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
      initialPage={1}
      locked
      renderTabBar={() => <CustomerBar showBackIcon />}
    >
      <EachLove tabLabel='互相关注' data={data.likeeachlist} />
      <Love tabLabel='喜欢' data={data.ilikelist} />
      <Fan tabLabel='粉丝' data={data.likemelist} />
    </ScrollableTabView>
  );
}