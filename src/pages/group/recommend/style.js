import { StyleSheet } from 'react-native';
import { pxToDp } from '../../../utils/stylesKits';

export default StyleSheet.create({
  container: {
    padding: pxToDp(15),
    borderBottomColor: '#E5E5E5',
    borderBottomWidth: pxToDp(1),
  },

  // 悬浮按钮
  button: {
    width: pxToDp(70),
    height: pxToDp(70),
    borderRadius: pxToDp(35),
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: '#FFF',
    fontSize: pxToDp(20),
  }
})
