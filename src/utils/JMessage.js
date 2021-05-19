import JMessage from "jmessage-react-plugin";

export default {
  // 初始化
  init() {
    JMessage.init({
      'appkey': '0445e857891320462aedd470',
      'isOpenMessageRoaming': true,
      'isProduction': false,
      'channel': ''
    })
  },

  // 注册
  register(username, password) {
    return new Promise((resolve, reject) => {
      JMessage.register({
        username,
        password,
      }, resolve, reject)
    })
  },

  // 登录
  login(username, password) {
    return new Promise((resolve, reject) => {
      JMessage.login({
        username,
        password,
      }, resolve, reject)
    })
  },
}