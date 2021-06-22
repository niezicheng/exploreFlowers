import { StyleSheet } from 'react-native';
import { pxToDp } from '../../../../utils/stylesKits'

export default StyleSheet.create({
  imgBg: {
    height: pxToDp(60),
    paddingHorizontal: pxToDp(80),
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tabContainer: {
    height: '100%',
    justifyContent: 'center',
    borderBottomColor: '#FFFFFF',

  },
  tabTitle: {
    color: '#FFFFFF',
    fontSize: pxToDp(16)
  }
})