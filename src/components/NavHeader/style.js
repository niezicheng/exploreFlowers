import { StyleSheet } from 'react-native';
import { color } from 'react-native-reanimated';
import { pxToDp } from '../../utils/stylesKits';

export default StyleSheet.create({
  container: {},
  imageBg: {
    height: pxToDp(50),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: pxToDp(20)
  },
  leftWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    width: pxToDp(80),
  },
  rightWrap: {
    width: pxToDp(80),
  },
  backText: {
    color: '#fff',
    fontSize: pxToDp(14)
  },
  title: {
    color: '#fff',
    fontSize: pxToDp(14),
  },
})
