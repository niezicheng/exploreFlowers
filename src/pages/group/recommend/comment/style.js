import { StyleSheet } from 'react-native';
import { pxToDp } from '../../../../utils/stylesKits';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: pxToDp(15),
    backgroundColor: '#FFF',
  },
  newCommentWrap: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  badge: {
    width: pxToDp(15),
    height: pxToDp(15),
    lineHeight: pxToDp(15),
    textAlign: 'center',
    borderRadius: pxToDp(10),
    backgroundColor: 'red',
    color: '#FFFFFF',
    marginLeft: pxToDp(5),
  },
  btn: {
    borderRadius: pxToDp(20),
    width: pxToDp(80),
    height: pxToDp(20)
  },
  btnText: {
    fontSize: pxToDp(10),
  }
})
