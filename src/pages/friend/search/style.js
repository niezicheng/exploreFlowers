import { StyleSheet } from 'react-native';
import { pxToDp } from '../../../utils/stylesKits';

export default StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  imageWrap: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  nameText: {
    // color: '#ffffff9a',
    color: 'red',
    position: 'absolute',
    top: -pxToDp(18),

  },
  tipMessage: {
    position: 'absolute',
    bottom: pxToDp(50),
    width: '100%',
    alignItems: 'center',
  },
  tipText: {
    color: '#fff',
    fontSize: pxToDp(14),
  },
  numText: {
    color: 'red',
    fontSize: pxToDp(16),
  },
})
