import { StyleSheet } from 'react-native';
import { pxToDp } from '../../../../../utils/stylesKits';

export default StyleSheet.create({
  root: {flex: 1, padding: pxToDp(15)},
  title: {textAlign: 'center', fontSize: pxToDp(30)},
  codeFiledRoot: {marginTop: pxToDp(20)},
  cell: {
    width: pxToDp(40),
    height: pxToDp(40),
    lineHeight: pxToDp(38),
    fontSize: pxToDp(24),
    borderBottomWidth: pxToDp(2),
    borderColor: '#00000030',
    textAlign: 'center',
    color: '#7d53ea',
  },
  focusCell: {
    borderColor: '#7d53ea',
    color: '#7d53ea',
  },
});