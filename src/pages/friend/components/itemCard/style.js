import { StyleSheet } from 'react-native';
import { pxToDp } from '../../../../utils/stylesKits';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: pxToDp(15),
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  avatar: {
    width: pxToDp(50),
    height: pxToDp(50),
    borderRadius: pxToDp(25),
  },
  desc: {
    flexDirection: 'row',
    flex: 1,
  },
  descLeft: {
    flex: 2,
    justifyContent: 'space-around',
    marginLeft: pxToDp(30),
  },
  genderIcon: {
    marginHorizontal: pxToDp(2),
  },
  descRight: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featValue: {
    color: '#fff',
    fontSize: pxToDp(8),
    fontWeight: 'bold',
    position: 'absolute',
  },
  featValueDesc: {
    fontSize: pxToDp(10),
    color: 'red',
  },
  textColor: {
    color: '#777',
    fontSize: pxToDp(12),
  },
})
