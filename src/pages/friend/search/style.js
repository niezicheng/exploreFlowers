import { StyleSheet } from 'react-native';
import { pxToDp } from '../../../utils/stylesKits';

export default StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  filterWrap: {
    backgroundColor: '#fff',
    width: pxToDp(50),
    height: pxToDp(50),
    borderRadius: pxToDp(25),
    position: 'absolute',
    top: '10%',
    right: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  imageWrap: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  nameText: {
    color: '#ffffff9a',
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
