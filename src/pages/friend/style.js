import { StyleSheet } from 'react-native';
import { pxToDp } from '../../utils/stylesKits';

export default StyleSheet.create({
  foregroundWrap: {
    height: pxToDp(150),
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: '#eee',
    paddingTop: pxToDp(3),
  },
  recommendWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: pxToDp(10),
  },
  textColor: {
    color: '#666',
  },
  avatar: {
    width: pxToDp(50),
    height: pxToDp(50),
    borderRadius: pxToDp(25),
  }
})
