import { StyleSheet } from 'react-native';
import { pxToDp } from '../../../../../utils/stylesKits';

export default StyleSheet.create({
  container: {
    height: '60%',
    backgroundColor: '#fff',
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    padding: pxToDp(20),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: '#999',
    fontSize: pxToDp(14),
  },
  body: {
    padding: pxToDp(30),
  },
  itemStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: pxToDp(10),
  },
  distance: {
    flexDirection: 'column',
    paddingTop: pxToDp(10),
  },
  label: {
    color: '#777',
    fontSize: pxToDp(12),
    marginRight: pxToDp(20),
  },
  valueText: {
    color: '#999',
  },
  avatar: {
    backgroundColor: '#CCC',
    borderRadius: pxToDp(15),
    width: pxToDp(30),
    height: pxToDp(30),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: pxToDp(40),
  },
  activeAvatar: {
    backgroundColor: '#7d53ea',
  },
})
