import { StyleSheet } from 'react-native';
import { pxToDp } from '../../../../utils/stylesKits';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: pxToDp(10),
    paddingHorizontal: pxToDp(15),
    borderBottomColor: '#eee',
    borderBottomWidth: pxToDp(1),
  },
  desc: {
    flexDirection: 'row',
    flex: 1,
  },
  descLeft: {
    justifyContent: 'space-between',
  },
  genderIcon: {
    marginHorizontal: pxToDp(10),
  },
  descRight: {
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
