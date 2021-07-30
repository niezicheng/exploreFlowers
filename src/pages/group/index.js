import React from 'react';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import CustomerBar from './components/customerBar';
import Recommend from './recommend';
import Latest from './latest';

export default () => {

  return (
    <ScrollableTabView
      initialPage={0}
      locked
      renderTabBar={() => <CustomerBar />}
    >
      <Recommend tabLabel='推荐' />
      <Latest tabLabel='最新' />
    </ScrollableTabView>
  );
}