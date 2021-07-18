import { StyleSheet } from 'react-native';
import { pxToDp } from '../../utils/stylesKits';

export default StyleSheet.create({
  container: {},

  // top
  topContainer: {
    paddingHorizontal: pxToDp(30),
    paddingVertical: pxToDp(15),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: pxToDp(3),
    borderBottomColor: '#dce2e5',
  },
  topItemWrap: {
    width: pxToDp(60),
    alignItems: 'center',
  },
  all: {
    width: '100%',
    height: pxToDp(60),
    borderRadius: pxToDp(30),
    backgroundColor: '#ebc969',
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelText: {
    color: '#666',
    marginTop: pxToDp(2),
    fontSize: pxToDp(14),
  },

  // content
  itemWrap: {
    paddingHorizontal: pxToDp(15),
    paddingVertical: pxToDp(10),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#CCC',
    borderBottomWidth: pxToDp(1),
  },
  avatar: {
    width: pxToDp(40),
    height: pxToDp(40),
    borderRadius: pxToDp(20),
  },
  itemMiddle: {
    flex: 1,
    paddingHorizontal: pxToDp(10),
    justifyContent: 'space-evenly',
  },
  text: {
    color: '#666',
  },
  itemRight: {
    alignItems: 'flex-end',
    justifyContent: 'space-evenly',
  },
  badge: {
    width: pxToDp(15),
    height: pxToDp(15),
    borderRadius: pxToDp(8),
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  }
})
