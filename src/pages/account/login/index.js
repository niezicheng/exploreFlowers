import React, { useState } from 'react';
import { View, Text, Image, StatusBar } from 'react-native';
import { Input } from 'react-native-elements';
import { pxToDp } from '../../../utils/stylesKits';
import validator from '../../../utils/validator';
import request from '../../../utils/request';
import { ACCOUNT_LOGIN } from '../../../utils/pathMap';

const Login = () => {
  const [phoneNum, setPhoneNum] = useState('15915912345'); // 手机号
  const [phoneValid, setPhoneValid] = useState(true); // 手机号合法性

  const handleChange = (value) => {
    setPhoneNum(value);
  }

  const handleSubmit = async () => {
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
  }

  return (
    <>
      <StatusBar
        backgroundColor="transparent"
        translucent
      />
      <Image
        source={require('../../../images/profileBackground.jpg')}
        style={{ width: '100%', height: pxToDp(200) }}
      />
      <View style={{ padding: pxToDp(20) }}>
        <Text style={{ fontSize: pxToDp(25), color: '#999', fontWeight: 'bold' }}>
          手机号码登录注册
        </Text>
        <Input
          placeholder="请输入手机号码"
          value={phoneNum}
          maxLength={11}
          keyboardType="phone-pad"
          leftIcon={{ type: 'font-awesome', name: 'phone', color: '#CCC' }}
          onChangeText={handleChange}
          errorMessage={`${phoneValid ? '' : '手机号码格式不正确'}`}
          onSubmitEditing={handleSubmit}
          inputStyle={{ color: '#222' }}
        />
      </View>
    </>
  )
}

export default Login;