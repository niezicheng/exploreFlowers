import { StyleSheet } from 'react-native';
import { pxToDp } from '../../../../utils/stylesKits'

export default StyleSheet.create({
  imgBg: {
    height: pxToDp(60),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrap: {
    position: 'absolute',
    left: pxToDp(15),
    alignItems: 'center',
  },
  tabsWrap: {
    width: '70%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tabContainer: {
    justifyContent: 'center',
    borderBottomColor: '#FFFFFF',
  },
  tabTitle: {
    color: '#FFFFFF',
    fontSize: pxToDp(16)
  }
})