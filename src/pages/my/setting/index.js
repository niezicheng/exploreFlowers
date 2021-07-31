import React from 'react';
import { View, Text, TouchableOpacity, AsyncStorage } from 'react-native';
import { inject, observer } from 'mobx-react';
import { ListItem } from 'react-native-elements';
import { ActionSheet } from 'teaset';
import NavHeader from '../../../components/NavHeader';
import JMessage from '../../../utils/JMessage';
import styles from './style';
import Toast from '../../../utils/Toast';

const Setting = (props) => {
  const { user } = props.UserStore;

  const data = [{
    title: '设置陌生人问题',
    onPress: () => console.log('设置陌生人问题')
  }, {
    title: '通知设置',
    onPress: () => console.log('通知设置')
  }, {
    title: '黑名单',
    onPress: () => console.log('黑名单')
  }, {
    title: '修改手机号',
    rightTitle: user.mobile,
    onPress: () => console.log('修改手机号')
  }];

  // 退出登录
  const handleLoginOut = () => {
    // 1. 弹出窗口询问用户是否确定退出
    // 2. 清除本地缓存数据
    // 3. 清除 mobx user
    // 4. 清除 mobx token
    // 5. 退出极光登录
    // 6. 提示用户退出成功
    // 7. 跳转到登录页面

    // 登出
    const tmeLogoOut = async () => {
      // 清除缓存
      await AsyncStorage.removeItem('userinfo');
      // 清除用户数据
      props.UserStore.clearUser();
      // 清除 token 数据
      props.RootStore.clearUserInfo();
      // 退出极光登录
      JMessage.logout();

      // 提示退出成功信息
      Toast.smile('退出成功', 1000);

      // 跳转到登录页面
      props.navigation.navigate('Login');
    }

    const options = [
      { title: '退出', onPress: tmeLogoOut }
    ];

    ActionSheet.show(options, { title: '取消' })
  }

  return (
    <View style={styles.container}>
      <NavHeader title="通用设置" isShowBackText={false} />
      {data.map((v, i) => (
        <ListItem
          key={i}
          onPress={v.onPress}
          title={v.title}
          rightTitle={v.rightTitle}
          rightTitleStyle={styles.textStyle}
          titleStyle={styles.textStyle}
          bottomDivider={i !== data.length - 1}
          chevron
        />
      ))}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handleLoginOut}
        style={styles.buttonWrap}
      >
        <View style={styles.button}>
          <Text style={styles.btnText}>退出登录</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

/**
 * 高阶函数方式
 */
// const HOC = (WrapperComponent) => {
//   const MiddleComponent = (props) => {
//     const { UserStore, RootStore } = props;
//     return <WrapperComponent UserStore={UserStore} RootStore={RootStore} />
//   }
//   return inject('RootStore')(observer(MiddleComponent))
// }

// const HocSetting = HOC(Setting);

// export default inject('UserStore')(observer(HocSetting));

export default inject('UserStore')(inject('RootStore')(observer(Setting)));
