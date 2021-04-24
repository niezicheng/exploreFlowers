import React, { useState } from 'react';
import { View, Text, Image, StatusBar } from 'react-native';
import { Input } from 'react-native-elements';
import { pxToDp } from '../../../utils/stylesKits';
import validator from '../../../utils/validator';
import request from '../../../utils/request';
import { ACCOUNT_LOGIN } from '../../../utils/pathMap';
import LGButton from '../../../components/LGButton';
import VerifyCode from './components/VerifyCode';
import styles from './style';

const Login = () => {
  const [phoneNum, setPhoneNum] = useState('15915912345'); // 手机号
  const [phoneValid, setPhoneValid] = useState(true); // 手机号合法性
  const [isLogin, setIsLogin] = useState(true); // 是否为登录显示
  const [codeValue, setCodeValue] = useState(''); // 验证码的值

  const handleChange = (value) => {
    setPhoneNum(value);
  }

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
    const res = await request.post(ACCOUNT_LOGIN, { phone: phoneNum })
    console.log(res,'ppp')
    // 4. 切换验证码界面
    if (res.code === '10000') {
      // 请求成功
      setIsLogin(false);
    }
  }

  const handleCodeChange = (value) => {
    setCodeValue(value);
  }

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

  const renderVerify = () => (
    <>
      <Text style={styles.labelTitle}>请输入6位验证码</Text>
      <Text style={styles.sendTipText}>{`已发送至: +86 ${phoneNum}`}</Text>
      <VerifyCode
        value={codeValue}
        onChange={handleCodeChange}
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
          onPress={getVerifyCode}
          style={styles.buttonWrap}
        >
          {`${isLogin ? '获取验证码' : '重新获取 0 s'}`}
        </LGButton>
      </View>
    </>
  )
}

export default Login;