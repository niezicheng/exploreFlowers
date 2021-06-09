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

  /**
   * 发动文本消息
   * @param {string} username 接收信息的对象
   * @param {string} text 发送信息的内容
   * @param {object} extras 附带的一些参数
   * @returns Promise
   */
  sendTextMessage(username, text, extras = {}) {
    return new Promise((resolve, reject) => {
      // 消息类型 单个 即可
      const type = 'single';

      JMessage.sendTextMessage({
        type,
        username,
        // appKey: 'appKye',
        text,
        extras,
      }, resolve, reject)
    })
  }
}