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
    paddingHorizontal: pxToDp(1.5),
    textAlign: 'center',
    borderRadius: pxToDp(30),
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
  },
  commWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#CCC',
    borderBottomWidth: pxToDp(1),
    paddingVertical: pxToDp(5),
  },
  headerImg: {
    width: pxToDp(40),
    height: pxToDp(40),
    borderRadius: pxToDp(20),
    marginRight: pxToDp(5),
  },
  commText: {
    color: '#666',
  },

  // modal
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    padding: pxToDp(5),
    backgroundColor: '#EEE',
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#FFF',
    height: pxToDp(25),
    borderRadius: pxToDp(15),
    padding: 0,
    paddingHorizontal: pxToDp(10),
  },
  sendText: {
    paddingHorizontal: pxToDp(10),
    color: '#666',
  },
})
