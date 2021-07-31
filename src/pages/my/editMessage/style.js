import { StyleSheet } from 'react-native';
import { pxToDp } from '../../../utils/stylesKits';

export default StyleSheet.create({
  container: {},

  // avatar
  avatar: {
    width: pxToDp(40),
    height: pxToDp(40),
    borderRadius: pxToDp(20),
  },

  textStyle: {
    color: '#666',
    fontSize: pxToDp(16),
  },
})
