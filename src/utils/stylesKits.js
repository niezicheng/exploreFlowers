import { Dimensions } from 'react-native';

// 设计稿宽度 / 元素宽度 = 手机屏幕 / 手机中元素宽度
// 手机中元素宽度 = 手机屏幕 * 元素宽度 / 设计稿宽度

export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;

/**
 * 根据设计稿中元素的宽/高度(px)获取手机中元素宽/高度(dp)
 * @param {number} elePx 设计稿中元素的宽/高度(px)
 */
export const pxToDp = (elePx) => screenWidth * elePx / 375;