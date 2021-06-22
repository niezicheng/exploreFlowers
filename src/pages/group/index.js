import React, { useState } from 'react';
import { Text } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import CustomerBar from './components/customerBar';
import Recommend from './recommend';
import Latest from './latest';

export default () => {
  const [tabs, setTabs] = useState()

  return (
    <ScrollableTabView
      initialPage={1}
      renderTabBar={() => <CustomerBar />}
    >
      <Recommend tabLabel='推荐' />
      <Latest tabLabel='最新' />
    </ScrollableTabView>
  );
}