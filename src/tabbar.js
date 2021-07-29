import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import { inject, observer } from 'mobx-react';
import request from './utils/request';
import { MY_INFO } from './utils/pathMap';
import Icon from './components/Icon';
import Friend from './pages/friend';
import Group from './pages/group';
import Message from './pages/message';
import My from './pages/my';
import JMessage from './utils/JMessage';

const TabBar = (props) => {
  let selectTab = 'my';
  if (props.route.params && props.route.params.pagename) {
    selectTab = props.route.params.pagename;
  }
  const [selectedTab, setSelectedTab] = useState(selectTab);

  useEffect(() => {
    (async () => {
      // 获取用户信息
      const res = await request.privateGet(MY_INFO);
      if (res && res.data) {
        // 将用户信息存入 mobx 中
        props.UserStore.setUser(res.data);

        // 进行极光登录
        await JMessage.login(res.data.guid, res.data.mobile)
          .then(res => console.log('login success', res))
          .catch(error => console.log('login fail', error));
      }
    })()
  }, [])

  const pages = [
    {
      selected: 'friend',
      title: '交友',
      renderIcon: () => <Icon svg type="friend" />,
      renderSelectedIcon: () => <Icon svg type="selectedFriend" />,
      onPress: () => setSelectedTab('friend'),
      component: <Friend />
    },
    {
      selected: 'group',
      title: '圈子',
      renderIcon: () => <Icon svg type="group" />,
      renderSelectedIcon: () => <Icon svg type="selectedGroup" />,
      onPress: () => setSelectedTab('group'),
      component: <Group />
    },
    {
      selected: 'message',
      title: '消息',
      renderIcon: () => <Icon svg type="message" />,
      renderSelectedIcon: () => <Icon svg type="selectedMessage" />,
      onPress: () => setSelectedTab('message'),
      component: <Message />
    },
    {
      selected: 'my',
      title: '我的',
      renderIcon: () => <Icon svg type="my" />,
      renderSelectedIcon: () => <Icon svg type="selectedMy" />,
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

export default inject('UserStore')(observer(TabBar));

