import { StyleSheet } from 'react-native';
import { pxToDp } from '../../../utils/stylesKits';

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  textStyle: {
    color: '#666',
    fontSize: pxToDp(16),
  },
  buttonWrap: {
    marginTop: pxToDp(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: '80%',
    paddingVertical: pxToDp(10),
    alignItems: 'center',
    backgroundColor: '#FFF',
    justifyContent: 'center',
    borderRadius: pxToDp(40),
  },
  btnText: {
    color: '#666',
    fontSize: pxToDp(16),
  }
})
