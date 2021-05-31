import { StyleSheet } from 'react-native';
import { pxToDp } from '../../../../utils/stylesKits';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageBg: {
    width: '100%',
    height: '100%',
  },
  qTitleWrap: {
    marginTop: pxToDp(50),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  qaTextImage: {
    width: pxToDp(66),
    height: pxToDp(52),
    justifyContent: 'center',
    alignItems: 'flex-end',
  }
})
