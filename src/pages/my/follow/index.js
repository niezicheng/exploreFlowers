import React from 'react';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import CustomerBar from '../../group/components/customerBar';
import EachLove from './eachLove';
import Love from './love';
import Fan from './fan';

export default (props) => {
  const { route: { params } } = props;

  return (
    <ScrollableTabView
      initialPage={params}
      locked
      renderTabBar={() => <CustomerBar showBackIcon />}
    >
      <EachLove tabLabel='互相关注' />
      <Love tabLabel='喜欢' />
      <Fan tabLabel='粉丝' />
    </ScrollableTabView>
  );
}