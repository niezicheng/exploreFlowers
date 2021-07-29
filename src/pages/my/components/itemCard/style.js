import { StyleSheet } from 'react-native';
import { pxToDp } from '../../../../utils/stylesKits'

export default StyleSheet.create({
  container: {
    height: pxToDp(120),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text:{
    color: '#666',
    fontSize: pxToDp(12),
  },
  numText: {
    fontSize: pxToDp(14),
  }
})