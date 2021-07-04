import { StyleSheet } from 'react-native';
import { color } from 'react-native-reanimated';
import { pxToDp } from '../../utils/stylesKits';

export default StyleSheet.create({
  container: {},
  imageBg: {
    height: pxToDp(50),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: pxToDp(20)
  },
  leftWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: pxToDp(16),
    flex: 1,
    textAlign: 'center',
  },
  textStyle: {
    color: '#fff',
    fontSize: pxToDp(13)
  }
})
