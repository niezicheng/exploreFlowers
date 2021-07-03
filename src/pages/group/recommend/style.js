import { StyleSheet } from 'react-native';
import { pxToDp } from '../../../utils/stylesKits';

export default StyleSheet.create({
  container: {
    padding: pxToDp(15),
    borderBottomColor: '#eee',
    borderBottomWidth: pxToDp(1),
  }
})
