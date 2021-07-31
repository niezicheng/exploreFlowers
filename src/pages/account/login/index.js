import React, { useState, useRef } from 'react';
import { View, Text, Image, StatusBar, AsyncStorage } from 'react-native';
import { Input } from 'react-native-elements';
import { inject, observer } from 'mobx-react';
import { pxToDp } from '../../../utils/stylesKits';
import validator from '../../../utils/validator';
import request from '../../../utils/request';
import { ACCOUNT_LOGIN, ACCOUNT_VALIDATEVCODE } from '../../../utils/pathMap';
import LGButton from '../../../components/LGButton';
import VerifyCode from './components/VerifyCode';
import Toast from '../../../utils/Toast';
import styles from './style';

const COUNT_DOWN_TIME = 60;

const Login = (props) => {
  const [phoneNum, setPhoneNum] = useState('18665711978'); // 手机号
  const [phoneValid, setPhoneValid] = useState(true); // 手机号合法性
  const [isLogin, setIsLogin] = useState(true); // 是否为登录显示
  const [codeValue, setCodeValue] = useState(''); // 验证码的值
  const [btnText, setBtnText] = useState('获取验证码'); // 底部按钮文本
  const [isCountDown, setIsCountDown] = useState(false); //是否正在倒计时

  const timeIdRef = useRef();

  const handleChange = (value) => {
    setPhoneNum(value);
  }

  const handleCodeChange = (value) => {
    setCodeValue(value);
  }

  // 验证码输入完成事件
  const handleCodeSubmit = async () => {
    // 1. 验证码校验 (前端校验长度即可)
    if (codeValue.length !== 6) {
      Toast.message('验证码不正确', 2000, 'center');
      return;
    }
    /**
     * 2. 将手机号和验证码一起给后端再次校验, 通过后返回新老用户标识
     *  - 新用户 -> 完善信息界面
     *  - 老用户 -> 首页
     * - 将用户数据存储全局的到 mobx 数据中
     **/
    const res = await request.post(ACCOUNT_VALIDATEVCODE, {
      phone: phoneNum,
      vcode: codeValue
    });

    if (res.code !== '10000') {
      return;
    }

    // 存储用户数据到 mobx 中
    props.RootStore.setUserInfo(phoneNum, res.data.token, res.data.id);
    // 存储用户数据到本地缓存中(永久存在)
    AsyncStorage.setItem('userinfo', JSON.stringify({
      mobile: phoneNum,
      token: res.data.token,
      userId: res.data.id
    }));

    if (res.data.isNew) {
      // 新用户
      props.navigation.navigate('UserInfo');

    } else {
      // 老用户, 使用 navigate 当之前页面进栈后再次跳转到之前页面 componentDidMount 和 Effect 不会执行
      // props.navigation.navigate('Tabbar');

      props.navigation.reset({
        routes: [{ name: 'Tabbar' }]
      });
    }

    // 清除计时器
    timeIdRef.current && clearInterval(timeIdRef.current)
  }

  /**
   * 注册、登录获取验证码
   */
  const getVerifyCode = async () => {
    // 1. 号码校验
    const phoneValid = validator.validatePhone(phoneNum);
    // 2. 不通过，展示提示
    setPhoneValid(phoneValid);
    if (!phoneValid) return;
    /**
     * 3. 通过，调用接口获取验证码
     *  - 等待框
     *  - 自动关闭 -> axios 拦截器
     **/
    const res = await request.post(ACCOUNT_LOGIN, { phone: phoneNum });

    /**
     * 4. 切换验证码界面
     *  - 开启验证码定时器
     **/
    if (res.code === '10000') {
      // 请求成功
      setIsLogin(false);
      countDown();
    }
  }

  /**
   * 获取按钮文本倒计时
   */
  const countDown = () => {
    if (isCountDown) return;
    let seconds = COUNT_DOWN_TIME;
    setIsCountDown(true);
    setBtnText(`重新获取 ${seconds} s`);
    timeIdRef.current = setInterval(() => {
      seconds--;
      setBtnText(`重新获取 ${seconds} s`);
      if (seconds === 0) {
        clearInterval(timeIdRef.current);
        setIsCountDown(false)
        setBtnText('重新获取');
      }
    }, 1000)
  }


  /**
   * 登录内容
   */
  const renderLogin = () => (
    <>
      <Text style={[styles.labelTitle, { paddingLeft: pxToDp(5), }]}>
        手机号登录/注册
      </Text>
      <Input
        placeholder="请输入手机号码"
        value={phoneNum}
        maxLength={11}
        keyboardType="phone-pad"
        leftIcon={{ type: 'font-awesome', name: 'phone', color: '#CCC' }}
        onChangeText={handleChange}
        errorMessage={`${phoneValid ? '' : '手机号码格式不正确'}`}
        onSubmitEditing={getVerifyCode}
        inputStyle={{ color: '#222' }}
      />
    </>
  )

  /**
   * 验证码内容
   */
  const renderVerify = () => (
    <>
      <Text style={styles.labelTitle}>请输入6位验证码</Text>
      <Text style={styles.sendTipText}>{`已发送至: +86 ${phoneNum}`}</Text>
      <VerifyCode
        value={codeValue}
        onChange={handleCodeChange}
        onSubmitEditing={handleCodeSubmit}
      />
    </>
  )

  return (
    <>
      <StatusBar
        backgroundColor="transparent"
        translucent
      />
      <Image
        source={require('../../../images/profileBackground.jpg')}
        style={styles.image}
      />
      <View style={styles.container}>
        {isLogin ? (
          renderLogin()
        ) : (
          renderVerify()
        )}
      </View>
      <View style={{ alignItems: 'center' }}>
        <LGButton
          disabled={isCountDown}
          onPress={getVerifyCode}
          style={styles.buttonWrap}
        >
          {btnText}
        </LGButton>
      </View>
    </>
  )
}

// @inject("RootStore") // 注入用来获取全局数据的
// @observer //  当全局发生改变了组件的重新渲染, 从而显示最新的数据
export default inject('RootStore')(observer(Login));