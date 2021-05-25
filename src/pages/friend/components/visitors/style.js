import { StyleSheet } from 'react-native';
import { pxToDp } from '../../../../utils/stylesKits';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: pxToDp(15),
  },
  descText: {
    marginRight: pxToDp(15),
    color: '#777',
    fontSize: pxToDp(14),
  },
  imgWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  img: {
    width: pxToDp(30),
    height: pxToDp(30),
    borderRadius: pxToDp(20),
  },
  rightArrow: {
    color: '#777',
    fontSize: pxToDp(18),
  }
})
