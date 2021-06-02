import { StyleSheet } from 'react-native';
import { pxToDp } from '../../../utils/stylesKits';

export default StyleSheet.create({
  dynamicTop: {
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'space-between',
    padding: pxToDp(10),
    borderBottomColor: '#eee',
    borderBottomWidth: pxToDp(1),
  },
  dynamicTopLeft: {
    flexDirection: 'row',
    alignItems:'center',
  },
  title: {
    color: '#666',
  },
  messageWrap: {
    width: pxToDp(16),
    height: pxToDp(16),
    borderRadius: pxToDp(8),
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: pxToDp(5),
  },
  messageNum: {
    color: '#fff',
  },
  dynamicTopRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnWrap: {
    width: pxToDp(100),
    height: pxToDp(36),
    borderRadius: pxToDp(18),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginLeft: pxToDp(10),
  },
  btnText: {
    color: '#fff',
  },
})
