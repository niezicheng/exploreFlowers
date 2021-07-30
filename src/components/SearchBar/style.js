import { StyleSheet } from 'react-native';
import { pxToDp } from '../../utils/stylesKits';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: pxToDp(10),
    backgroundColor: '#FFF',
    borderRadius: pxToDp(30),
  },
  input: {
    padding: 0,
    flex: 1,
    height: pxToDp(24),
    marginLeft: pxToDp(10),
    fontSize: pxToDp(14),
  },
})
