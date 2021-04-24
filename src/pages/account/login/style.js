import { StyleSheet } from 'react-native';
import { pxToDp } from '../../../utils/stylesKits';

export default StyleSheet.create({
  image: {
    width: '100%',
    height: pxToDp(200),
  },

  container: {
    paddingTop: pxToDp(25),
    padding: pxToDp(25),
  },

  labelTitle: {
    fontSize: pxToDp(24),
    color: '#999',
    fontWeight: 'bold',
  },

  sendTipText: {
    color: '#999'
  },

  buttonWrap: {
    width: pxToDp(300),
    borderRadius: pxToDp(50),
  }
})