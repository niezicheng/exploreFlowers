export default {
  /**
   * 校验手机号码
   * @param {string} phone
   */
  validatePhone(phone) {
    const reg = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
    return reg.test(phone)
  },

  /**
   * 将富文本内的表情文字替为图片
   * @param {*} text 富文本内容
   * @returns 返回对应格式的数组
   */
  renderRichText(text) {
    const finallyList = [];

    const rule = /(\/\{.+?\})/ig;
    const emoArr = text.match(rule);

    if (emoArr === null) {
      finallyList.push({ text });
    } else {
      const textArr = text.replace(rule, '$').split('$');

      while (textArr.length) {
        finallyList.push({ text: textArr.shift() });
        if (emoArr.length) {
          finallyList.push({ image: emoArr.shift() });
        }
      }
    }

    return finallyList;
  }
}