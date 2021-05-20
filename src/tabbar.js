import React, { useState } from 'react';
import { View, Text } from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Icon from './components/Icon';
import Friend from './pages/friend';
import Group from './pages/group';
import Message from './pages/message';
import My from './pages/my';

export default () => {
  const [selectedTab, setSelectedTab] = useState('friend');

  const pages = [
    {
      selected: 'friend',
      title: '交友',
      renderIcon: () => <Icon type="friend" />,
      renderSelectedIcon: () => <Icon type="selectedFriend" />,
      onPress: () => setSelectedTab('friend'),
      component: <Friend />
    },
    {
      selected: 'group',
      title: '圈子',
      renderIcon: () => <Icon type="group" />,
      renderSelectedIcon: () => <Icon type="selectedGroup" />,
      onPress: () => setSelectedTab('group'),
      component: <Group />
    },
    {
      selected: 'message',
      title: '消息',
      renderIcon: () => <Icon type="message" />,
      renderSelectedIcon: () => <Icon type="selectedMessage" />,
      onPress: () => setSelectedTab('message'),
      component: <Message />
    },
    {
      selected: 'my',
      title: '我的',
      renderIcon: () => <Icon type="my" />,
      renderSelectedIcon: () => <Icon type="selectedMy" />,
      onPress: () => setSelectedTab('my'),
      component: <My />
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <TabNavigator>
        { pages.map((page, index) => (
          <TabNavigator.Item
            key={index}
            selected={selectedTab === page.selected}
            title={page.title}
            renderIcon={page.renderIcon}
            renderSelectedIcon={page.renderSelectedIcon}
            onPress={page.onPress}
            selectedTitleStyle={{ color: '#c863b5' }}
            tabStyle={{ backgroundColor: '#eee', justifyContent: 'center' }}
          >
            {page.component}
          </TabNavigator.Item>
        ))}
      </TabNavigator>
    </View>
  )
}